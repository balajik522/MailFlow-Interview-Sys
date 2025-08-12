interface Campaign {
  subject: string;
  content: string;
  date: string;
}

interface EmailListProps {
  campaigns: Campaign[];
}

export default function EmailList({ campaigns }: EmailListProps) {
  if (campaigns.length === 0)
    return <p className="text-gray-500 mt-4 text-center">No campaigns yet.</p>;

  return (
    <div className="mt-8 grid gap-4 max-w-3xl mx-auto">
      {campaigns.map((c: Campaign, i: number) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{c.subject}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{c.content}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Created: {c.date}</p>
        </div>
      ))}
    </div>
  );
}
