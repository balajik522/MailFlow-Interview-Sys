import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggler";

export default function Navbar() {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Email Marketing
      </h1>
      <nav className="space-x-2 flex items-center">
        <Link to="/" className={linkClasses("/")}>Dashboard</Link>
        <Link to="/campaigns" className={linkClasses("/campaigns")}>Campaigns</Link>
        <Link to="/login" className={linkClasses("/login")}>Login</Link>
        <ThemeToggle />
      </nav>
    </div>
  );
}
