<script setup>
// import file from '~/content/test.md?raw'
const currentFile = ref('test.md')
const { data: file } = await useLazyFetch('/api/readfile', {
  query: {
    file: currentFile.value
  },
})

watch(file, async (val) => {
  await $fetch('/api/writefile', {
    method: 'post',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
    query: {
      file: currentFile.value
    },
    body: val
  }) 
})

const path = '/test'
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
    .where({ _path: path })
    .findOne()
})
</script>

<template>
  <tiptap-editor v-model="file" auto-save />
  <ContentRenderer :value="data" class="prose my-10 mx-auto max-w-7xl" />
  <ContentList path="/">
    <template #default="{ list }">
      <div v-for="article in list" :key="article._path">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
    </div>
    </template>
    <template #not-found>
      <p>No articles found.</p>
    </template>
  </ContentList>
</template>

<style lang="scss" scoped></style>
