import React, { useState } from "react";
import { useAllApplications } from "../hooks/useApplications";
import Loader from "../components/common/Loader";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";
import { format } from "date-fns";

const AnalyticsPage = () => {
  const { data: applications, isLoading } = useAllApplications(); // Changed to useAllApplications
  const [timeRange, setTimeRange] = useState("all");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  const applicationsData = applications || [];

  // Status Distribution
  const statusData = applicationsData.reduce((acc, app) => {
    const status = app.application?.status || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = Object.entries(statusData).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
  }));

  const COLORS = [
    "#3b82f6",
    "#eab308",
    "#8b5cf6",
    "#10b981",
    "#ef4444",
    "#6366f1",
    "#64748b",
  ];

  // Applications by Month
  const monthlyData = applicationsData.reduce((acc, app) => {
    const date = new Date(app.application?.applied_date);
    const monthKey = format(date, "MMM yyyy");
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {});

  const monthlyChartData = Object.entries(monthlyData)
    .map(([month, count]) => ({ month, count }))
    .slice(-6);

  // Skills Analysis
  const skillsData = applicationsData.reduce((acc, app) => {
    const skills = app.requirements?.skills_required || [];
    skills.forEach((skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const topSkills = Object.entries(skillsData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  // Response Time Analysis
  const avgResponseTime =
    applicationsData.reduce((acc, app) => {
      const timeline = app.timeline || [];
      if (timeline.length > 1) {
        const firstEvent = new Date(timeline[0].date);
        const secondEvent = new Date(timeline[1].date);
        const days = Math.floor(
          (secondEvent - firstEvent) / (1000 * 60 * 60 * 24)
        );
        return acc + days;
      }
      return acc;
    }, 0) / applicationsData.filter((app) => app.timeline?.length > 1).length ||
    0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">
            Insights from your job search ({applicationsData.length}{" "}
            applications)
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-48"
        >
          <option value="all">All Time</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="180">Last 6 Months</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Success Rate
            </span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {applicationsData.length > 0
              ? Math.round(
                  ((statusData.offer || 0) / applicationsData.length) * 100
                )
              : 0}
            %
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {statusData.offer || 0} offers received
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Avg Response Time
            </span>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {Math.round(avgResponseTime)}
          </p>
          <p className="text-sm text-slate-500 mt-1">days</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Interview Rate
            </span>
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {applicationsData.length > 0
              ? Math.round(
                  ((statusData.interview || 0) / applicationsData.length) * 100
                )
              : 0}
            %
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {statusData.interview || 0} interviews
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Rejection Rate
            </span>
            <Award className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {applicationsData.length > 0
              ? Math.round(
                  ((statusData.rejected || 0) / applicationsData.length) * 100
                )
              : 0}
            %
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {statusData.rejected || 0} rejections
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Application Status Distribution
          </h3>
          {statusChartData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Applications Over Time */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Applications Per Month
          </h3>
          {monthlyChartData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Skills */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Most In-Demand Skills
          </h3>
          {topSkills.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              No skills data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSkills} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis
                  dataKey="skill"
                  type="category"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  width={100}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Key Insights
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-sm text-slate-700">
              You've applied to <strong>{applicationsData.length}</strong>{" "}
              positions. Keep up the momentum!
            </p>
          </div>

          {statusData.interview > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <p className="text-sm text-slate-700">
                Your interview conversion rate is{" "}
                <strong>
                  {Math.round(
                    ((statusData.interview || 0) / applicationsData.length) *
                      100
                  )}
                  %
                </strong>
                .
                {(statusData.interview || 0) / applicationsData.length > 0.2
                  ? " Great job!"
                  : " Consider refining your applications."}
              </p>
            </div>
          )}

          {topSkills.length > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <p className="text-sm text-slate-700">
                The most requested skill is{" "}
                <strong>{topSkills[0].skill}</strong>, appearing in{" "}
                {topSkills[0].count} job postings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
