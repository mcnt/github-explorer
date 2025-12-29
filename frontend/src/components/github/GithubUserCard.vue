<template>
  <div class="user-card">
    <div class="header">
      <img class="avatar" :src="user.avatar_url" :alt="user.name || user.login" />
      <div class="identity">
        <h3 class="name">{{ user.name || user.login }}</h3>
        <a class="username" :href="user.html_url" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github"></i>
          {{ user.login }}
        </a>
      </div>
    </div>

    <p v-if="user.bio" class="bio">{{ user.bio }}</p>

    <div class="stats">
      <div class="stat">
        <i class="fas fa-user-friends"></i>
        <span class="value">{{ user.followers }}</span>
        <span class="label">Seguidores</span>
      </div>
      <div class="stat">
        <i class="fas fa-user-check"></i>
        <span class="value">{{ user.following }}</span>
        <span class="label">Seguindo</span>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import type { GithubUser } from '@/types/Github';

defineProps<{ user: GithubUser }>();
</script>

<style scoped>
.user-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.name { margin: 0; }

.username {
  color: var(--primary);
  text-decoration: none;
  font-size: var(--text-sm);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--primary) 20%, var(--border));
  background: color-mix(in srgb, var(--primary) 6%, #fff);
  width: fit-content;
}

.username:hover {
  background: color-mix(in srgb, var(--primary) 10%, #fff);
}

.bio {
  margin-top: 16px;
  color: var(--text);
  line-height: 1.6;
}

.stats {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.stat {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  border: 1px solid var(--border);
  background: var(--bg);
  padding: 10px 12px;
  border-radius: 12px;
}

.stat .value { font-weight: 600; }
.stat .label { color: var(--text-light); font-size: var(--text-sm); }

@media (max-width: 640px) {
  .user-card { padding: 16px; }
  .avatar { width: 64px; height: 64px; }
  .header { padding-bottom: 12px; }
  .stats { grid-template-columns: 1fr; }
}
</style>
