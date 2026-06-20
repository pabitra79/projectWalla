// Reusable form field components — Input, Textarea, Select
// These wrap the raw HTML elements with consistent styling + label + error display.

// Usage:
//   <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
//   <SelectField label="Language" name="lang" value={form.lang} onChange={handleChange} options={['Java','PHP']} />
//   <TextareaField label="Requirements" name="req" value={form.req} onChange={handleChange} rows={4} />

export function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  error,
  hint,
  className = '',
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`input ${readOnly ? 'bg-gray-50 cursor-not-allowed' : ''} ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
      />
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function SelectField({ label, name, value, onChange, options = [], required, error, placeholder, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`input ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) =>
          typeof opt === 'string'
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function TextareaField({ label, name, value, onChange, placeholder, rows = 3, required, error, hint, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`input resize-none ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
      />
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
