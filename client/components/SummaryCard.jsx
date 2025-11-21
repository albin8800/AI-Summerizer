"use client";

export default function SummaryCard({ original, summary }) {
  return (
    <div className="w-full bg-white rounded-xl shadow p-5 border border-gray-200">
      
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">Original Text</h3>
        <div className="text-gray-900 text-sm whitespace-pre-wrap">
          {original}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-1">Summary</h3>
        <div className="text-gray-900 text-sm whitespace-pre-wrap">
          {summary}
        </div>
      </div>

    </div>
  );
}
