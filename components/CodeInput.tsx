
import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Enter your code here..."}
      className="w-full h-80 p-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-150 resize-y font-mono text-sm leading-relaxed shadow-inner"
      spellCheck="false"
      autoCapitalize="off"
      autoCorrect="off"
    />
  );
};
