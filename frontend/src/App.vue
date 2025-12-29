<template>
  <Navbar v-if="isAuthenticated" />
  <router-view v-slot="{ Component }">
    <component :is="Component" @auth-change="checkAuthStatus" />
  </router-view>
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue';
import { isAuthenticated as checkAuth } from '@/utils/auth';
import { ref, provide } from 'vue';

const isAuthenticated = ref(checkAuth());

provide('isAuthenticated', isAuthenticated);

const checkAuthStatus = () => {
  isAuthenticated.value = checkAuth();
};
</script>
