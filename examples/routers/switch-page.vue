<template>
  <div>
    <Switch
      v-model="m1"
      :loading="loading"
      :before-change="beforeChange"
      @on-change="change"
    >
      <template #open>
        <span>开</span>
      </template>
      <template #close>
        <span>关</span>
      </template>
    </Switch>
    {{ m1 }}
    <div @click="m1 = !m1">
      toggle
    </div>
    <div @click="loading = !loading">
      loading
    </div>
    <br><br>
    <Switch
      size="large"
      loading
    />
    <Switch />
    <Switch
      v-model="m1"
      size="small"
      :loading="loading"
    />
    <br><br>
    <Switch>
      <template #open>
        <span>开</span>
      </template>
      <template #close>
        <span>关</span>
      </template>
    </Switch>
    <Switch>
      <template #open>
        <Icon

          type="md-checkmark"
        />
      </template>
      <template #close>
        <Icon

          type="md-close"
        />
      </template>
    </Switch>
    <br><br>
    <Switch size="large">
      <template #open>
        <span>开启</span>
      </template>
      <template #close>
        <span>关闭</span>
      </template>
    </Switch>
    <Switch
      v-model="m1"
      size="large"
      :loading="loading"
    >
      <template #open>
        <span>ON</span>
      </template>
      <template #close>
        <span>OFF</span>
      </template>
    </Switch>
    <br><br>
    <Switch :disabled="disabled" />
    <VButton
      type="primary"
      @click="disabled = !disabled"
    >
      Toggle Disabled
    </VButton>
    <Divider />
    <Switch
      v-model="switch1"
      true-color="#13ce66"
      false-color="#ff4949"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      m1: true,
      disabled: true,
      loading: false,
      switch1: true
    }
  },
  methods: {
    change (status) {
      console.log(status)
    },
    beforeChange () {
      return new Promise((resolve, reject) => {
        this.$Modal.confirm({
          title: '切换确认',
          content: '您确认要切换开关状态吗？',
          onOk: () => {
            resolve()
          },
          onCancel: () => {
            reject()
          }
        })
      })
    }
  }
}
</script>
