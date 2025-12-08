import React from "react";
import { useNavigate } from "react-router-dom";
import { formatRelativeDate } from "../../utils/helpers";
import StatusBadge from "../applications/StatusBadge";
import { Clock, ArrowRight } from "lucide-react";

const RecentActivity = ({ applications }) => {
  const navigate = useNavigate();

  if (!applications || applications.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary-600" />
          Recent Activity
        </h3>
        <p className="text-slate-400 text-center py-8">
          No recent activity. Start by adding your first application!
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary-600" />
          Recent Activity
        </h3>
        <button
          onClick={() => navigate("/applications")}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => navigate(`/applications/${app._id}`)}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {app.job?.title}
                  </h4>
                  <p className="text-sm text-slate-600">{app.company?.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <StatusBadge status={app.application?.status} />
              <span className="text-sm text-slate-500">
                {formatRelativeDate(app.application?.applied_date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
