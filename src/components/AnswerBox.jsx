import React, { useEffect, useState } from 'react'
import { ClipboardIcon, ArrowDownTrayIcon, CheckIcon } from '@heroicons/react/24/solid'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

const AnswerBox = ({ result }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [result])

  const copyText = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadText = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'answer.txt'
    link.click()
  }

  if (!result) return null

  return (
    <div className="relative m-5 p-6 rounded-lg shadow max-w-full text-justify border border-purple-600 dark:border-purple-400">
      <div className="flex gap-3 mb-3 justify-end">
        <button
          onClick={copyText}
          title="Copy"
          className="hover:opacity-80 transition-all"
        >
          {copied ? (
            <CheckIcon className="w-6 h-6 text-green-500" />
          ) : (
            <ClipboardIcon className="w-6 h-6 text-purple-700" />
          )}
        </button>
        <button
          onClick={downloadText}
          title="Download"
          className="hover:opacity-80 transition-all"
        >
          <ArrowDownTrayIcon className="w-6 h-6 text-purple-700" />
        </button>
      </div>

      <div className="whitespace-pre-wrap text-base leading-relaxed">
        {result}
      </div>
    </div>
  )
}

export default AnswerBox
