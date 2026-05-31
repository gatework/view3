<template>
  <Submenu :name="`${parentName}`">
    <template #title>
      <span>{{ parentItem.name }}</span>
    </template>
    <template v-for="item in children">
      <custom-menu-item
        v-if="item.children && item.children.length !== 0"
        :key="`menu-${item.name}`"
        :parent-item="item"
      />
      <menu-item
        v-else
        :key="`menu-${item.name}`"
        :name="`${item.name}`"
      >
        {{ item.name }}
      </menu-item>
    </template>
  </Submenu>
</template>
<script>
export default {
  name: 'CustomMenuItem',
  props: {
    parentItem: {
      type: Object,
      default: () => ({})
    },
    theme: {
      type: String,
      default: 'light'
    },
    iconSize: {
      type: Number,
      default: 14
    }
  },
  computed: {
    parentName () {
      return this.parentItem.name
    },
    children () {
      return this.parentItem.children
    }
  }
}
</script>
