import { format, formatDistance } from "date-fns";

export const formatDate = (date, formatStr = "MMM dd, yyyy") => {
  if (!date) return "";
  return format(new Date(date), formatStr);
};

export const formatRelativeDate = (date) => {
  if (!date) return "";
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const getStatusLabel = (status) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

export const formatCurrency = (amount, currency = "USD") => {
  if (!amount) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const calculateSuccessRate = (applications) => {
  if (!applications || applications.length === 0) return 0;
  const successful = applications.filter(
    (app) =>
      app.application?.status === "offer" ||
      app.application?.status === "accepted"
  ).length;
  return Math.round((successful / applications.length) * 100);
};

export const groupByMonth = (applications) => {
  const grouped = {};
  applications.forEach((app) => {
    const date = new Date(app.application?.applied_date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(app);
  });
  return grouped;
};
