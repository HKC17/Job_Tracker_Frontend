import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDate, formatCurrency } from "../../utils/helpers";
import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const ApplicationCard = ({ application, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);

  const { _id, company, job, application: appDetails } = application;

  return (
    <div className="card hover:shadow-lg transition-shadow relative group">
      {/* Menu Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-slate-600" />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
            <button
              onClick={() => {
                navigate(`/applications/${_id}`);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <button
              onClick={() => {
                onEdit(application);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => {
                onDelete(_id);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Company Logo/Icon */}
      <div className="mb-4">
        {company?.logo_url ? (
          <img
            src={company.logo_url}
            alt={company.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-600" />
          </div>
        )}
      </div>

      {/* Job Title & Company */}
      <div className="mb-3">
        <h3 className="font-semibold text-lg text-slate-900 mb-1">
          {job?.title}
        </h3>
        <p className="text-slate-600 flex items-center text-sm">
          <Building2 className="w-4 h-4 mr-1" />
          {company?.name}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <StatusBadge status={appDetails?.status} />
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-slate-600">
        {company?.location && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{company.location}</span>
          </div>
        )}

        {job?.employment_type && (
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            <span className="capitalize">{job.employment_type}</span>
          </div>
        )}

        {job?.salary_min && job?.salary_max && (
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>
              {formatCurrency(job.salary_min, job.currency)} -{" "}
              {formatCurrency(job.salary_max, job.currency)}
            </span>
          </div>
        )}

        {appDetails?.applied_date && (
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Applied {formatDate(appDetails.applied_date)}</span>
          </div>
        )}
      </div>

      {/* Source */}
      {appDetails?.source && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            via {appDetails.source}
          </span>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
