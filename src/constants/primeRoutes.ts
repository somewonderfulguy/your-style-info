export type ThumbnailType =
  | {
      url: string
      alt?: string
      background: string
    }
  | null
  | undefined

export type PrimeRoutesType = {
  [key: string]: {
    name: string
    thumbnail?: ThumbnailType
    sub?: PrimeRoutesType
    inactive?: boolean
  }
}

// TODO: base64 low quality images for thumbnails (or preload images)

export const PRIME_ROUTES: PrimeRoutesType = {
  '/': {
    name: 'Home'
  },
  '/clothes': {
    name: 'Clothes & Accessories',
    thumbnail: {
      url: '/img/thumbs/wardrobe.png',
      alt: 'Checkroom, wardrobe',
      background: '#979090'
    },
    sub: {
      '/shoes': {
        name: 'Shoes',
        thumbnail: {
          url: '/img/thumbs/shoes.png',
          alt: 'Blucher & monkstrap',
          background: '#a69e95'
        }
      },
      '/outerwear/trench-coat': {
        name: 'Trench coat',
        thumbnail: {
          url: '/img/thumbs/trench-coat.png',
          alt: 'Alain Delon in trench coat',
          background: '#8b7f7d'
        }
      },
      '/maintenance': {
        name: 'Wardrobe maintenance',
        thumbnail: {
          url: '/img/thumbs/steamer.png',
          alt: 'A man with steamer',
          background: '#777171'
        }
      }
    }
  },
  '/about': {
    name: 'About'
  }
}
