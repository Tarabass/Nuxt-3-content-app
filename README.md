# Content v2 Minimal Starter

Look at the [Content documentation](https://content.nuxt.com/) to learn more.

## Editor implementation
At http://localhost:3000/editor an editor can be found which, for now, edits `content/test.md`. Beneath the editor the content of `test.md` is shown, but not yet automatically updated. With dev tools open (and cache disabled) the content will be rerendered though.

The editor component can be found in `components/Tiptap/Editor.vue` and uses a v-model two-way databind for the file that is loaded.

The editor component supports autosave. With autosave enabled the save event is debounced. With autosave disabled a save button is shown.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
