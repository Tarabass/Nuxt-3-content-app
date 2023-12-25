<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// TODO: query content from .md files and pass it through to the editor
const path = '/blog/hello-world'
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
    .where({ _path: path })
    .findOne()
})

console.log(data.value?._source);


const editor = useEditor({
  content: data.value?.body,//'<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
  ],
})

onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
  <div v-if="editor">
    <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
      bold
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      italic
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      strike
    </button>
    <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      code
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      clear marks
    </button>
    <button @click="editor.chain().focus().clearNodes().run()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      clear nodes
    </button>
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      paragraph
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      h1
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      h2
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      h3
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      h4
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      h5
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      h6
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      bullet list
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      ordered list
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      code block
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      blockquote
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      hard break
    </button>
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
      undo
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
      redo
    </button>
  </div>
  <editor-content :editor="editor" />
</template>

<style lang="scss" scoped></style>
