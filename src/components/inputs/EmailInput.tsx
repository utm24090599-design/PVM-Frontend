import React, { useState } from 'react';

export type EmailInputProps = {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onChange?: (value: string, valid: boolean) => void;
  onBlur?: (value: string, valid: boolean) => void;
  className?: string;
};

const emailRegex = /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\])$/;

export const EmailInput: React.FC<EmailInputProps> = ({
  label = 'Email',
  name = 'email',
  value = '',
  placeholder = 'tu@email.com',
  required = true,
  disabled = false,
  autoComplete = 'email',
  onChange,
  onBlur,
  className = '',
}) => {
  const [inner, setInner] = useState<string>(value);
  const [touched, setTouched] = useState<boolean>(false);

  const isEmpty = (v: string) => v.trim().length === 0;
  const isValidEmail = (v: string) => emailRegex.test(v.trim());

  const computeError = (v: string): string | null => {
    if (required && isEmpty(v)) return 'El email es obligatorio.';
    if (!isEmpty(v) && !isValidEmail(v)) return 'Formato de email inválido.';
    return null;
  };

  const error = computeError(inner);
  const valid = error === null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInner(v);
    onChange?.(v, computeError(v) === null);
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur?.(inner, valid);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-gray-800">{label}</label>
      <input
        id={name}
        name={name}
        type="email"
        value={inner}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          touched && !valid ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {touched && error && (
        <p role="alert" className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default EmailInput;
