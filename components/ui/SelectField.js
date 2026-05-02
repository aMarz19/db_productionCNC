'use client';

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih',
  required = false,
  className = '',
  ...props
}) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
