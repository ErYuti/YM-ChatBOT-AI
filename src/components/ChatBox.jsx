// components/ChatBox.jsx
import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const ChatBox = ({ question, setQuestion, askAI, loading }) => (
  <div className="flex items-center bg-purple-700 rounded-xl overflow-hidden shadow">
    <input
      type="text"
      value={question}
      onChange={e => setQuestion(e.target.value)}
      placeholder="Ask me anything...??"
      className="w-full text-xl font-semibold p-4 bg-transparent text-white outline-none placeholder-purple-200"
    />
    <button
      onClick={askAI}
      className="p-4 "
      title="Ask"
      disabled={loading}
    >
      {loading ? (
        <div className="w-8 h-8 border-2 border-purple-300 border-t-transparent rounded-full animate-spin" />
      ) : (
        <ArrowRightIcon className="w-8 h-8 text-purple-200" />
      )}
    </button>
  </div>
)

export default ChatBox

