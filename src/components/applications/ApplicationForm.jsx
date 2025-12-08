import React, { useState, useEffect } from "react";
import {
  useCreateApplication,
  useUpdateApplication,
} from "../../hooks/useApplications";
import {
  X,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Link as LinkIcon,
} from "lucide-react";
import {
  APPLICATION_STATUS,
  EMPLOYMENT_TYPES,
  WORK_MODES,
  EXPERIENCE_LEVELS,
  APPLICATION_SOURCES,
} from "../../utils/constants";

const ApplicationForm = ({ application, onClose }) => {
  const isEditing = !!application;
  const createApplication = useCreateApplication();
  const updateApplication = useUpdateApplication();

  const [formData, setFormData] = useState({
    // Company
    companyName: "",
    companyWebsite: "",
    companyLocation: "",
    companyIndustry: "",
    companySize: "",

    // Job
    jobTitle: "",
    jobDescription: "",
    jobUrl: "",
    employmentType: "full-time",
    workMode: "remote",
    experienceLevel: "mid",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",

    // Application
    status: "applied",
    appliedDate: new Date().toISOString().split("T")[0],
    source: "LinkedIn",
    resumeVersion: "",
    coverLetter: "",
    referralName: "",

    // Requirements
    skillsRequired: "",
    skillsPreferred: "",
    yearsExperience: "",
    education: "",

    // Notes
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (application) {
      setFormData({
        companyName: application.company?.name || "",
        companyWebsite: application.company?.website || "",
        companyLocation: application.company?.location || "",
        companyIndustry: application.company?.industry || "",
        companySize: application.company?.size || "",

        jobTitle: application.job?.title || "",
        jobDescription: application.job?.description || "",
        jobUrl: application.job?.job_url || "",
        employmentType: application.job?.employment_type || "full-time",
        workMode: application.job?.work_mode || "remote",
        experienceLevel: application.job?.experience_level || "mid",
        salaryMin: application.job?.salary_min || "",
        salaryMax: application.job?.salary_max || "",
        currency: application.job?.currency || "USD",

        status: application.application?.status || "applied",
        appliedDate: application.application?.applied_date?.split("T")[0] || "",
        source: application.application?.source || "LinkedIn",
        resumeVersion: application.application?.resume_version || "",
        coverLetter: application.application?.cover_letter || "",
        referralName: application.application?.referral_name || "",

        skillsRequired:
          application.requirements?.skills_required?.join(", ") || "",
        skillsPreferred:
          application.requirements?.skills_preferred?.join(", ") || "",
        yearsExperience: application.requirements?.years_experience || "",
        education: application.requirements?.education || "",

        notes: application.notes || "",
      });
    }
  }, [application]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!formData.appliedDate) {
      newErrors.appliedDate = "Applied date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Transform form data to API format
    const payload = {
      company: {
        name: formData.companyName,
        website: formData.companyWebsite,
        location: formData.companyLocation,
        industry: formData.companyIndustry,
        size: formData.companySize,
      },
      job: {
        title: formData.jobTitle,
        description: formData.jobDescription,
        job_url: formData.jobUrl,
        employment_type: formData.employmentType,
        work_mode: formData.workMode,
        experience_level: formData.experienceLevel,
        salary_min: formData.salaryMin ? Number(formData.salaryMin) : null,
        salary_max: formData.salaryMax ? Number(formData.salaryMax) : null,
        currency: formData.currency,
      },
      application: {
        status: formData.status,
        applied_date: formData.appliedDate,
        source: formData.source,
        resume_version: formData.resumeVersion,
        cover_letter: formData.coverLetter,
        referral_name: formData.referralName,
      },
      requirements: {
        skills_required: formData.skillsRequired
          ? formData.skillsRequired.split(",").map((s) => s.trim())
          : [],
        skills_preferred: formData.skillsPreferred
          ? formData.skillsPreferred.split(",").map((s) => s.trim())
          : [],
        years_experience: formData.yearsExperience
          ? Number(formData.yearsExperience)
          : null,
        education: formData.education,
      },
      notes: formData.notes,
    };

    try {
      if (isEditing) {
        await updateApplication.mutateAsync({
          id: application._id,
          data: payload,
        });
      } else {
        await createApplication.mutateAsync(payload);
      }
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Application" : "New Application"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-primary-600" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`input-field ${
                    errors.companyName ? "border-red-500" : ""
                  }`}
                  placeholder="Google, Microsoft, etc."
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  name="companyIndustry"
                  value={formData.companyIndustry}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Technology, Finance, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
              Job Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className={`input-field ${
                    errors.jobTitle ? "border-red-500" : ""
                  }`}
                  placeholder="Software Engineer, Product Manager, etc."
                />
                {errors.jobTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  rows="4"
                  className="input-field"
                  placeholder="Job description..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job URL
                </label>
                <input
                  type="url"
                  name="jobUrl"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://company.com/careers/job-id"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="input-field"
                >
                  {EMPLOYMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Work Mode
                </label>
                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  className="input-field"
                >
                  {WORK_MODES.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="input-field"
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Salary Min
                </label>
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Salary Max
                </label>
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="100000"
                />
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Application Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input-field"
                >
                  {Object.entries(APPLICATION_STATUS).map(([key, value]) => (
                    <option key={value} value={value}>
                      {key.charAt(0) + key.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Applied Date *
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className={`input-field ${
                    errors.appliedDate ? "border-red-500" : ""
                  }`}
                />
                {errors.appliedDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.appliedDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="input-field"
                >
                  {APPLICATION_SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Resume Version
                </label>
                <input
                  type="text"
                  name="resumeVersion"
                  value={formData.resumeVersion}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="v1.0, Software Engineer Resume, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows="3"
                  className="input-field"
                  placeholder="Cover letter text or notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Referral Name
                </label>
                <input
                  type="text"
                  name="referralName"
                  value={formData.referralName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Required Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skillsRequired"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="React, Node.js, Python"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skillsPreferred"
                  value={formData.skillsPreferred}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="AWS, Docker, Kubernetes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Bachelor's in Computer Science"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="input-field"
              placeholder="Any additional notes about this application..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Application"
                : "Create Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
