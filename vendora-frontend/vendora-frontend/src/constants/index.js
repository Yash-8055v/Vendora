export const ROLES = {
  GUEST: "guest",
  CUSTOMER: "customer",
  VENDOR: "vendor",
  ADMIN: "admin",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};

export const VENDOR_APPLICATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const PRODUCT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// Where the navbar avatar / post-login redirect sends each role.
export const ROLE_DASHBOARD_PATH = {
  [ROLES.CUSTOMER]: "/account",
  [ROLES.VENDOR]: "/vendor",
  [ROLES.ADMIN]: "/admin",
};
