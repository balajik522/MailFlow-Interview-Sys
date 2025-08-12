import { useState } from "react";
import { saveCampaign } from "../utils/storage";

interface EmailEditorProps {
  onSave: () => void;
}

export default function EmailEditor({ onSave }: EmailEditorProps) {
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !content) {
      alert("Please fill out all fields.");
      return;
    }

    saveCampaign({ subject, content, date: new Date().toLocaleDateString() });
    setSubject("");
    setContent("");
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Create Campaign
      </h2>

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />

      <textarea
        placeholder="Email Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Campaign
      </button>
    </form>
  );
}
