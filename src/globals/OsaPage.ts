import { blockFields } from '@/constants/blockFields'
import { GlobalConfig } from 'payload'

export const OsaPage: GlobalConfig = {
  slug: 'Osa',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'OsaTitle',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'OsaSubTitle',
      label: 'Subtitle',
      type: 'text',
    },
    {
      name: 'OsaPosts',
      label: 'Posts',
      type: 'array',
      fields: blockFields,
    },
    {
      name: 'data',
      type: 'json',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (!data?.OsaPosts) return data

        const enrichedPosts = await Promise.all(
          data.OsaPosts.map(async (post: any) => {
            if (post.blockImage) {
              try {
                const imageDoc = await req.payload.findByID({
                  collection: 'images',
                  id: post.blockImage,
                })

                post.blockImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/images/${imageDoc?.filename}`
              } catch (err) {
                console.warn('⚠️ Could not fetch image for post:', post.blockImage)
              }
            }

            return post
          }),
        )

        const { data: _ignore, ...rest } = data

        data.data = {
          ...rest,
          OsaPosts: enrichedPosts,
        }

        return data
      },
    ],
  },
}
