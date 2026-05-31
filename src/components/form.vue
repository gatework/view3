<template>
  <form
    :class="classes"
    :autocomplete="autocomplete"
  >
    <Alert
      v-if="genericErrors.length"
      type="error"
    >
      {{ genericErrors.join("\n") }}
    </Alert>
    <slot />
  </form>
</template>
<script>
import { oneOf } from '../utils/assist'
import Emitter from '../mixins/emitter'
import Alert from '../components/alert'

const prefixCls = 'ivu-form'

export default {
  name: 'VForm',
  components: {
    Alert
  },
  mixins: [Emitter],
  provide () {
    return { FormInstance: this }
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    labelWidth: {
      type: Number
    },
    labelPosition: {
      validator (value) {
        return oneOf(value, ['left', 'right', 'top'])
      },
      default: 'right'
    },
    inline: {
      type: Boolean,
      default: false
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    autocomplete: {
      validator (value) {
        return oneOf(value, ['on', 'off'])
      },
      default: 'off'
    },
    // 4.0.0
    hideRequiredMark: {
      type: Boolean,
      default: false
    },
    // 4.0.0
    labelColon: {
      type: [Boolean, String],
      default: false
    },
    // 4.0.0
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-validate'],
  data () {
    return {
      fields: [],
      genericErrors: []
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    `${prefixCls}-label-${this.labelPosition}`,
                    {
                      [`${prefixCls}-inline`]: this.inline,
                      [`${prefixCls}-hide-required-mark`]: this.hideRequiredMark
                    }
      ]
    },
    colon () {
      let colon = ''
      if (this.labelColon) {
        colon = (typeof this.labelColon === 'boolean') ? ':' : this.labelColon
      }
      return colon
    }
  },
  watch: {
    rules () {
      this.validate()
    }
  },
  created () {
    this.mitt.on('on-form-item-add', (field) => {
      if (field) this.fields.push(field)
      return false
    })
    this.mitt.on('on-form-item-remove', (field) => {
      if (field?.prop) {
        const index = this.fields.indexOf(field)

        if (index >= 0) this.fields.splice(index, 1)
      }
      return false
    })
  },
  methods: {
    resetFields () {
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    validate (callback) {
      this.genericErrors = []

      return new Promise(resolve => {
        let valid = true
        let count = 0
        // fields 为空需要返回promise
        if (this.fields.length === 0) {
          resolve(valid)
          if (typeof callback === 'function') {
            callback(valid)
          }
          return
        }
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // all finish
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    },
    setErrors (errors = []) {
      const normalizedErrors = Array.isArray(errors) ? errors : [errors]

      normalizedErrors.filter(Boolean).forEach((error) => {
        const field = this.fields.find((f) => f.prop === (error.source || error.key || error.field))
        const message = error.detail || error.message

        if (!message) return

        if (field && message) {
          field.setError(message)
        } else {
          this.genericErrors.push(message)
        }
      })
    },
    validateField (prop, cb) {
      const field = this.fields.filter(field => field.prop === prop)[0]
      if (!field) { throw new Error('[iView warn]: must call validateField with valid prop string!') }

      field.validate('', cb)
    }
  }
}
</script>
