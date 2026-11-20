
import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
  placeholder?: string
}

export default function Select({
  label,
  options,
  error,
  placeholder = 'Seleccione una opción',
  id,
  className = '',
  ...props
}: SelectProps) {

  const selectId = id || props.name

  return (
    <div className="w-full">

      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <select
        id={selectId}
        className={`
          w-full rounded-xl border bg-white px-4 py-2.5
          text-sm text-slate-700 outline-none transition
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          ${error ? 'border-red-400' : 'border-slate-200'}
          ${className}
        `}
        {...props}
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </select>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  )
}
