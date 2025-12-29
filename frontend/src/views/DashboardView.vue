<template>
  <div class="container stack">
    <div class="card stack-sm">
      <div class="title">
        <h2>Pesquisar usuário do GitHub</h2>
        <p class="subtitle">Digite um username e pressione Enter para buscar.</p>
      </div>

      <form class="search-row" @submit.prevent="fetchData">
        <BaseInput
          v-model="username"
          label="GitHub username"
          placeholder="ex: torvalds"
          :error="inputError"
        >
          <template #prefix>
            <i class="fab fa-github"></i>
          </template>
        </BaseInput>

        <BaseButton
          :loading="loading"
          :disabled="loading"
          variant="primary"
          size="medium"
        >
          Buscar
        </BaseButton>
      </form>

      <div v-if="error" class="alert error" role="alert">
        <i class="fas fa-exclamation-triangle"></i>
        {{ error }}
      </div>
    </div>

    <div v-if="loading" class="stack">
      <div class="card skeleton-card">
        <div class="skeleton line w-40" />
        <div class="skeleton line w-70" />
        <div class="skeleton line w-55" />
      </div>
      <div class="card skeleton-card">
        <div class="skeleton line w-30" />
        <div class="skeleton line w-90" />
        <div class="skeleton line w-80" />
      </div>
    </div>

    <div v-else class="stack">
      <div v-if="!hasSearched" class="card empty-state">
        <div class="empty-icon"><i class="fab fa-github"></i></div>
        <div>
          <h3>Comece pesquisando um usuário</h3>
          <p class="subtitle">Ex.: <strong>torvalds</strong>, <strong>gaearon</strong>, <strong>vuejs</strong></p>
        </div>
      </div>

      <GithubUserCard v-if="user" :user="user" />
      <GithubRepoList v-if="repos.length" :repositorio="repos" />

      <div v-if="user && !repos.length" class="card empty-state">
        <div class="empty-icon"><i class="fas fa-box-open"></i></div>
        <div>
          <h3>Sem repositórios públicos</h3>
          <p class="subtitle">Este usuário não possui repositórios públicos.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getGithubUser, getGithubRepos } from '@/services/githubService';
import GithubUserCard from '@/components/github/GithubUserCard.vue';
import GithubRepoList from '@/components/github/GithubRepoList.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const username = ref('');
const user = ref<any>(null);
const repos = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const inputError = ref<string | null>(null);
const hasSearched = ref(false);

async function fetchData() {
  error.value = null;
  inputError.value = null;

  if (!username.value.trim()) {
    inputError.value = 'Informe um username.';
    return;
  }

  hasSearched.value = true;

  loading.value = true;
  user.value = null;
  repos.value = [];

  try {
    const [userRes, reposRes] = await Promise.all([
      getGithubUser(username.value.trim()),
      getGithubRepos(username.value.trim())
    ]);
    user.value = userRes.data;
    repos.value = reposRes.data;
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Não foi possível buscar o usuário.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.title h2 {
  margin: 0;
}

.subtitle {
  margin-top: 6px;
  color: var(--text-light);
}

.search-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: end;
}

.alert.error {
  margin-top: 12px;
  padding: 12px;
  border-radius: var(--radius-sm);
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
  display: flex;
  gap: 8px;
  align-items: center;
}

.empty-state {
  display: flex;
  gap: 12px;
  align-items: center;
}

.empty-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .search-row {
    grid-template-columns: 1fr;
  }
}

</style>
