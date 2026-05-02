'use client';

const InputField = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  className = '',
  ...props
}) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

export default InputField;
