import { component, fields } from '@keystone-6/fields-document/component-blocks';
import editor from './editor';

export default component({
  // chromeless: true,
  label: 'Carousel',
  preview: editor,
  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({ label: 'Title' }),
        image: fields.url({
          label: 'Image URL',
          defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        }),
      })
    ),
    content: fields.child({
      kind: 'block',
      placeholder: 'Quote...',
      formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
      links: 'inherit',
    }),
    testfield: fields.text({
      label: "Test Field",
      defaultValue: "test field"
    }),
  }
});