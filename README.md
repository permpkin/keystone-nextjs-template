# Keystone + NextJS Boilerplate

Ready to go Keystone + NextJS Boilerplate.

Build a website using React "Blocks" with OOB Pages/Route handler.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

Open [http://localhost:8000](http://localhost:8000) with your browser to see keystone.

## Blocks

Create blocks in `/src/blocks/`, Ensure you add the block to `/src/blocks/enabled.ts` to add them to the available blocks in the editor.

All blocks need to export both a `View` and a `Schema` to work correctly (see "Example Block"). Currently only text/textarea are supported field types.

## Admin

Custom Logo/Navigation are in `/admin/components`.
Custom fields are in `/admin/fields`, Currently slug/path/blocks are in use and are tied primarily to the `Page` type.

There is also a branch called `DocumentRenderer` with a similar attempt at implementing the current `Blocks` approach into the SlateJS editor per Keystone reccomendations, It does work though it's not ideal.