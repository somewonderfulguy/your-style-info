export const PRIME_ROUTES = {
  '/home': {
    name: 'Home'
  },
  '/guides-topics': {
    name: 'Guides & generic topics',
    thumbnail: {
      url: '/img/thumbs/steve.png',
      alt: 'Steve McQueen in three piece suit',
      background: '#7b7a77'
    },
    sub: {
      '/colors-how-to': {
        name: 'How to combine colors',
        thumbnail: {
          url: '/img/thumbs/colours.png',
          alt: 'Oswald circle / color palette',
          background: '#b9afb0'
        }
      },
      '/how-to-travel': {
        name: 'How to travel',
        thumbnail: {
          url: '/img/thumbs/travel.png',
          alt: 'Daniek Craig & Lea Seydoux "travelling" - Spectre movie',
          background: '#b5a18f'
        }
      },
      '/body-types': {
        name: 'Body types',
        inactive: true
      },
      '/color-types': {
        name: 'Color types',
        inactive: true
      }
    }
  },
  '/mixed': {
    name: 'Mixed',
    inactive: true
  }
}