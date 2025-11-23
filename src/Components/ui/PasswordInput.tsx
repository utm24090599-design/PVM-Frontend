import React, { useState } from 'react';

export type PasswordInputProps = {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number; // basic rule, default 6
  onChange?: (value: string, valid: boolean) => void;
  onBlur?: (value: string, valid: boolean) => void;
  className?: string;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Contraseña',
  name = 'password',
  value = '',
  placeholder = '••••••••',
  required = true,
  disabled = false,
  minLength = 6,
  onChange,
  onBlur,
  className = '',
}) => {
  const [inner, setInner] = useState<string>(value);
  const [touched, setTouched] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const isEmpty = (v: string) => v.trim().length === 0;

  const computeError = (v: string): string | null => {
    if (required && isEmpty(v)) return 'La contraseña es obligatoria.';
    if (!isEmpty(v) && v.length < minLength) return `La contraseña debe tener al menos ${minLength} caracteres.`;
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
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          value={inner}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            touched && !valid ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right9 top-1/2 -translate-y-1/2 text-xs text-blue-600"
        >
          {show ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      {touched && error && (
        <p role="alert" className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
