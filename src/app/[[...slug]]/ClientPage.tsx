'use client'

import { useState } from 'react'

async function ClientPage() {
  const [someState] = useState('foo')
  return <div>{someState}</div>
}

export default ClientPage
