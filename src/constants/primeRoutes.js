export const PRIME_ROUTES = {
  '/home': {
    name: 'Home',
    inactive: true
  },
  '/guides-topics': {
    name: 'Generic topics & guides',
    sub: {
      '/body-types': {
        name: 'Body types',
        inactive: true
      },
      '/color-types': {
        name: 'Color types',
        inactive: true
      },
      '/colors-how-to': {
        name: 'How to combine colors',
        inactive: true
      },
      '/black-white-tie': {
        name: 'Black and white tie',
        thumbnail: '/public/img/thumbs/black-tie.jpg'
      },
      '/how-to-travel': {
        name: 'How to travel',
        inactive: true
      }
    }
  },
  '/clothes': {
    name: 'Clothes & Accessories',
    thumbnail: '/public/img/thumbs/wardrobe.jpg',
    sub: {
      '/suits-jackets-vests': {
        name: 'Suits, jackets, vests',
        thumbnail: '/public/img/thumbs/suits.jpg'
      },
      '/shirts': {
        name: 'Shirts'
      },
      '/pantology': {
        name: 'Pants & Shorts'
      },
      '/shoes': {
        name: 'Shoes',
        thumbnail: '/public/img/thumbs/shoes.jpg'
      },
      '/outerwear': {
        name: 'Outerwear',
        thumbnail: '/public/img/thumbs/jacket.jpg'
      },
      '/accessories': {
        name: 'Accessories',
        thumbnail: '/public/img/thumbs/accessories.jpg'
      },
      '/materials-and-fabrics': {
        name: 'Fabrics & materials',
        thumbnail: '/public/img/thumbs/cotton.jpg'
      },
      '/patterns': {
        name: 'Patterns'
      },
      '/care': {
        name: 'Care'
      },
      '/t-shirts': {
        name: 'T-shirts'
      },
      '/underwear': {
        name: 'Underwear',
        inactive: true
      },
      '/socks': {
        name: 'Socks',
        inactive: true
      }
    }
  },
  '/grooming': {
    name: 'Grooming',
    thumbnail: '/public/img/thumbs/grooming.png',
    sub: {
      '/hair-care': {
        name: 'Body types'
      },
      '/face-skin-care': {
        name: 'Face skin care',
        thumbnail: '/public/img/thumbs/skin-care.jpg'
      },
      '/hands-care': {
        name: 'Hands and nails care',
        thumbnail: '/public/img/thumbs/manicure-set.jpeg'
      }
    }
  },
  '/brands-stores': {
    name: 'Brands & stores',
    inactive: true
  },
  '/glossary': {
    name: 'Glossary',
    inactive: true
  },
  '/mixed': {
    name: 'Mixed',
    inactive: true
  }
}