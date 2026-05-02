'use client';

const VARIANTS = {
  primary: 'bg-linear-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
  danger: 'bg-red-100 text-red-700 hover:bg-red-200',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
};

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const styles = `${fullWidth ? 'w-full' : ''} ${VARIANTS[variant] || VARIANTS.primary}`;

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
