import React, { useMemo } from "react";
import { usePagination } from "../hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { generatePaginationRange } from "../utils/helpers";

const Pagination = ({
  // Data props
  data = [],
  itemsPerPage = 10,
  initialPage = 1,
  currentPage,
  onPageChange,

  // Render props
  renderItem,
  keyExtractor = (item, index) => item.id || index,
  emptyPlaceholder = null,

  // Configuration
  maxButtons = 5,
  showNumbers = true,
  showPrevNext = true,
  showFirstLast = false,
  disabled = false,

  // Labels
  labels = {
    prev: "Previous",
    next: "Next",
    first: "First",
    last: "Last",
    ellipsis: "...",
  },

  // Styling
  className = "",
  containerClassName = "",
  buttonClassName = "",
  activeClassName = "",
  disabledClassName = "",

  // Custom components
  components = {},

  // Accessibility
  ariaLabel = "Pagination",
  ...restProps
}) => {
  const pagination = usePagination({
    data,
    itemsPerPage,
    initialPage,
    currentPage,
    onPageChange,
  });

  const {
    data: paginatedData,
    currentPage: safeCurrentPage,
    totalPages,
    goToPage,
    goToNext,
    goToPrev,
    goToFirst,
    goToLast,
    hasNextPage,
    hasPrevPage,
    totalItems,
  } = pagination;

  // Generate page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    return generatePaginationRange(safeCurrentPage, totalPages, maxButtons);
  }, [safeCurrentPage, totalPages, maxButtons]);

  // Early return for empty data
  if (totalItems === 0) {
    if (emptyPlaceholder) {
      return React.createElement(
        "div",
        { className: containerClassName },
        emptyPlaceholder
      );
    }
    return null;
  }

  const {
    Container = "nav",
    List = "ul",
    PrevButton = PaginationItem,
    NextButton = PaginationItem,
    FirstButton = PaginationItem,
    LastButton = PaginationItem,
    NumberButton = PaginationItem,
    Ellipsis = "span",
  } = components;

  const renderPageItem = (pageNumber) => {
    return React.createElement(
      NumberButton,
      {
        key: pageNumber,
        page: pageNumber,
        isCurrent: safeCurrentPage === pageNumber,
        isDisabled: disabled,
        onClick: goToPage,
        className: buttonClassName,
        activeClassName: activeClassName,
        disabledClassName: disabledClassName,
        components: components,
        "aria-label": `Go to page ${pageNumber}`,
      },
      pageNumber
    );
  };

  const renderEllipsis = (key) => {
    return React.createElement(
      "li",
      { key: key, className: "pagination-ellipsis" },
      React.createElement(Ellipsis, { "aria-hidden": "true" }, labels.ellipsis)
    );
  };

  const paginationItems = [];

  // Render paginated items
  const renderedItems = paginatedData.map((item, index) => {
    if (renderItem) {
      return React.createElement(
        React.Fragment,
        { key: keyExtractor(item, index) },
        renderItem(item, index)
      );
    }
    return React.createElement(
      "div",
      { key: keyExtractor(item, index) },
      JSON.stringify(item)
    );
  });

  // Build pagination controls
  const paginationControls = [];

  // First Page Button
  if (showFirstLast) {
    paginationControls.push(
      React.createElement(
        FirstButton,
        {
          key: "first",
          page: 1,
          isCurrent: false,
          isDisabled: disabled || !hasPrevPage,
          onClick: goToFirst,
          className: buttonClassName,
          activeClassName: activeClassName,
          disabledClassName: disabledClassName,
          components: components,
          "aria-label": labels.first,
        },
        labels.first
      )
    );
  }

  // Previous Page Button
  if (showPrevNext) {
    paginationControls.push(
      React.createElement(
        PrevButton,
        {
          key: "prev",
          page: safeCurrentPage - 1,
          isCurrent: false,
          isDisabled: disabled || !hasPrevPage,
          onClick: goToPrev,
          className: buttonClassName,
          activeClassName: activeClassName,
          disabledClassName: disabledClassName,
          components: components,
          "aria-label": labels.prev,
        },
        labels.prev
      )
    );
  }

  // Page Numbers
  if (showNumbers) {
    pageNumbers.forEach((page) => {
      if (page === "ellipsis-start" || page === "ellipsis-end") {
        paginationControls.push(renderEllipsis(page));
      } else {
        paginationControls.push(renderPageItem(page));
      }
    });
  }

  // Next Page Button
  if (showPrevNext) {
    paginationControls.push(
      React.createElement(
        NextButton,
        {
          key: "next",
          page: safeCurrentPage + 1,
          isCurrent: false,
          isDisabled: disabled || !hasNextPage,
          onClick: goToNext,
          className: buttonClassName,
          activeClassName: activeClassName,
          disabledClassName: disabledClassName,
          components: components,
          "aria-label": labels.next,
        },
        labels.next
      )
    );
  }

  // Last Page Button
  if (showFirstLast) {
    paginationControls.push(
      React.createElement(
        LastButton,
        {
          key: "last",
          page: totalPages,
          isCurrent: false,
          isDisabled: disabled || !hasNextPage,
          onClick: goToLast,
          className: buttonClassName,
          activeClassName: activeClassName,
          disabledClassName: disabledClassName,
          components: components,
          "aria-label": labels.last,
        },
        labels.last
      )
    );
  }

  return React.createElement(
    React.Fragment,
    null,
    renderedItems,
    totalPages > 1 &&
      React.createElement(
        Container,
        {
          className: containerClassName,
          "aria-label": ariaLabel,
          ...restProps,
        },
        React.createElement(
          List,
          { className: `pagination ${className}`.trim() },
          paginationControls
        )
      )
  );
};

export default Pagination;
