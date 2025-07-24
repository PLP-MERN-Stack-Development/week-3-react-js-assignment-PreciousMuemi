const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700';
  
  const variantClasses = {
    default: '',
    primary: 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20',
    secondary: 'border-gray-200 dark:border-gray-700',
    success: 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20',
    warning: 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20',
    danger: 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 