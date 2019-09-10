export const PRIME_ROUTES = new Map([
  ['/', 'Home'],
  ['/outerwear', {
    name: 'Outerwear',
    routes: new Map([
      ['/pea-coat', 'Pea coat'],
      ['/quilted-jacket', 'Quilted jacket'],
      ['/trench-coat', 'Trench coat'],
    ])
  }],
  ['/accessories', {
    name: 'Accessories',
    routes: new Map([
      ['/carry', 'Bags, luggage, pouches']
    ])
  }],
  ['/glossary', 'Glossary'],
  ['/blog', 'Blog'],
  ['/about', 'About']
])