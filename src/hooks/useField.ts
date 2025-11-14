import { useCallback, useMemo, useState } from 'react';

export type Validator = (value: string) => string | null;

export function useField(initial = '', validators: Validator[] = []) {
  const [value, setValue] = useState<string>(initial);
  const [touched, setTouched] = useState<boolean>(false);

  const error = useMemo(() => {
    for (const v of validators) {
      const err = v(value);
      if (err) return err;
    }
    return null;
  }, [value, validators]);

  const valid = !error;

  const onChange = useCallback((v: string) => {
    setValue(v);
  }, []);

  const onBlur = useCallback(() => setTouched(true), []);

  return { value, setValue, touched, setTouched, error, valid, onChange, onBlur };
}

// Common validators
export const required = (msg = 'Campo obligatorio.') => (v: string) => (v.trim().length ? null : msg);
export const minLength = (n: number, msg?: string) => (v: string) => (v.length >= n ? null : msg || `Mínimo ${n} caracteres.`);
export const emailFormat = (msg = 'Formato de email inválido.') => (v: string) => {
  if (v.trim().length === 0) return null; // allow empty, combine with required if needed
  const re = /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\])$/;
  return re.test(v.trim()) ? null : msg;
};
export const nameFormat = (msg = 'Nombre inválido.') => (v: string) => {
  if (v.trim().length === 0) return null;
  const re = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,}$/;
  return re.test(v.trim()) ? null : msg;
};
