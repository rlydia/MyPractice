<template>
  <li class="item">
    {{ content }} {{index}}
    <span id="deleteBtn" @click="handleClick">x</span>
  </li>
</template>

<script>
export default {
  props: ['content', 'index'],
  methods: {
    handleClick () {
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
.item {
  color: green;
}
</style>
