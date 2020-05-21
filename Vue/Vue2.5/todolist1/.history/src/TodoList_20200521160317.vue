<template>
  <div>
    <div>
      <input v-model="inputValue"/>
      <button>提交</button>
    </div>
    <ul>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  }
}
</script>

<style>

</style>
