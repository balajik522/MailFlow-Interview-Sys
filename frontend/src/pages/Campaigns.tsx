import { useState } from "react";
import { getCampaigns } from "../utils/storage";
import EmailEditor from "../components/EmailEditor";
import EmailList from "../components/EmailList";

export default function Campaigns() {
  const [refresh, setRefresh] = useState(false);
  const campaigns = getCampaigns();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Campaigns</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage your email campaigns</p>

      <EmailEditor onSave={() => setRefresh(!refresh)} />
      <EmailList campaigns={campaigns} />
    </div>
  );
}
