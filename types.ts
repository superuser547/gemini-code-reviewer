export type Language =
  | 'javascript'
  | 'python'
  | 'java'
  | 'csharp'  // C#
  | 'cpp'    // C++
  | 'typescript'
  | 'go'
  | 'ruby'
  | 'php'
  | 'swift'
  | 'kotlin'
  | 'rust'
  | 'html'
  | 'css'
  | 'sql'
  | 'shell' // Shell/Bash
  | 'other'; // For generic code

export interface LanguageOption {
  value: Language;
  label: string;
}

// New types for review language selection
export type ReviewLanguage = 'en' | 'ru' | 'es' | 'de' | 'fr' | 'zh'; // Added more common languages

export interface ReviewLanguageOption {
  value: ReviewLanguage;
  label: string;
}

export type UILanguage = 'en' | 'ru';

export interface UILanguageOption {
  value: UILanguage;
  label: string;
}

// New types for structured review
export interface ReviewPoint {
  type: 'finding' | 'suggestion' | 'positive' | 'question';
  description: string;
  codeSnippet?: string; // Original code snippet related to the point
  suggestedCode?: string; // Suggested code modification
  lineNumber?: number; // Optional line number
}

export interface ReviewSection {
  title: string; // e.g., "Correctness & Bugs", "Best Practices"
  points: ReviewPoint[];
  summary?: string; // Optional summary for the section
}

export interface StructuredReview {
  overallSummary: string;
  reviewSections: ReviewSection[];
  finalThoughts?: string;
  languageDetected?: string; // Optional: if Gemini can confirm/detect language
}
