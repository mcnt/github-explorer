<template>
  <nav class="navbar" v-if="isAuthenticated">
    <div class="navbar-container">
      <div class="navbar-brand">GitHub Explorer</div>
      <div class="navbar-links">
        <router-link to="/" class="nav-link" active-class="active">
          <i class="fas fa-home"></i> Dashboard
        </router-link>
        <router-link v-if="isAdmin" to="/users" class="nav-link" active-class="active">
          <i class="fas fa-users"></i> Usuários
        </router-link>
      </div>
      <button @click="handleLogout" class="logout-btn">
        <i class="fas fa-sign-out-alt"></i> Sair
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { logout } from '../../utils/auth';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import type { Ref } from 'vue';
const router = useRouter();
const isAdmin = ref(false);
const isAuthenticated = inject<Ref<boolean>>('isAuthenticated');
const checkAuthStatus = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  isAdmin.value = user?.role === 'admin';
};
const handleLogout = async () => {
  if (!isAuthenticated) return;
  
  logout();
  isAuthenticated.value = false;
  await router.push('/login');
};
onMounted(checkAuthStatus);
</script>

<style scoped>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }

  .navbar-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .navbar-brand {
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text);
    white-space: nowrap;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 12px;
    border-radius: 10px;
    color: var(--text);
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .nav-link:hover {
    background: var(--bg);
  }

  .nav-link.active {
    background: rgba(79, 70, 229, 0.12);
    color: var(--primary);
  }

  .logout-btn {
    height: 40px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: #fff;
    color: var(--text);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
  }

  .logout-btn:hover {
    background: var(--bg);
  }

  .logout-btn:focus-visible {
    outline: none;
    box-shadow: var(--focus);
  }

  @media (max-width: 640px) {
    .navbar-container {
      padding: 10px 16px;
    }

    .navbar-brand {
      font-size: 0.95rem;
    }

    .nav-link span {
      display: none;
    }
  }
</style>