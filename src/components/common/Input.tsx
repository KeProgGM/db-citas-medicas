
import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
}

export default function Input({
  label,
  error,
  icon: Icon,
  id,
  className = '',
  ...props
}: InputProps) {

  const inputId = id || props.name

  return (
    <div className="w-full">

      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <div className="relative">

        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          id={inputId}
          className={`
            w-full rounded-xl border bg-white px-4 py-2.5
            text-sm text-slate-700 outline-none transition
            placeholder:text-slate-400
            focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200'}
            ${className}
          `}
          {...props}
        />

      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  )
}
