import React from "react";
import { useNavigate } from "react-router-dom";
import { useAllApplications } from "../hooks/useApplications";
import { useDashboardStats } from "../hooks/useAnalytics";
import StatsCard from "../components/dashboard/StatsCard";
import ApplicationChart from "../components/dashboard/ApplicationChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import Loader from "../components/common/Loader";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: applications, isLoading: appsLoading } = useAllApplications(); // Changed to useAllApplications
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  if (appsLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  // applications is now an array, not a paginated object
  const applicationsData = applications || [];

  // Calculate stats from applications
  const totalApplications = applicationsData.length;
  const activeApplications = applicationsData.filter(
    (app) =>
      !["rejected", "accepted", "withdrawn"].includes(app.application?.status)
  ).length;
  const offersReceived = applicationsData.filter(
    (app) => app.application?.status === "offer"
  ).length;
  const rejections = applicationsData.filter(
    (app) => app.application?.status === "rejected"
  ).length;

  const statsCards = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: Briefcase,
      color: "blue",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active",
      value: activeApplications,
      icon: Clock,
      color: "yellow",
      change: "+8%",
      trend: "up",
    },
    {
      title: "Offers",
      value: offersReceived,
      icon: CheckCircle,
      color: "green",
      change: "+3%",
      trend: "up",
    },
    {
      title: "Rejected",
      value: rejections,
      icon: XCircle,
      color: "red",
      change: "-5%",
      trend: "down",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Track your job application progress
          </p>
        </div>
        <button
          onClick={() => navigate("/applications")}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Application</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationChart applications={applicationsData} />

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Success Rate
          </h3>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">
                {totalApplications > 0
                  ? Math.round((offersReceived / totalApplications) * 100)
                  : 0}
                %
              </div>
              <p className="text-slate-600">
                {offersReceived} offers from {totalApplications} applications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity applications={applicationsData.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;
