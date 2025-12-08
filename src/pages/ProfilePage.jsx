import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  Edit2,
  Save,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.profile?.phone || "",
    location: user?.profile?.location || "",
    linkedin_url: user?.profile?.linkedin_url || "",
    github_url: user?.profile?.github_url || "",
    portfolio_url: user?.profile?.portfolio_url || "",
    current_role: user?.profile?.current_role || "",
    years_of_experience: user?.profile?.years_of_experience || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await updateUser({
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile: {
        phone: formData.phone,
        location: formData.location,
        linkedin_url: formData.linkedin_url,
        github_url: formData.github_url,
        portfolio_url: formData.portfolio_url,
        current_role: formData.current_role,
        years_of_experience: formData.years_of_experience
          ? Number(formData.years_of_experience)
          : null,
      },
    });

    if (result.success) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.profile?.phone || "",
      location: user?.profile?.location || "",
      linkedin_url: user?.profile?.linkedin_url || "",
      github_url: user?.profile?.github_url || "",
      portfolio_url: user?.profile?.portfolio_url || "",
      current_role: user?.profile?.current_role || "",
      years_of_experience: user?.profile?.years_of_experience || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-600 mt-1">
            Manage your personal information
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Edit2 className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? "Saving..." : "Save"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="card">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6 pb-6 border-b border-slate-200">
          <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-slate-600">
              {user?.profile?.current_role || "Job Seeker"}
            </p>
            <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : (
                <p className="text-slate-900">{user?.first_name || "-"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : (
                <p className="text-slate-900">{user?.last_name || "-"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <p className="text-slate-900 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-slate-400" />
                {user?.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="text-slate-900 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-slate-400" />
                  {user?.profile?.phone || "-"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="San Francisco, CA"
                />
              ) : (
                <p className="text-slate-900 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  {user?.profile?.location || "-"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Years of Experience
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="years_of_experience"
                  value={formData.years_of_experience}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="5"
                />
              ) : (
                <p className="text-slate-900 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                  {user?.profile?.years_of_experience
                    ? `${user.profile.years_of_experience} years`
                    : "-"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Links */}
        <div className="pt-6 mt-6 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Professional Links
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                LinkedIn
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
                <p className="text-slate-900 flex items-center">
                  <Linkedin className="w-4 h-4 mr-2 text-slate-400" />
                  {user?.profile?.linkedin_url ? (
                    <a
                      href={user.profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {user.profile.linkedin_url}
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                GitHub
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://github.com/username"
                />
              ) : (
                <p className="text-slate-900 flex items-center">
                  <Github className="w-4 h-4 mr-2 text-slate-400" />
                  {user?.profile?.github_url ? (
                    <a
                      href={user.profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {user.profile.github_url}
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Portfolio
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="portfolio_url"
                  value={formData.portfolio_url}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://yourportfolio.com"
                />
              ) : (
                <p className="text-slate-900 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-slate-400" />
                  {user?.profile?.portfolio_url ? (
                    <a
                      href={user.profile.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {user.profile.portfolio_url}
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
