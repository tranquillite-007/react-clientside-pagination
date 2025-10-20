import React from "react";

export interface PaginationLabels {
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
  ellipsis?: string;
}

export interface PaginationComponents {
  Container?: React.ElementType;
  List?: React.ElementType;
  PrevButton?: React.ElementType;
  NextButton?: React.ElementType;
  FirstButton?: React.ElementType;
  LastButton?: React.ElementType;
  NumberButton?: React.ElementType;
  Ellipsis?: React.ElementType;
  Button?: React.ElementType;
}

export interface UsePaginationProps {
  data?: any[];
  itemsPerPage?: number;
  initialPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export interface UsePaginationReturn {
  data: any[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  isControlled: boolean;
}

export interface PaginationProps {
  // Data props
  data?: any[];
  itemsPerPage?: number;
  initialPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;

  // Render props
  renderItem?: (item: any, index: number) => React.ReactNode;
  keyExtractor?: (item: any, index: number) => string | number;
  emptyPlaceholder?: React.ReactNode;

  // Configuration
  maxButtons?: number;
  showNumbers?: boolean;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
  disabled?: boolean;

  // Labels
  labels?: PaginationLabels;

  // Styling
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  activeClassName?: string;
  disabledClassName?: string;

  // Custom components
  components?: PaginationComponents;

  // Accessibility
  ariaLabel?: string;
}

export interface PaginationItemProps {
  page: number | string;
  isCurrent?: boolean;
  isDisabled?: boolean;
  onClick: (page: number | string, event: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  activeClassName?: string;
  disabledClassName?: string;
  components?: PaginationComponents;
  "aria-label"?: string;
}

export declare const usePagination: (
  props?: UsePaginationProps
) => UsePaginationReturn;

export declare const Pagination: React.FC<PaginationProps>;

export declare const PaginationItem: React.FC<PaginationItemProps>;

export { Pagination as default };
