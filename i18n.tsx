import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UILanguage } from './types';

interface Translations {
  [key: string]: string | ((...args: any[]) => string);
}

const dictionaries: Record<UILanguage, Translations> = {
  en: {
    appTitle: 'Gemini Code Reviewer',
    appSubtitle: 'Get AI-powered feedback on your code.',
    selectLanguage: 'Select Language',
    selectReviewLanguage: 'Select Review Language',
    selectUILanguage: 'Interface Language',
    reviewButton: 'Review Code',
    clearButton: 'Clear',
    reviewing: 'Reviewing...',
    enterCode: 'Please enter some code to review.',
    analyzing: 'Analyzing your code with Gemini...',
    mightTake: 'This might take a few moments.',
    codePlaceholder: (lang: string) => `Paste your ${lang} here...`,
    noReview: 'No review data available.',
    unknownError: 'An unknown error occurred.',
    feedbackTitle: 'Code Review Feedback',
    overallSummary: 'Overall Summary',
    finalThoughts: 'Final Thoughts',
    poweredBy: 'Powered by Google Gemini. Ensure your GEMINI_API_KEY environment variable is configured.',
    footer: (year: number) => `© ${year} AI Code Reviewer`,
    error: 'Error',
    close: 'Close',
  },
  ru: {
    appTitle: 'Рецензент кода Gemini',
    appSubtitle: 'Получите анализ вашего кода при помощи ИИ.',
    selectLanguage: 'Выберите язык кода',
    selectReviewLanguage: 'Выберите язык рецензии',
    selectUILanguage: 'Язык интерфейса',
    reviewButton: 'Проверить код',
    clearButton: 'Очистить',
    reviewing: 'Проверяем...',
    enterCode: 'Пожалуйста, вставьте код для рецензии.',
    analyzing: 'Анализируем ваш код с помощью Gemini...',
    mightTake: 'Это может занять некоторое время.',
    codePlaceholder: (lang: string) => `Вставьте ваш ${lang} сюда...`,
    noReview: 'Нет данных для рецензии.',
    unknownError: 'Произошла неизвестная ошибка.',
    feedbackTitle: 'Результаты проверки кода',
    overallSummary: 'Общий итог',
    finalThoughts: 'Заключение',
    poweredBy: 'Работает на Google Gemini. Убедитесь, что переменная окружения GEMINI_API_KEY настроена.',
    footer: (year: number) => `© ${year} Рецензент кода AI`,
    error: 'Ошибка',
    close: 'Закрыть',
  }
};

interface I18nContextProps {
  language: UILanguage;
  setLanguage: (lang: UILanguage) => void;
  t: (key: keyof Translations, ...args: any[]) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<UILanguage>('en');

  const t = (key: keyof Translations, ...args: any[]) => {
    const entry = dictionaries[language][key];
    if (typeof entry === 'function') {
      return (entry as (...args: any[]) => string)(...args);
    }
    return entry as string;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
