<template>
  <div :class="prefixCls + '-operation'">
    <template v-if="reverseOperation">
      <i-button
        type="primary"
        size="small"
        :disabled="!leftActive"
        @click="moveToRight"
      >
        <span>{{ operations[1] }}</span> <Icon type="ios-arrow-forward" />
      </i-button>
      <i-button
        type="primary"
        size="small"
        :disabled="!rightActive"
        @click="moveToLeft"
      >
        <Icon type="ios-arrow-back" /> <span>{{ operations[0] }}</span>
      </i-button>
    </template>
    <template v-else>
      <i-button
        type="primary"
        size="small"
        :disabled="!rightActive"
        @click="moveToLeft"
      >
        <Icon type="ios-arrow-back" /> <span>{{ operations[0] }}</span>
      </i-button>
      <i-button
        type="primary"
        size="small"
        :disabled="!leftActive"
        @click="moveToRight"
      >
        <span>{{ operations[1] }}</span> <Icon type="ios-arrow-forward" />
      </i-button>
    </template>
  </div>
</template>
<script>
import iButton from './button.vue'
import Icon from './icon.vue'

export default {
  name: 'Operation',
  components: { iButton, Icon },
  inject: ['TransferInstance'],
  props: {
    prefixCls: String,
    operations: Array,
    leftActive: Boolean,
    rightActive: Boolean,
    reverseOperation: Boolean
  },
  methods: {
    moveToLeft () {
      this.TransferInstance.moveTo('left')
    },
    moveToRight () {
      this.TransferInstance.moveTo('right')
    }
  }
}
</script>
