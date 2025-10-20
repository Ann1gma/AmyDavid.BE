// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharpPkg from 'sharp'

import { Users } from './collections/Users'
import { Images } from './collections/Images'
import { s3Storage } from '@payloadcms/storage-s3'
import { StartPage } from './globals/StartPage'
import { AboutUsPage } from './globals/AboutUsPage'
import { InfoPage } from './globals/InfoPage'
import { OsaPage } from './globals/OsaPage'
import { SpeechPage } from './globals/SpeechPage'

const sharp = sharpPkg || sharpPkg

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [StartPage, AboutUsPage, InfoPage, OsaPage, SpeechPage],
  collections: [Users, Images],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true, // Only change when you're sure about your changes
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        [Images.slug]: {
          prefix: 'images',
        },
      },
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET as string,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.NEXT_PUBLIC_S3_REGION,
        endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
      },
    }),
  ],
})
