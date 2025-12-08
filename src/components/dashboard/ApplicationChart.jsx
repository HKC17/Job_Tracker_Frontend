import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

const ApplicationChart = ({ applications }) => {
  const chartData = useMemo(() => {
    if (!applications || applications.length === 0) return [];

    // Group by month
    const grouped = applications.reduce((acc, app) => {
      const date = new Date(app.application?.applied_date);
      const monthKey = format(date, "MMM yyyy");

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          total: 0,
          applied: 0,
          interview: 0,
          offer: 0,
          rejected: 0,
        };
      }

      acc[monthKey].total++;
      const status = app.application?.status;
      if (status === "applied" || status === "screening") {
        acc[monthKey].applied++;
      } else if (status === "interview") {
        acc[monthKey].interview++;
      } else if (status === "offer" || status === "accepted") {
        acc[monthKey].offer++;
      } else if (status === "rejected") {
        acc[monthKey].rejected++;
      }

      return acc;
    }, {});

    return Object.values(grouped).slice(-6); // Last 6 months
  }, [applications]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-primary-600" />
        Applications Over Time
      </h3>

      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-slate-400">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="applied" fill="#3b82f6" name="Applied" />
            <Bar dataKey="interview" fill="#8b5cf6" name="Interview" />
            <Bar dataKey="offer" fill="#10b981" name="Offer" />
            <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ApplicationChart;
