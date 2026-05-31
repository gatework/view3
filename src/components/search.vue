<template>
  <div :class="prefixCls">
    <i-input
      v-model="currentQuery"
      size="small"
      :icon="icon"
      :placeholder="placeholder"
      @on-click="handleClick"
    />
  </div>
</template>
<script>
import iInput from './input.vue'

export default {
  name: 'Search',
  components: { iInput },
  props: {
    prefixCls: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    query: {
      type: String,
      default: ''
    }
  },
  emits: ['on-query-change', 'on-query-clear'],
  data () {
    return {
      currentQuery: this.query
    }
  },
  computed: {
    icon () {
      return this.query === '' ? 'ios-search' : 'ios-close-circle'
    }
  },
  watch: {
    query (val) {
      this.currentQuery = val
    },
    currentQuery (val) {
      this.$emit('on-query-change', val)
    }
  },
  methods: {
    handleClick () {
      if (this.currentQuery === '') return
      this.currentQuery = ''
      this.$emit('on-query-clear')
    }
  }
}
</script>
