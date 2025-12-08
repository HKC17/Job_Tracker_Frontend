import React from "react";
import { STATUS_COLORS } from "../../utils/constants";
import { getStatusLabel } from "../../utils/helpers";

const StatusBadge = ({ status }) => {
  const colorClass = STATUS_COLORS[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
