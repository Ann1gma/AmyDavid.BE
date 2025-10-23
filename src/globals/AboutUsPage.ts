import { blockFields } from '@/constants/blockFields'
import { GlobalConfig } from 'payload'

export const AboutUsPage: GlobalConfig = {
  slug: 'aboutUs',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'aboutUsTitle',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'aboutUsSubTitle',
      label: 'Subtitle',
      type: 'text',
    },
    {
      name: 'aboutUsPosts',
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
        if (!data?.aboutUsPosts) return data

        const enrichedPosts = await Promise.all(
          data.aboutUsPosts.map(async (post: any) => {
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
          aboutUsPosts: enrichedPosts,
        }

        return data
      },
    ],
  },
}
