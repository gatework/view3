<template>
  <div
    :class="classes"
    :style="listStyle"
  >
    <div :class="`${prefixCls}-header`">
      <Checkbox
        :model-value="allChecked"
        :indeterminate="indeterminate"
        :disabled="validKeys.length === 0"
        @on-change="toggleSelectAll"
      >
        <span :class="`${prefixCls}-header-title`">{{ title }}</span>
        <span :class="`${prefixCls}-header-count`">{{ checkedCount }}/{{ validKeys.length }}</span>
      </Checkbox>
    </div>
    <div :class="bodyClasses">
      <div
        v-if="filterable"
        :class="`${prefixCls}-body-search-wrapper`"
      >
        <VInput
          v-model="query"
          :placeholder="filterPlaceholder"
          :class="`${prefixCls}-search`"
          clearable
        />
      </div>
      <ul :class="`${prefixCls}-content`">
        <li
          v-for="item in filteredData"
          :key="item.key"
          :class="itemClasses"
        >
          <Checkbox
            :model-value="checkedKeys.includes(item.key)"
            :disabled="item.disabled"
            @on-change="checked => handleItemChange(item.key, checked)"
          >
            <span>{{ renderFormat(item) }}</span>
          </Checkbox>
        </li>
        <li
          v-if="filteredData.length === 0"
          :class="`${prefixCls}-content-not-found`"
        >
          {{ notFoundText }}
        </li>
      </ul>
    </div>
    <div
      v-if="$slots.default"
      :class="`${prefixCls}-footer`"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import Checkbox from './checkbox.vue'
import VInput from './input.vue'

export default {
  name: 'TransferList',
  components: { Checkbox, VInput },
  props: {
    prefixCls: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    renderFormat: {
      type: Function,
      required: true
    },
    checkedKeys: {
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
    title: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: {
      type: Function,
      required: true
    },
    notFoundText: {
      type: String,
      default: ''
    }
  },
  emits: ['on-checked-keys-change'],
  data () {
    return {
      query: ''
    }
  },
  computed: {
    classes () {
      return [
        this.prefixCls,
        {
          [`${this.prefixCls}-with-footer`]: this.$slots.default
        }
      ]
    },
    bodyClasses () {
      return [
        `${this.prefixCls}-body`,
        {
          [`${this.prefixCls}-body-with-search`]: this.filterable,
          [`${this.prefixCls}-body-with-footer`]: this.$slots.default
        }
      ]
    },
    itemClasses () {
      return `${this.prefixCls}-content-item`
    },
    filteredData () {
      if (!this.query) return this.data
      return this.data.filter(item => this.filterMethod(item, this.query))
    },
    validKeys () {
      return this.filteredData
        .filter(item => !item.disabled)
        .map(item => item.key)
    },
    checkedCount () {
      return this.validKeys.filter(key => this.checkedKeys.includes(key)).length
    },
    allChecked () {
      return this.validKeys.length > 0 && this.checkedCount === this.validKeys.length
    },
    indeterminate () {
      return this.checkedCount > 0 && !this.allChecked
    }
  },
  methods: {
    toggleSelectAll (checked) {
      this.$emit('on-checked-keys-change', checked ? this.validKeys : [])
    },
    handleItemChange (key, checked) {
      const nextKeys = checked
        ? [...this.checkedKeys, key]
        : this.checkedKeys.filter(checkedKey => checkedKey !== key)

      this.$emit('on-checked-keys-change', nextKeys)
    }
  }
}
</script>
