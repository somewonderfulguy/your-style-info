export const PRIME_ROUTES = new Map([
  ['Home', 'inactive'],
  //['Generic topics & guides', 'inactive'],
  ['/guides-topics', {
    name: 'Generic topics & guides',
    routes: new Map([
      ['/body-types', 'Body types'],
      ['/color-types', 'Color types'],
      ['/color-combinations', 'How to combine colors'],
      ['/black-white-tie', 'Black and white tie'],
      ['/how-to-travel', 'How to travel']
    ])
  }],
  ['/clothes', {
    name: 'Clothes & Accessories',
    routes: new Map([
      ['/suits-jackets-vests', 'Suits, jackets, vests'],
      ['/shirts', 'Shirts'],
      ['/pantology', 'Pants & Shorts'],
      ['/shoes', 'Shoes'],
      ['/outerwear', 'Outerwear'],
      ['/accessories', 'Accessories'],
      ['/materials-and-fabrics', 'Fabrics & materials'],
      ['/patterns', 'Patterns'],
      //['/care', 'Care'],
      ['/outerwear/trench-coat', 'Care'],
      ['/t-shirts', 'T-shirts'],
      ['/underwear', 'Underwear'],
      ['/socks', 'Socks']
    ])
  }],
  //['Grooming', 'inactive'],
  ['/grooming', {
    name: 'Grooming',
    routes: new Map([
      ['/hair-care', 'Hair care'],
      ['/face-skin-care', 'Face skin care'],
      ['/hands-care', 'Hands and nails care']
    ])
  }],
  ['Brands & stores', 'inactive'],
  ['/glossary', 'Glossary'],
  ['About', 'inactive']
])