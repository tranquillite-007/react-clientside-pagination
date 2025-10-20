export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const warning = (condition, message) => {
  if (process.env.NODE_ENV !== "production") {
    if (!condition) {
      console.warn(`[react-clientside-pagination] ${message}`);
    }
  }
};

export const sanitizeProps = (props) => {
  const sanitized = { ...props };

  // Ensure data is always an array
  if (!Array.isArray(sanitized.data)) {
    warning(false, "data prop must be an array. Defaulting to empty array.");
    sanitized.data = [];
  }

  // Ensure itemsPerPage is positive integer
  if (!sanitized.itemsPerPage || sanitized.itemsPerPage <= 0) {
    warning(false, "itemsPerPage must be a positive number. Defaulting to 10.");
    sanitized.itemsPerPage = 10;
  }

  // Ensure currentPage is valid
  const totalPages =
    Math.ceil(sanitized.data.length / sanitized.itemsPerPage) || 1;
  if (sanitized.currentPage < 1 || sanitized.currentPage > totalPages) {
    warning(
      false,
      `currentPage ${sanitized.currentPage} is out of bounds. Clamping to valid range.`
    );
    sanitized.currentPage = clamp(sanitized.currentPage, 1, totalPages);
  }

  // Ensure maxButtons is positive integer
  if (!sanitized.maxButtons || sanitized.maxButtons <= 0) {
    sanitized.maxButtons = 5;
  }

  return sanitized;
};

export const generatePaginationRange = (
  currentPage,
  totalPages,
  maxButtons
) => {
  if (totalPages <= maxButtons) {
    return range(1, totalPages);
  }

  const half = Math.floor(maxButtons / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 1) {
    start = 1;
    end = maxButtons;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxButtons + 1;
  }

  const pages = range(start, end);

  // Add ellipsis logic
  if (pages[0] > 1) {
    if (pages[0] > 2) {
      pages.unshift("ellipsis-start");
    }
    pages.unshift(1);
  }

  if (pages[pages.length - 1] < totalPages) {
    if (pages[pages.length - 1] < totalPages - 1) {
      pages.push("ellipsis-end");
    }
    pages.push(totalPages);
  }

  return pages;
};
