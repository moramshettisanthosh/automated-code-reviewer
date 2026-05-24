const Button = ({ children, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`rounded-3xl bg-gradient-to-r from-primary to-accent px-5 py-3 font-semibold text-slate-950 transition hover:shadow-glow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
