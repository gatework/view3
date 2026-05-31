<template>
  <div>
    <i-button @click="start">
      Start
    </i-button>
    <i-button @click="finish">
      Finish
    </i-button>
    <i-button @click="error">
      Error
    </i-button>
  </div>
</template>
<script>
export default {
  created () {
    //            this.$Loading.config({
    //                color: '#5cb85c',
    //                failedColor: '#f0ad4e',
    //                height: 5
    //            });
  },
  methods: {
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    error () {
      this.$Loading.error()
    }
  }
}
</script>
