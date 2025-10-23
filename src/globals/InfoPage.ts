import { blockFields } from '@/constants/blockFields'
import { GlobalConfig } from 'payload'

export const InfoPage: GlobalConfig = {
  slug: 'info',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'infoTitle',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'infoSubTitle',
      label: 'Subtitle',
      type: 'text',
    },
    {
      name: 'infoPosts',
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
        if (!data?.infoPosts) return data

        const enrichedPosts = await Promise.all(
          data.infoPosts.map(async (post: any) => {
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
          infoPosts: enrichedPosts,
        }

        return data
      },
    ],
  },
}
