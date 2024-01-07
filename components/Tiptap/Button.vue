<script lang="ts" setup>
defineProps<{
  title: string
  isActive: Function
}>()
</script>

<template>
  <button
    class="tiptap-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
    :class="{ 'is-active': isActive }"
  >
    {{ title }}
  </button>
</template>

<style lang="scss" scoped>
.tiptap-button {
  &.is-active,
  &:hover {
    background-color: #3d3c3c;
  }
}
</style>