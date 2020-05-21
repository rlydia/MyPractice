<template>
  <div>
    <div>
      <input v-model="inputValue"/>
      <button @click="handleSubmit">提交</button>
    </div>
    <ul>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: '',
      list: []
    }
  },
  methods: {
    handleSubmit () {
      // this指的就是组件的实例
      // this.list.push(this.inputValue)
      this.list = [...this.list, this.inputValue]
    }
  }
}
</script>

<style>

</style>
