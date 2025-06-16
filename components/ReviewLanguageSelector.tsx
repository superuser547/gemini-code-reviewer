import React from 'react';
import { ReviewLanguageOption, ReviewLanguage } from '../types';

interface ReviewLanguageSelectorProps {
  value: ReviewLanguage;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: ReviewLanguageOption[];
  disabled?: boolean;
}

export const ReviewLanguageSelector: React.FC<ReviewLanguageSelectorProps> = ({ value, onChange, languages, disabled }) => {
  return (
    <div>
      <label htmlFor="review-language-select" className="block text-sm font-medium text-gray-300 mb-1">
        Select Review Language
      </label>
      <select
        id="review-language-select"
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
