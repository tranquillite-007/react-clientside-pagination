import { useState, useMemo, useCallback, useRef } from "react";
import {
  clamp,
  sanitizeProps,
  generatePaginationRange,
  warning,
} from "../utils/helpers";

export const usePagination = (props = {}) => {
  const {
    data: initialData = [],
    itemsPerPage: initialItemsPerPage = 10,
    initialPage = 1,
    currentPage: controlledCurrentPage,
    onPageChange: controlledOnPageChange,
  } = props;

  const hasWarned = useRef({
    controlledWithoutHandler: false,
    bothPageProps: false,
  });

  if (process.env.NODE_ENV !== "production") {
    if (
      controlledCurrentPage !== undefined &&
      controlledOnPageChange === undefined &&
      !hasWarned.current.controlledWithoutHandler
    ) {
      warning(
        false,
        "You provided a currentPage prop without an onPageChange handler. This will render a read-only component."
      );
      hasWarned.current.controlledWithoutHandler = true;
    }

    if (
      initialPage !== undefined &&
      controlledCurrentPage !== undefined &&
      !hasWarned.current.bothPageProps
    ) {
      warning(
        false,
        "Both initialPage and currentPage props are provided. currentPage will take precedence."
      );
      hasWarned.current.bothPageProps = true;
    }
  }

  const isControlled = controlledCurrentPage !== undefined;

  // Internal state for uncontrolled mode
  const [internalState, setInternalState] = useState({
    currentPage: initialPage,
    itemsPerPage: initialItemsPerPage,
  });

  const currentPage = isControlled
    ? controlledCurrentPage
    : internalState.currentPage;
  const itemsPerPage = internalState.itemsPerPage;

  const setCurrentPage = useCallback(
    (page) => {
      if (!isControlled) {
        setInternalState((prev) => ({ ...prev, currentPage: page }));
      }
      if (controlledOnPageChange) {
        controlledOnPageChange(page);
      }
    },
    [isControlled, controlledOnPageChange]
  );

  const setItemsPerPage = useCallback(
    (newItemsPerPage) => {
      if (newItemsPerPage <= 0) {
        warning(false, "itemsPerPage must be a positive number");
        return;
      }

      const totalPages = Math.ceil(initialData.length / newItemsPerPage) || 1;
      const newCurrentPage = clamp(currentPage, 1, totalPages);

      setInternalState((prev) => ({
        currentPage: newCurrentPage,
        itemsPerPage: newItemsPerPage,
      }));

      if (controlledOnPageChange && newCurrentPage !== currentPage) {
        controlledOnPageChange(newCurrentPage);
      }
    },
    [initialData.length, currentPage, controlledOnPageChange]
  );

  // Memoized pagination data
  const paginationData = useMemo(() => {
    const sanitized = sanitizeProps({
      data: initialData,
      itemsPerPage,
      currentPage,
    });

    const {
      data,
      itemsPerPage: sanitizedItemsPerPage,
      currentPage: sanitizedCurrentPage,
    } = sanitized;

    const startIndex = (sanitizedCurrentPage - 1) * sanitizedItemsPerPage;
    const endIndex = startIndex + sanitizedItemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / sanitizedItemsPerPage) || 1;

    return {
      data: paginatedData,
      totalPages,
      currentPage: sanitizedCurrentPage,
      itemsPerPage: sanitizedItemsPerPage,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, data.length),
      totalItems: data.length,
      hasNextPage: sanitizedCurrentPage < totalPages,
      hasPrevPage: sanitizedCurrentPage > 1,
    };
  }, [initialData, itemsPerPage, currentPage]);

  const goToPage = useCallback(
    (page) => {
      const pageNumber = parseInt(page, 10);
      if (pageNumber < 1 || pageNumber > paginationData.totalPages) {
        warning(
          false,
          `Page ${pageNumber} is out of bounds. Valid range: 1-${paginationData.totalPages}`
        );
        return;
      }
      setCurrentPage(pageNumber);
    },
    [paginationData.totalPages, setCurrentPage]
  );

  const goToNext = useCallback(() => {
    if (paginationData.hasNextPage) {
      goToPage(paginationData.currentPage + 1);
    }
  }, [paginationData.hasNextPage, paginationData.currentPage, goToPage]);

  const goToPrev = useCallback(() => {
    if (paginationData.hasPrevPage) {
      goToPage(paginationData.currentPage - 1);
    }
  }, [paginationData.hasPrevPage, paginationData.currentPage, goToPage]);

  const goToFirst = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLast = useCallback(() => {
    goToPage(paginationData.totalPages);
  }, [goToPage, paginationData.totalPages]);

  return {
    // Data
    ...paginationData,

    // Navigation methods
    goToPage,
    goToNext,
    goToPrev,
    goToFirst,
    goToLast,

    // State setters
    setItemsPerPage,

    // Utility
    isControlled,
  };
};
