interface DashboardCardProps {
  title: string;
  value: string | number;
  color: string;
}

export default function DashboardCard({ title, value, color }: DashboardCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="font-semibold text-gray-600 dark:text-gray-300">{title}</h2>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}
