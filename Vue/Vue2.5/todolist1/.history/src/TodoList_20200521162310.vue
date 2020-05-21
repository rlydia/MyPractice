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
import TodoItem from './components/TodoItem'
export default {
  data () {
    return {
      inputValue: '',
      list: []
    }
  },
  methods: {
    handleSubmit () {
      // this指的就是组件的实例(vue底层自动帮我们处理,this.list相当于 this.$data.list
      // this.list.push(this.inputValue)
      this.list = [...this.list, this.inputValue]
      this.inputValue = ''
    },
    handleDelete (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style>
#deleteBtn {
  color:red;
  cursor: pointer;
}
</style>
