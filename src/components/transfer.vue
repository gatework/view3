<template>
  <div :class="classes">
    <TransferList
      ref="left"
      :prefix-cls="prefixCls + '-list'"
      :data="leftData"
      :render-format="renderFormat"
      :checked-keys="leftCheckedKeys"
      :list-style="listStyle"
      :title="localeTitles[0]"
      :filterable="filterable"
      :filter-placeholder="localeFilterPlaceholder"
      :filter-method="filterMethod"
      :not-found-text="localeNotFoundText"
      @on-checked-keys-change="handleLeftCheckedKeysChange"
    >
      <slot />
    </TransferList>
    <Operation
      :prefix-cls="prefixCls"
      :operations="operations"
      :left-active="leftValidKeysCount > 0"
      :right-active="rightValidKeysCount > 0"
      :reverse-operation="reverseOperation"
    />
    <TransferList
      ref="right"
      :prefix-cls="prefixCls + '-list'"
      :data="rightData"
      :render-format="renderFormat"
      :checked-keys="rightCheckedKeys"
      :list-style="listStyle"
      :title="localeTitles[1]"
      :filterable="filterable"
      :filter-placeholder="localeFilterPlaceholder"
      :filter-method="filterMethod"
      :not-found-text="localeNotFoundText"
      @on-checked-keys-change="handleRightCheckedKeysChange"
    >
      <slot />
    </TransferList>
  </div>
</template>
<script>
import TransferList from './transfer-list.vue'
import Operation from './operation'
import Locale from '../mixins/locale'
import Emitter from '../mixins/emitter'

const prefixCls = 'ivu-transfer'

export default {
  name: 'Transfer',
  components: { TransferList, Operation },
  mixins: [Emitter, Locale],
  provide () {
    return {
      TransferInstance: this
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    renderFormat: {
      type: Function,
      default (item) {
        return item.label || item.key
      }
    },
    targetKeys: {
      type: Array,
      default () {
        return []
      }
    },
    selectedKeys: {
      type: Array,
      default () {
        return []
      }
    },
    listStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    titles: {
      type: Array
    },
    operations: {
      type: Array,
      default () {
        return []
      }
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterPlaceholder: {
      type: String
    },
    filterMethod: {
      type: Function,
      default (data, query) {
        const type = ('label' in data) ? 'label' : 'key'
        return data[type].indexOf(query) > -1
      }
    },
    notFoundText: {
      type: String
    },
    // 4.2.0
    // 反转两个按钮
    reverseOperation: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-change', 'on-selected-change'],
  data () {
    return {
      prefixCls: prefixCls,
      leftData: [],
      rightData: [],
      leftCheckedKeys: [],
      rightCheckedKeys: []
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`
      ]
    },
    leftValidKeysCount () {
      return this.getValidKeys('left').length
    },
    rightValidKeysCount () {
      return this.getValidKeys('right').length
    },
    localeFilterPlaceholder () {
      if (this.filterPlaceholder === undefined) {
        return this.t('i.transfer.filterPlaceholder')
      } else {
        return this.filterPlaceholder
      }
    },
    localeNotFoundText () {
      if (this.notFoundText === undefined) {
        return this.t('i.transfer.notFoundText')
      } else {
        return this.notFoundText
      }
    },
    localeTitles () {
      if (this.titles === undefined) {
        return [this.t('i.transfer.titles.source'), this.t('i.transfer.titles.target')]
      } else {
        return this.titles
      }
    }
  },
  watch: {
    targetKeys () {
      this.splitData(false)
    },
    data () {
      this.splitData(false)
    }
  },
  mounted () {
    this.splitData(true)
  },
  methods: {
    getValidKeys (direction) {
      return this[`${direction}Data`].filter(data => !data.disabled && this[`${direction}CheckedKeys`].indexOf(data.key) > -1).map(data => data.key)
    },
    splitData (init = false) {
      this.leftData = [...this.data]
      this.rightData = []
      if (this.targetKeys.length > 0) {
        this.targetKeys.forEach((targetKey) => {
          const filteredData = this.leftData.filter((data, index) => {
            if (data.key === targetKey) {
              this.leftData.splice(index, 1)
              return true
            }
            return false
          })
          if (filteredData && filteredData.length > 0) this.rightData.push(filteredData[0])
        })
      }
      if (init) {
        this.splitSelectedKey()
      }
    },
    splitSelectedKey () {
      const selectedKeys = this.selectedKeys
      if (selectedKeys.length > 0) {
        this.leftCheckedKeys = this.leftData
          .filter(data => selectedKeys.indexOf(data.key) > -1)
          .map(data => data.key)
        this.rightCheckedKeys = this.rightData
          .filter(data => selectedKeys.indexOf(data.key) > -1)
          .map(data => data.key)
      }
    },
    moveTo (direction) {
      const targetKeys = this.targetKeys
      const opposite = direction === 'left' ? 'right' : 'left'
      const moveKeys = this.getValidKeys(opposite)
      const newTargetKeys = direction === 'right'
        ? moveKeys.concat(targetKeys)
        : targetKeys.filter(targetKey => !moveKeys.some(checkedKey => targetKey === checkedKey))

      this.$refs[opposite].toggleSelectAll(false)
      this.$emit('on-change', newTargetKeys, direction, moveKeys)
      this.dispatch('FormItem', 'on-form-change', {
        tarketKeys: newTargetKeys,
        direction: direction,
        moveKeys: moveKeys
      })
    },
    handleLeftCheckedKeysChange (keys) {
      this.leftCheckedKeys = keys
      this.handleCheckedKeys()
    },
    handleRightCheckedKeysChange (keys) {
      this.rightCheckedKeys = keys
      this.handleCheckedKeys()
    },
    handleCheckedKeys () {
      const sourceSelectedKeys = this.getValidKeys('left')
      const targetSelectedKeys = this.getValidKeys('right')
      this.$emit('on-selected-change', sourceSelectedKeys, targetSelectedKeys)
    }
  }
}
</script>
