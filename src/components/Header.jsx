// components/Header.jsx
import React from 'react'
import { Bars3Icon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const Header = ({ dark, toggleDark, toggleSidebar }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <button className="md:hidden" onClick={toggleSidebar}>
        <Bars3Icon className="w-6 h-6" />
      </button>
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-800 to-purple-500">YM ChatBOT Ai</h1>
    </div>
    <button onClick={toggleDark} title="Toggle Dark Mode">
      {dark ? <SunIcon className="w-8 h-8 text-purple-600" /> : <MoonIcon className="w-8 h-8 text-purple-800" />}
    </button>
  </div>
)

export default Header