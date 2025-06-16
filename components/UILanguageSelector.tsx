import React from 'react';
import { UILanguageOption, UILanguage } from '../types';

interface UILanguageSelectorProps {
  value: UILanguage;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: UILanguageOption[];
  disabled?: boolean;
  label?: string;
}

export const UILanguageSelector: React.FC<UILanguageSelectorProps> = ({ value, onChange, languages, disabled, label }) => {
  return (
    <div>
      <label htmlFor="ui-language-select" className="block text-sm font-medium text-gray-300 mb-1">
        {label || 'Interface Language'}
      </label>
      <select
        id="ui-language-select"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value} className="bg-gray-700 text-gray-100">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
