import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gitlearner.com',
      lastModified: new Date(),
    },
    {
      url: 'https://gitlearner.com/docs',
      lastModified: new Date(),
    },
    {
      url: 'https://gitlearner.com/guide',
      lastModified: new Date(),
    },
  ]
}
