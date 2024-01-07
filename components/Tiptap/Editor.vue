<script setup>
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { common, createLowlight } from 'lowlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlock from "@tiptap/extension-code-block";
import Youtube from "@tiptap/extension-youtube";
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Markdown } from 'tiptap-markdown';

import { BeakerIcon } from '@heroicons/vue/24/solid'

import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  autoSave: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:modelValue'])

// const lowlight = createLowlight(common)
// CodeBlockLowlight.configure({
//   lowlight,
// })

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Table,
    TableRow,
    TableCell,
    TableHeader,
    Underline,
    Image,
    Link,
    TaskList,
    TaskItem,
    CodeBlock,
    Youtube,
    // CodeBlockLowlight,
    Markdown,
  ],
  onUpdate: ({ editor }) => {
    if(props.autoSave) {
      autoSaveFn(editor.storage.markdown.getMarkdown())
    }
  },
})

const showLoadingIndicator = ref(false)

const autoSaveFn = useDebounceFn(() => {
  save()
}, 1000, { maxWait: 5000 })

const save = function() {
  const value = editor.value.storage.markdown.getMarkdown()
  showLoadingIndicator.value = true

  setTimeout(() => {
    emit('update:modelValue', value)

    showLoadingIndicator.value = false
  }, 100)
}

onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
  <client-only>
    <div v-if="editor">
      <!-- <TiptapButton
        v-for="{ title, action, isActive, disabled } in buttons"
        :title="title"
        @click="action"
        :is-active="isActive"
        :disabled="disabled()"
      /> -->
      <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded-l">
        <!-- <BeakerIcon class="h-4 w-4 text-blue-500" /> -->
        bold
      </button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
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
    <div class="relative">
      <editor-content :editor="editor" />
      <span v-show="showLoadingIndicator" class="absolute bottom-2 right-2 bg-yellow-100">Saving...</span>
    </div>
    <button v-if="!autoSave" @click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
  </client-only>
  <!-- <ContentRenderer :value="data" class="prose my-10 mx-auto max-w-7xl" /> -->
</template>

<style lang="scss" scoped>
/* Basic editor styles */
:deep(.tiptap) {
  border: 2px solid blue;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
    list-style: disc;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

button {
  &.is-active,
  &:hover {
    background-color: #999797;
  }
}
</style>
