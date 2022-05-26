import React from 'react'

type Props = {
    text: string
    onClick?: () => void
}

export const Button: React.FC<Props> = ({ text, onClick }) => (
    <button
        className="px-4 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold"
        onClick={onClick}
    >
        {text}
    </button>
)
