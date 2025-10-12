import type { CollectionConfig } from 'payload'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png'],
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data?.filename) {
          data.url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/images/${data.filename}`
        }
        return data
      },
    ],

    afterRead: [
      async ({ doc }) => {
        if (!doc?.publicUrl) return doc

        const { error } = await supabase.from('images').upsert({
          image_id: doc.id,
          url: doc.publicUrl,
          updated_at: new Date(),
        })

        if (error) {
          console.error('❌ Error syncing image URL to Supabase:', error.message)
        }

        return doc
      },
    ],
  },
  versions: {
    drafts: true,
  },
}
