import React, { useState } from 'react';

export type NameInputProps = {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (value: string, valid: boolean) => void;
  onBlur?: (value: string, valid: boolean) => void;
  className?: string;
};

const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,}$/;

export const NameInput: React.FC<NameInputProps> = ({
  label = 'Nombre(s)',
  name = 'name',
  value = '',
  placeholder = 'Tu nombre',
  required = true,
  disabled = false,
  maxLength = 100,
  onChange,
  onBlur,
  className = '',
}) => {
  const [inner, setInner] = useState<string>(value);
  const [touched, setTouched] = useState<boolean>(false);

  const isEmpty = (v: string) => v.trim().length === 0;

  const computeError = (v: string): string | null => {
    const trimmed = v.trim();
    if (required && isEmpty(trimmed)) return 'El nombre es obligatorio.';
    if (!isEmpty(trimmed) && !nameRegex.test(trimmed)) return 'Ingresa un nombre válido (solo letras y mínimo 2 caracteres).';
    if (trimmed.length > maxLength) return `El nombre debe tener máximo ${maxLength} caracteres.`;
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
        type="text"
        value={inner}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
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

export default NameInput;
