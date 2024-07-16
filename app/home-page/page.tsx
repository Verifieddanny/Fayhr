"use client"
import React from 'react'
import SearchBar from './components/SearchBar'
import NavigationBar from './components/NavigationBar'
import Poll from './components/Poll'
import "./style.css"

const Page = () => {
  return (
    <main>
      <SearchBar />
      <div className='w-full px-5 h-full bg-slate-600 overflow-y-scroll mb-44 no-scroll'>
        <Poll />
      </div>
      <NavigationBar />
    </main>
  )
}

export default Page
