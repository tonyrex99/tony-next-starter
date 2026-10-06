export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const ITEM_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
} as const;

export type ItemStatus = (typeof ITEM_STATUSES)[keyof typeof ITEM_STATUSES];
