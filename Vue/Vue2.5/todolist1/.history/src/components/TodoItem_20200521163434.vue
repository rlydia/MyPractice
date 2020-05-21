<template>
  <li>
    {{ content }} {{index}}
    <span id="deleteBtn" @click="handleClick">x</span>
  </li>
</template>

<script>
export default {
  props: ['content', "index"],
  methods: {
    handleClick(index) {

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
