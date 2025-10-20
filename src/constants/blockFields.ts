import { Field } from 'payload'
import {
  imageOptions,
  linkBtnOptions,
  textAlignmentOptions,
  textStyleOptions,
} from './selectOptions'

export const blockFields: Field[] = [
  {
    name: 'blockTitle',
    label: 'Block title',
    type: 'text',
  },
  {
    name: 'blockTitlealignment',
    label: 'Block title alignment',
    type: 'select',
    options: textAlignmentOptions,
    defaultValue: 'textAlginmentLeft',
  },
  {
    name: 'blockTitleStyle',
    label: 'Block title styling',
    type: 'select',
    options: textStyleOptions,
    defaultValue: 'textStyleNormal',
  },
  {
    name: 'blockSubtitle',
    label: 'Block subtitle',
    type: 'text',
  },
  {
    name: 'blockSubtitlealignment',
    label: 'Block subtitle alignment',
    type: 'select',
    options: textAlignmentOptions,
    defaultValue: 'textAlginmentLeft',
  },
  {
    name: 'blockSubtitleStyle',
    label: 'Block subtitle styling',
    type: 'select',
    options: textStyleOptions,
    defaultValue: 'textStyleNormal',
  },
  {
    name: 'blockText',
    label: 'Block text',
    type: 'textarea',
  },
  {
    name: 'blockTextalignment',
    label: 'Block text alignment',
    type: 'select',
    options: textAlignmentOptions,
    defaultValue: 'textAlginmentLeft',
  },
  {
    name: 'blockTextStyle',
    label: 'Block text styling',
    type: 'select',
    options: textStyleOptions,
    defaultValue: 'textStyleNormal',
  },
  {
    name: 'blockImage',
    label: 'Image',
    type: 'upload',
    relationTo: 'images',
  },
  {
    name: 'blockImageSetting',
    label: 'Block image settings',
    type: 'select',
    options: imageOptions,
    defaultValue: 'fullWidth',
    admin: {
      description:
        'In "Full width", the image will be rendered above the text. On mobile, the image will always be displayed in the same layout as in full width.',
    },
  },
  {
    name: 'linkBtn',
    label: 'Link button',
    type: 'select',
    options: linkBtnOptions,
    defaultValue: 'startPage',
  },
  {
    name: 'linkBtnText',
    label: 'Link button text',
    type: 'text',
  },
]
