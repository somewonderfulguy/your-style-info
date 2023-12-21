'use client'

import dynamic from 'next/dynamic'

import '../../assets/styles/common-styles.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App = dynamic(() => import('../../components/App'), { ssr: false }) as any

const Page = () => <App />

export default Page
