<template>
  <div class="container stack">
    <section v-if="isAdmin" class="card stack-sm">
      <header class="header">
        <div>
          <h2>Criar usuário</h2>
          <p class="subtitle">
            Crie um novo usuário com permissão de admin ou usuário padrão.
          </p>
        </div>

        <BaseButton
          :variant="showCreateForm ? 'secondary' : 'primary'"
          size="small"
          :disabled="creating"
          @click="toggleCreateForm"
        >
          {{ showCreateForm ? 'Fechar' : 'Criar usuário' }}
        </BaseButton>
      </header>

      <form
        v-if="showCreateForm"
        class="create-form"
        @submit.prevent="handleCreate"
      >
        <BaseInput
          v-model="form.name"
          label="Nome"
          placeholder="Ex: Maria"
          :disabled="creating"
          required
        />

        <BaseInput
          v-model="form.email"
          label="Email"
          placeholder="email@exemplo.com"
          :disabled="creating"
          required
        />

        <BaseInput
          v-model="form.password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          :disabled="creating"
          required
        />

        <div class="field">
          <label for="role" class="field-label">Tipo</label>
          <select
            id="role"
            v-model="form.role"
            class="field-select"
            :disabled="creating"
            required
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="actions-row">
          <BaseButton variant="primary" :loading="creating">
            Salvar
          </BaseButton>

          <BaseButton
            variant="secondary"
            :disabled="creating"
            @click.prevent="resetForm"
          >
            Limpar
          </BaseButton>
        </div>
      </form>

      <p v-if="createError" class="alert error" role="alert">
        <i class="fas fa-exclamation-triangle" />
        {{ createError }}
      </p>

      <p v-if="createSuccess" class="alert success" role="status">
        <i class="fas fa-check-circle" />
        {{ createSuccess }}
      </p>
    </section>

    <section class="card stack-sm">
      <header class="header">
        <div>
          <h2>Usuários</h2>
          <p class="subtitle">Gerencie os usuários cadastrados.</p>
        </div>

        <BaseButton
          variant="primary"
          size="small"
          :loading="loading"
          @click="load"
        >
          Atualizar
        </BaseButton>
      </header>

      <p v-if="error" class="alert error" role="alert">
        <i class="fas fa-exclamation-triangle" />
        {{ error }}
      </p>

      <div v-if="loading" class="skeleton-list" aria-busy="true">
        <div v-for="n in 3" :key="n" class="skeleton" />
      </div>

      <div v-else-if="!users.length" class="empty-state">
        <i class="fas fa-users empty-icon" />
        <div>
          <h3>Nenhum usuário encontrado</h3>
          <p class="subtitle">Os usuários aparecerão aqui.</p>
        </div>
      </div>

      <div v-else class="table">
        <div class="table-row table-head">
          <span>Email</span>
          <span class="actions">Ações</span>
        </div>

        <div v-for="user in users" :key="user.id" class="table-row">
          <span class="email">
            <i class="fas fa-user-circle" />
            {{ user.email }}
          </span>

          <span class="actions">
            <BaseButton
              variant="danger"
              size="small"
              :loading="deletingId === user.id"
              :disabled="!!deletingId"
              @click="confirmRemove(user)"
            >
              Excluir
            </BaseButton>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { createUser, deleteUser, listUsers } from '@/services/userService';

type Role = 'admin' | 'user';

type UserRow = {
  id: number;
  email: string;
};

const users = ref<UserRow[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const isAdmin = ref(false);
const showCreateForm = ref(false);

const deletingId = ref<number | null>(null);

const creating = ref(false);
const createError = ref<string | null>(null);
const createSuccess = ref<string | null>(null);

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'user' as Role
});

function toggleCreateForm() {
  showCreateForm.value = !showCreateForm.value;
  if (!showCreateForm.value) resetForm();
}

function resetForm() {
  form.value = { name: '', email: '', password: '', role: 'user' };
  createError.value = null;
  createSuccess.value = null;
}

async function load() {
  if (loading.value) return;

  loading.value = true;
  error.value = null;

  try {
    users.value = (await listUsers()).data;
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Erro ao carregar usuários.';
  } finally {
    loading.value = false;
  }
}

async function confirmRemove(user: UserRow) {
  if (deletingId.value) return;
  if (!confirm(`Excluir o usuário ${user.email}?`)) return;

  deletingId.value = user.id;

  try {
    await deleteUser(user.id);
    await load();
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Erro ao excluir usuário.';
  } finally {
    deletingId.value = null;
  }
}

async function handleCreate() {
  if (creating.value) return;

  const payload = {
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    password: form.value.password,
    role: form.value.role
  };

  if (!payload.name || !payload.email || !payload.password) {
    createError.value = 'Preencha todos os campos.';
    return;
  }

  creating.value = true;
  createError.value = null;

  try {
    await createUser(payload);
    createSuccess.value = 'Usuário criado com sucesso.';
    toggleCreateForm();
    await load();
  } catch (e: any) {
    createError.value = e?.response?.data?.message ?? 'Erro ao criar usuário.';
  } finally {
    creating.value = false;
  }
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') ?? 'null');
  isAdmin.value = user?.role === 'admin';
  load();
});
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.subtitle {
  margin-top: 6px;
  color: var(--text-light);
}

.create-form {
  display: grid;
  gap: 12px;
}

.field {
  display: grid;
  gap: 6px;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.field-select {
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
}

.actions-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.alert {
  margin-top: 12px;
  padding: 12px;
  border-radius: var(--radius-sm);
  display: flex;
  gap: 10px;
  align-items: center;
}

.alert.error {
  background: #fef2f2;
  color: #b91c1c;
}

.alert.success {
  background: #f0fdf4;
  color: #166534;
}

.skeleton-list {
  display: grid;
  gap: 10px;
}

.skeleton {
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    #f1f5f9 25%,
    #e2e8f0 37%,
    #f1f5f9 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}

.empty-state {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
}

.empty-icon {
  font-size: 32px;
  color: var(--primary);
}

.table {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}

.table-row:last-child {
  border-bottom: none;
}

.table-head {
  font-weight: 600;
  background: var(--bg);
}

.email {
  display: inline-flex;
  gap: 10px;
  align-items: center;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
