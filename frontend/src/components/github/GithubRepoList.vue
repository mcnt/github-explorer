<script setup lang="ts">
type Repo = {
  id: number | string;
  name: string;
  html_url?: string;
  url?: string;
  language?: string | null;
  stargazers_count?: number;
  stars?: number;
  forks_count?: number;
  description?: string | null;
};

defineProps<{
  repositorio: Repo[];
}>();
</script>

<template>
  <div class="card">
    <div class="header">
      <h3>Repositórios</h3>
    </div>

    <ul class="repo-list">
      <li v-for="repo in repositorio" :key="repo.id" class="repo-item">
        <div class="row">
          <a
            class="name"
            :href="repo.html_url || repo.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ repo.name }}
          </a>

          <div class="meta">
            <span v-if="repo.language" class="chip">{{ repo.language }}</span>
            <span class="chip">
              <i class="fas fa-star"></i>
              {{ repo.stargazers_count ?? repo.stars ?? 0 }}
            </span>
            <span v-if="repo.forks_count" class="chip">
              <i class="fas fa-code-branch"></i>
              {{ repo.forks_count }}
            </span>
          </div>
        </div>

        <p v-if="repo.description" class="desc">{{ repo.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header h3 {
  margin: 0 0 12px;
}

.repo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
}

.repo-item {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.repo-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.name {
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
}

.name:hover { text-decoration: underline; }

.meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 9999px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
}

.chip i { color: var(--text-light); }

.desc {
  margin-top: 8px;
  color: var(--text-light);
}

@media (max-width: 640px) {
  .row { align-items: flex-start; flex-direction: column; }
}
</style>
