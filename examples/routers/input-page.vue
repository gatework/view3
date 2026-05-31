<template>
  <div style="width: 200px">
    <VInput
      v-model="value7"
      type="textarea"
      :autosize="true"
      placeholder="Enter something..."
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      value11: '',
      value12: '',
      value13: '',
      select1: 'http',
      select2: 'com',
      select3: 'day',
      value7: ''
    }
  },
  methods: {
    hs (val) {
      console.log(val)
    }
  }
}
</script>
