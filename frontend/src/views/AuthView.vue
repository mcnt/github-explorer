<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h1>{{ isLogin ? 'Login' : 'Criar conta' }}</h1>
        <p>{{ isLogin ? 'Faça login para continuar' : 'Crie sua conta para começar' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="!isLogin" class="form-group">
          <label for="name">Nome</label>
          <div class="input-wrapper">
            <i class="fas fa-user"></i>
            <input
              id="name"
              v-model="form.name"
              type="text"
              :disabled="loading"
              placeholder="Seu nome completo"
              required
            >
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope"></i>
            <input
              id="email"
              v-model="form.email"
              type="email"
              :disabled="loading"
              placeholder="seu@email.com"
              required
            >
          </div>
        </div>

        <div class="form-group">
          <div class="password-header">
            <label for="password">Senha</label>
          </div>
          <div class="input-wrapper">
            <i class="fas fa-lock"></i>
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :disabled="loading"
              :placeholder="isLogin ? 'Sua senha' : 'Crie uma senha forte'"
              required
              :minlength="isLogin ? 1 : 6"
            >
            <button
              type="button"
              class="toggle-password"
              @click="togglePasswordVisibility"
              :disabled="loading"
            >
              <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
            </button>
          </div>
        </div>

        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>

        <button
          type="submit"
          class="submit-button"
          :class="{ loading: loading }"
          :disabled="loading"
        >
          <span v-if="!loading">
            {{ isLogin ? 'Entrar' : 'Criar conta' }}
          </span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>

      <div class="auth-footer">
        <p>
          {{ isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
          <router-link :to="isLogin ? '/register' : '/login'" class="auth-link">
            {{ isLogin ? 'Crie uma conta' : 'Faça login' }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { login as loginApi, register as registerApi } from '@/services/authService';
import { saveAuth } from '@/utils/auth';

export default {
  name: 'AuthView',
  
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();

    const form = ref({
      name: '',
      email: '',
      password: ''
    });

    const showPassword = ref(false);
    const loading = ref(false);
    const error = ref('');

    onMounted(() => {
      error.value = '';
    });

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
      if (loading.value) return;
      
      loading.value = true;
      error.value = '';

      try {
        let response;
        
        if (props.isLogin) {
          response = await loginApi(form.value.email, form.value.password);
        } else {
          response = await registerApi(form.value.name, form.value.email, form.value.password);
        }
        saveAuth(response.token, response.user);
        
        emit('auth-change');
        
        const redirect = route.query.redirect?.toString() || '/';
        await router.push(redirect);
      } catch (err: any) {
        error.value = err.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      showPassword,
      loading,
      error,
      togglePasswordVisibility,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.auth-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 420px;
  padding: 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

auth-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

auth-header p {
  color: #6b7280;
  margin: 0;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  font-size: 13px;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #4338ca;
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper i {
  position: absolute;
  left: 12px;
  color: #9ca3af;
  font-size: 16px;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  transition: all 0.2s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input-wrapper input::placeholder {
  color: #9ca3af;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.toggle-password:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  background-color: #fef2f2;
  color: #dc2626;
  font-size: 14px;
  padding: 12px;
  border-radius: 6px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message i {
  font-size: 16px;
}

.submit-button {
  width: 100%;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  height: 48px;
}

.submit-button:hover:not(:disabled) {
  background-color: #4338ca;
}

.submit-button:disabled {
  background-color: #c7d2fe;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.auth-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.auth-link {
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
  transition: color 0.2s;
}

.auth-link:hover {
  color: #4338ca;
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .auth-container {
    padding: 24px;
  }
  
  .auth-header h1 {
    font-size: 20px;
  }
  
  .auth-header p {
    font-size: 13px;
  }
}
</style>
