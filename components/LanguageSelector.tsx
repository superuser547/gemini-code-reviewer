import React from 'react';
import { LanguageOption, Language } from '../types';

interface LanguageSelectorProps {
  value: Language;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: LanguageOption[];
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange, languages, disabled }) => {
  return (
    <div>
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-1">
        Select Language
      </label>
      <select
        id="language-select"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-gray-700 border border-gray-600 text-gray-100 py-3 px-4 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
