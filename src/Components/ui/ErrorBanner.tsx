import React from 'react';

export type ErrorBannerProps = {
  code?: number | string;
  message: string;
  className?: string;
};

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ code, message, className = '' }) => {
  return (
    <div role="alert" className={`border border-red-300 bg-red-50 text-red-800 rounded px-3 py-2 text-sm ${className}`}>
      <span className="font-semibold">{typeof code !== 'undefined' ? `[${code}] ` : ''}</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorBanner;
