import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Language, StructuredReview, ReviewLanguage } from '../types.js';
import { SUPPORTED_LANGUAGES, SUPPORTED_REVIEW_LANGUAGES } from '../constants.js';

const getLanguageLabel = (languageValue: Language): string => {
  const langObj = SUPPORTED_LANGUAGES.find(lang => lang.value === languageValue);
  return langObj ? langObj.label : 'code';
};

const getReviewLanguageLabel = (reviewLanguageValue: ReviewLanguage): string => {
  const langObj = SUPPORTED_REVIEW_LANGUAGES.find(lang => lang.value === reviewLanguageValue);
  return langObj ? langObj.label : 'English'; // Default to English label if not found
};


export const reviewCode = async (
  code: string,
  language: Language,
  reviewLanguage: ReviewLanguage // New parameter
): Promise<StructuredReview> => {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY environment variable is not set.");
    throw new Error("Gemini API Key is missing. Please ensure the GEMINI_API_KEY environment variable is correctly set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const programmingLanguageLabel = getLanguageLabel(language);
  const feedbackLanguageLabel = getReviewLanguageLabel(reviewLanguage);

  const prompt = `
You are an expert, meticulous, and helpful AI code reviewer.
Your task is to review the following ${programmingLanguageLabel} code and provide comprehensive feedback.

**IMPORTANT: All parts of your review (summaries, titles, descriptions, points, final thoughts, etc.) MUST be in ${feedbackLanguageLabel}.**

Please analyze the code for the following aspects and return your response STRICTLY in the specified JSON format.
Do NOT include any explanatory text or markdown before or after the JSON object.

JSON Structure to follow:
{
  "overallSummary": "A brief overall summary of the code quality (2-3 sentences). This summary MUST be in ${feedbackLanguageLabel}.",
  "reviewSections": [
    {
      "title": "Correctness & Bugs (in ${feedbackLanguageLabel})",
      "points": [
        {
          "type": "finding" | "suggestion" | "positive" | "question",
          "description": "Detailed description of the point. Be specific. This description MUST be in ${feedbackLanguageLabel}.",
          "codeSnippet": "Optional: The relevant snippet of the original code being discussed.",
          "suggestedCode": "Optional: A snippet of suggested code if applicable.",
          "lineNumber": "Optional: A relevant line number from the original code."
        }
      ],
      "summary": "Optional: A brief summary for this specific section. This summary MUST be in ${feedbackLanguageLabel}."
    },
    {
      "title": "Best Practices & Idioms (in ${feedbackLanguageLabel})",
      "points": [ /* ... similar structure, all text in ${feedbackLanguageLabel} ... */ ],
      "summary": "Optional: ... (in ${feedbackLanguageLabel})"
    },
    {
      "title": "Clarity & Readability (in ${feedbackLanguageLabel})",
      "points": [ /* ... similar structure, all text in ${feedbackLanguageLabel} ... */ ],
      "summary": "Optional: ... (in ${feedbackLanguageLabel})"
    },
    {
      "title": "Efficiency & Performance (in ${feedbackLanguageLabel})",
      "points": [ /* ... similar structure, all text in ${feedbackLanguageLabel} ... */ ],
      "summary": "Optional: ... (in ${feedbackLanguageLabel})"
    },
    {
      "title": "Security Vulnerabilities (in ${feedbackLanguageLabel})",
      "points": [ /* ... similar structure, all text in ${feedbackLanguageLabel} ... */ ],
      "summary": "Optional: ... (in ${feedbackLanguageLabel})"
    },
    {
      "title": "Maintainability & Scalability (in ${feedbackLanguageLabel})",
      "points": [ /* ... similar structure, all text in ${feedbackLanguageLabel} ... */ ],
      "summary": "Optional: ... (in ${feedbackLanguageLabel})"
    },
    {
      "title": "Style & Formatting (in ${feedbackLanguageLabel})",
      "points": [ /* ... similar structure, all text in ${feedbackLanguageLabel} ... */ ],
      "summary": "Optional: ... (in ${feedbackLanguageLabel})"
    },
    {
      "title": "Suggestions for Improvement (in ${feedbackLanguageLabel})",
      "points": [ /* ... similar structure, all text in ${feedbackLanguageLabel} ... */ ],
      "summary": "Optional: ... (in ${feedbackLanguageLabel})"
    }
    // You can add or remove sections based on relevance to the code.
    // Ensure all textual content within the JSON is in ${feedbackLanguageLabel}.
  ],
  "finalThoughts": "Optional: Any concluding remarks or overall advice. This MUST be in ${feedbackLanguageLabel}.",
  "languageDetected": "${programmingLanguageLabel}" // This should remain the programming language
}

Ensure all text within description, codeSnippet, suggestedCode, and summary fields is properly escaped for JSON.
Provide constructive and actionable advice in ${feedbackLanguageLabel}.

Code to review:
\`\`\`${language}
${code}
\`\`\`

Your JSON Review (strictly in the format above, with all text in ${feedbackLanguageLabel}):
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    let jsonStr = response.text;
    if (!jsonStr) {
        throw new Error(`Received an empty review from Gemini (review language: ${feedbackLanguageLabel}). The model might be unable to process this request or the API key might be invalid.`);
    }

    // Remove markdown fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    } else {
      jsonStr = jsonStr.trim();
    }
    
    try {
      const parsedData: StructuredReview = JSON.parse(jsonStr);
      // Basic validation of the parsed structure
      if (!parsedData.reviewSections || !Array.isArray(parsedData.reviewSections)) {
        console.warn("Parsed JSON does not match expected StructuredReview format:", parsedData);
        throw new Error(`Gemini returned an unexpected JSON structure for the review (review language: ${feedbackLanguageLabel}).`);
      }
      // Optionally, verify that languageDetected is still the programming language if needed.
      // It's more for informational purposes in the output.
      return parsedData;
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini:", e);
      console.error("Raw response text from Gemini (review language: ${feedbackLanguageLabel}):", response.text);
      throw new Error(`Failed to parse the review feedback from Gemini (review language: ${feedbackLanguageLabel}). The response was not valid JSON.`);
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Invalid Gemini API Key. Please check your GEMINI_API_KEY environment variable.");
    }
    if (error instanceof Error) {
        throw new Error(`Failed to get review from Gemini (review language: ${feedbackLanguageLabel}): ${error.message}`);
    }
    throw new Error(`An unknown error occurred while communicating with the Gemini API (review language: ${feedbackLanguageLabel}).`);
  }
};