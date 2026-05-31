import { defineStore } from 'pinia'

import { routes } from '../router/routes.js'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    routes
  }),
  getters: {
    items: (state) => state.routes.map((route) => ({
      path: route.path,
      label: route.meta.label
    }))
  }
})
