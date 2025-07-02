// components/Sidebar.jsx
import React from 'react'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'

const Sidebar = ({ history, deleteEntry, clearHistory, sidebarOpen, toggleSidebar, dark }) => {
  return (
    <aside
      className={`${
        dark ? 'bg-zinc-800 text-purple-500' : 'bg-purple-200 text-purple-700'
      } fixed md:relative z-50 top-0 left-0 h-full w-64 md:w-full p-4 transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-8 mt-2">
        <h2 className="text-2xl font-bold">History</h2>
        <div className="flex items-center gap-2">
          <button onClick={clearHistory} title="Clear All">
            <TrashIcon className="w-6 h-6 text-purple-600 hover:text-purple-500" />
          </button>
          <button className="md:hidden" onClick={toggleSidebar}>
            <XMarkIcon className="w-6 h-6 text-purple-300" />
          </button>
        </div>
      </div>
      <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-150px)] pr-2 text-sm">
        {history.map(item => (
          <li key={item.id} className="flex justify-between items-center text-white bg-purple-700 p-2 rounded">
            <span className="truncate w-44">{item.q}</span>
            <button onClick={() => deleteEntry(item.id)} title="Delete">
              <XMarkIcon className="w-4 h-4 text-purple-200 hover:text-purple-950" />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar