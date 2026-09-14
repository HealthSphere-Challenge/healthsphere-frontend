import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & { label: string; error?: string; hint?: ReactNode }

export function FormField({ label, error, hint, className = '', ...props }: FormFieldProps) {
  const id = useId(); const hintId = hint ? `${id}-hint` : undefined; const errorId = error ? `${id}-error` : undefined
  return <div className="form-field"><label className="form-label" htmlFor={id}>{label}</label>{hint && <p className="form-hint" id={hintId}>{hint}</p>}<input className={`input ${className}`.trim()} id={id} aria-invalid={Boolean(error)} aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined} {...props} />{error && <p className="form-error" id={errorId}>{error}</p>}</div>
}
