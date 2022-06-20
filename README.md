## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Blocks

Create blocks in `/src/blocks/`, Ensure you add the block to `/src/blocks/enabled.ts` to add them to the available blocks in the editor.

## Notes

change `[...path].tsx` to `[[...path]].tsx` and remove `index.tsx` to use the global page renderer? ( should this be default?)