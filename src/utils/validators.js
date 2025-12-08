export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return "Invalid email format";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  return null;
};

export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};

export const validateUrl = (url, fieldName = "URL") => {
  if (!url) return null; // Optional field
  try {
    new URL(url);
    return null;
  } catch {
    return `${fieldName} must be a valid URL`;
  }
};

export const validatePhone = (phone) => {
  if (!phone) return null; // Optional field
  const re = /^[\d\s\-\+\(\)]+$/;
  if (!re.test(phone)) {
    return "Invalid phone number format";
  }
  return null;
};

export const validateNumber = (value, fieldName, min = null, max = null) => {
  if (!value && value !== 0) return null; // Optional field
  const num = Number(value);
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  if (min !== null && num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  if (max !== null && num > max) {
    return `${fieldName} must be at most ${max}`;
  }
  return null;
};

export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  if (new Date(endDate) < new Date(startDate)) {
    return "End date must be after start date";
  }
  return null;
};
