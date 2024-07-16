"use client"
import React from 'react'
import WalletCard from '../components/WalletCard'
import NavigationBar from '../components/NavigationBar'
import History from '../components/History'

const Page = () => {
  return (
    <div className='bg-slate-300'>
      <WalletCard />
      <History />
      <NavigationBar />
    </div>
  )
}

export default Page
