<template>
  <div style="overflow:hidden;">
    <table
      class="ivu-table-summary"
      cellspacing="0"
      cellpadding="0"
      border="0"
      :style="styleObject"
    >
      <colgroup>
        <col
          v-for="column in columns"
          :key="column._index ?? column.key"
          :width="setCellWidth(column)"
        >
      </colgroup>
      <tbody :class="[prefixCls + '-tbody']">
        <tr class="ivu-table-row">
          <td
            v-for="column in columns"
            :key="column._index ?? column.key"
            :class="alignCls(column)"
          >
            <div
              class="ivu-table-cell"
              :class="cellCls(column)"
            >
              <span>{{ data[column.key].value }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Mixin from '../mixins/table'

export default {
  name: 'TableSummary',
  mixins: [Mixin],
  props: {
    prefixCls: {
      type: String,
      default: 'ivu-table'
    },
    styleObject: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    }, // rebuildData
    columnsWidth: {
      type: Object,
      default: () => ({})
    },
    fixed: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    cellCls (column) {
      return [
        {
          'ivu-table-hidden': (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
        }
      ]
    }
  }
}
</script>
