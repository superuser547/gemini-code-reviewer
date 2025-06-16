import React, { useState, useCallback } from 'react';
import { CodeInput } from './components/CodeInput';
import { LanguageSelector } from './components/LanguageSelector';
import { ReviewLanguageSelector } from './components/ReviewLanguageSelector'; // New import
import { ReviewOutput } from './components/ReviewOutput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { reviewCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES, SUPPORTED_REVIEW_LANGUAGES } from './constants'; // Import review languages
import { Language, StructuredReview, ReviewLanguage } from './types'; // Import ReviewLanguage

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0].value);
  const [reviewLanguage, setReviewLanguage] = useState<ReviewLanguage>(SUPPORTED_REVIEW_LANGUAGES[0].value); // New state for review language
  const [review, setReview] = useState<StructuredReview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setError(null);
    setReview(null);
    setIsLoading(true);
    try {
      // Pass reviewLanguage to reviewCode
      const feedback = await reviewCode(code, language, reviewLanguage);
      setReview(feedback);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error("Review Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [code, language, reviewLanguage]); // Add reviewLanguage to dependencies

  const handleClear = useCallback(() => {
    setCode('');
    setReview(null);
    setError(null);
    // Optionally reset language selectors to defaults
    // setLanguage(SUPPORTED_LANGUAGES[0].value);
    // setReviewLanguage(SUPPORTED_REVIEW_LANGUAGES[0].value);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 md:p-8 selection:bg-sky-700 selection:text-white">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-400">
            Gemini Code Reviewer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Get AI-powered feedback on your code.
          </p>
        </header>

        <main className="bg-gray-800 shadow-2xl rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-end">
            <LanguageSelector
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              languages={SUPPORTED_LANGUAGES}
              disabled={isLoading}
            />
            <ReviewLanguageSelector // Add the new selector
              value={reviewLanguage}
              onChange={(e) => setReviewLanguage(e.target.value as ReviewLanguage)}
              languages={SUPPORTED_REVIEW_LANGUAGES}
              disabled={isLoading}
            />
            <div className="flex items-end space-x-3 md:col-start-3"> {/* Buttons aligned to the end of this grid cell */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto flex-grow bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Submit code for review"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner small />
                    <span className="ml-2">Reviewing...</span>
                  </>
                ) : (
                  'Review Code'
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="w-full sm:w-auto flex-grow bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Clear code input and review feedback"
              >
                Clear
              </button>
            </div>
          </div>

          <CodeInput
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${SUPPORTED_LANGUAGES.find(l => l.value === language)?.label || 'code'} here...`}
            aria-label="Code input area"
          />

          {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

          {isLoading && !review && (
            <div className="mt-6 flex flex-col items-center justify-center text-gray-400 p-8 border-2 border-dashed border-gray-700 rounded-lg" aria-live="polite">
              <LoadingSpinner />
              <p className="mt-4 text-lg">Analyzing your code with Gemini...</p>
              <p className="text-sm text-gray-500">This might take a few moments.</p>
            </div>
          )}
          
          {review && !isLoading && (
            <div className="mt-6">
                <ReviewOutput review={review} />
            </div>
          )}
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Google Gemini. Ensure your GEMINI_API_KEY environment variable is configured.</p>
            <p>&copy; {new Date().getFullYear()} AI Code Reviewer</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
