import React from 'react';
import { StructuredReview, ReviewSection, ReviewPoint } from '../types';

interface ReviewOutputProps {
  review: StructuredReview | null;
}

const PointTypeBadge: React.FC<{ type: ReviewPoint['type'] }> = ({ type }) => {
  let bgColor = 'bg-gray-600';
  let textColor = 'text-gray-100';

  switch (type) {
    case 'finding':
      bgColor = 'bg-red-500';
      textColor = 'text-white';
      break;
    case 'suggestion':
      bgColor = 'bg-yellow-500';
      textColor = 'text-gray-900';
      break;
    case 'positive':
      bgColor = 'bg-green-500';
      textColor = 'text-white';
      break;
    case 'question':
      bgColor = 'bg-blue-500';
      textColor = 'text-white';
      break;
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bgColor} ${textColor} mr-2 uppercase`}>
      {type}
    </span>
  );
};

const CodeBlock: React.FC<{ code?: string; language?: string; title?: string }> = ({ code, title }) => {
  if (!code) return null;
  return (
    <div className="my-2">
      {title && <p className="text-sm text-gray-400 mb-1">{title}:</p>}
      <pre className="bg-gray-900 p-3 rounded-md text-sm font-mono overflow-x-auto border border-gray-700 text-gray-200">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};


export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review }) => {
  if (!review) {
    return (
      <div className="bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-inner min-h-[100px] flex items-center justify-center">
        <p className="text-gray-400">No review data available.</p>
      </div>
    );
  }

  // Helper to render simple markdown (bold, italic, inline code) within descriptions
  const renderDescription = (text: string) => {
    let formatted = text;
    formatted = formatted.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>'); // Bold
    formatted = formatted.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>'); // Italics
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-gray-700 px-1 py-0.5 rounded text-sky-300 font-mono text-xs">$1</code>'); // Inline code
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };


  return (
    <div className="bg-gray-800 p-4 md:p-6 border border-gray-700 rounded-lg shadow-inner text-gray-200 space-y-6">
      <h2 className="text-3xl font-semibold text-sky-400 mb-4 border-b border-gray-700 pb-3">
        Code Review Feedback
        {review.languageDetected && <span className="text-lg text-gray-400 ml-2">({review.languageDetected})</span>}
      </h2>

      {review.overallSummary && (
        <section aria-labelledby="overall-summary-heading">
          <h3 id="overall-summary-heading" className="text-xl font-semibold text-sky-300 mb-2">Overall Summary</h3>
          <p className="text-gray-300 leading-relaxed">{renderDescription(review.overallSummary)}</p>
        </section>
      )}

      {review.reviewSections && review.reviewSections.length > 0 && (
        review.reviewSections.map((section: ReviewSection, sectionIndex: number) => (
          section.points && section.points.length > 0 && ( // Only render section if it has points
            <section key={sectionIndex} aria-labelledby={`section-title-${sectionIndex}`} className="pt-4 border-t border-gray-700 first:border-t-0 first:pt-0">
              <h3 id={`section-title-${sectionIndex}`} className="text-xl font-semibold text-sky-300 mb-3">{section.title}</h3>
              <ul className="space-y-4">
                {section.points.map((point: ReviewPoint, pointIndex: number) => (
                  <li key={pointIndex} className="bg-gray-750 p-4 rounded-md border border-gray-600 shadow">
                    <div className="flex items-center mb-2">
                      <PointTypeBadge type={point.type} />
                      {point.lineNumber && (
                        <span className="text-xs text-gray-400">Line: {point.lineNumber}</span>
                      )}
                    </div>
                    <div className="text-gray-300 leading-relaxed mb-2">
                      {renderDescription(point.description)}
                    </div>
                    <CodeBlock code={point.codeSnippet} title="Relevant Code" />
                    <CodeBlock code={point.suggestedCode} title="Suggested Code" />
                  </li>
                ))}
              </ul>
              {section.summary && (
                <p className="mt-4 text-sm text-gray-400 italic">{renderDescription(section.summary)}</p>
              )}
            </section>
          )
        ))
      )}

      {review.finalThoughts && (
        <section aria-labelledby="final-thoughts-heading" className="pt-4 border-t border-gray-700">
          <h3 id="final-thoughts-heading" className="text-xl font-semibold text-sky-300 mb-2">Final Thoughts</h3>
          <p className="text-gray-300 leading-relaxed">{renderDescription(review.finalThoughts)}</p>
        </section>
      )}
    </div>
  );
};
