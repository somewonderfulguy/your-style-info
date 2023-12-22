'use client'

import dynamic from 'next/dynamic'

import '../../assets/styles/common-styles.css'

const App = dynamic(() => import('../../components/App'), { ssr: false })

const Page = () => <App />

export default Page
