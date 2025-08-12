import DashboardCard from "../components/DashboardCard";
import { getCampaigns } from "../utils/storage";

export default function Dashboard() {
  const campaigns = getCampaigns();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your email campaigns</p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <DashboardCard title="Total Campaigns" value={campaigns.length} color="text-blue-600 dark:text-blue-400" />
        <DashboardCard title="Emails Sent" value={campaigns.length * 100} color="text-green-600 dark:text-green-400" />
        <DashboardCard title="Avg. Open Rate" value={campaigns.length ? "48%" : "0%"} color="text-yellow-600 dark:text-yellow-400" />
      </div>
    </div>
  );
}
