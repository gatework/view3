<template>
  <div class="container">
    <nav class="navigation">
      <router-link
        v-for="item in items"
        :key="item.path"
        :to="item.path"
      >
        {{ item.label }}
      </router-link>
    </nav>
    <main class="preview">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useNavigationStore } from './stores/navigation.js'

const navigationStore = useNavigationStore()
const { items } = storeToRefs(navigationStore)
</script>

<style scoped>
.container {
  padding: 20px;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
}

.preview {
  margin: 50px;
}
</style>
