import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useApplications,
  useDeleteApplication,
} from "../hooks/useApplications";
import { useDebounce } from "../hooks/useDebounce";
import ApplicationCard from "../components/applications/ApplicationCard";
import ApplicationForm from "../components/applications/ApplicationForm";
import Loader from "../components/common/Loader";
import { Plus, Search, Filter, SlidersHorizontal } from "lucide-react";
import { APPLICATION_STATUS } from "../utils/constants";

const Applications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    ...(statusFilter !== "all" && { status: statusFilter }),
    ...(debouncedSearch && { search: debouncedSearch }),
  };

  const { data: applications, isLoading } = useApplications(filters);
  const deleteApplication = useDeleteApplication();

  const handleEdit = (app) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      await deleteApplication.mutateAsync(id);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingApp(null);
  };

  const applicationsData = applications?.results || applications || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Applications</h1>
          <p className="text-slate-600 mt-1">Manage your job applications</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Application</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by company or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-full md:w-48"
          >
            <option value="all">All Status</option>
            {Object.entries(APPLICATION_STATUS).map(([key, value]) => (
              <option key={value} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Employment Type
                </label>
                <select className="input-field">
                  <option>All Types</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Work Mode
                </label>
                <select className="input-field">
                  <option>All Modes</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date Range
                </label>
                <select className="input-field">
                  <option>All Time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-600">
        Showing {applicationsData.length} application(s)
      </div>

      {/* Applications Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      ) : applicationsData.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-slate-400 mb-4">
            <Briefcase className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg font-medium">No applications found</p>
            <p className="text-sm mt-2">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Start by adding your first application"}
            </p>
          </div>
          {!searchTerm && statusFilter === "all" && (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Application
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicationsData.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onEdit={() => handleEdit(app)}
              onDelete={() => handleDelete(app._id)}
            />
          ))}
        </div>
      )}

      {/* Application Form Modal */}
      {showForm && (
        <ApplicationForm application={editingApp} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default Applications;
