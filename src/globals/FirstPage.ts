import { GlobalConfig } from 'payload'

export const FirstPage: GlobalConfig = {
  slug: 'firstPage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'firstPageTitle',
      label: 'First page title',
      type: 'text',
    },
    {
      name: 'firstPageSubTitle',
      label: 'First page subtitle',
      type: 'text',
    },
  ],
}
