import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string
    onClick?: () => void
}

export const Button: React.FC<Props> = ({ text, onClick, ...props }) => (
    <button
        className="px-4 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold"
        onClick={onClick}
        {...props}
    >
        {text}
    </button>
)
