<template>
  <li>
    {{ content }} {{index}}
    <span id="deleteBtn" @click="handleDelete">x</span>
  </li>
</template>

<script>
export default {
  props: ['content', 'index'],
  methods: {
    handleDelete () {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<style scoped>
#deleteBtn {
  color:red;
  cursor: pointer;
}
</style>
