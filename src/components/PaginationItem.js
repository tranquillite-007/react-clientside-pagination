import React from "react";

const PaginationItem = ({
  page,
  isCurrent,
  isDisabled,
  onClick,
  children,
  className = "",
  buttonClassName = "",
  activeClassName = "",
  disabledClassName = "",
  components = {},
  ...props
}) => {
  const { Button = "button" } = components;

  const baseClassName = className || "pagination-item";
  const currentClassName = isCurrent ? "pagination-item--current" : "";
  const disabledClass = isDisabled ? "pagination-item--disabled" : "";

  const combinedClassName = [
    baseClassName,
    currentClassName,
    disabledClass,
    buttonClassName,
    isCurrent ? activeClassName : "",
    isDisabled ? disabledClassName : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (!isDisabled) {
      onClick(page, e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  const domProps = { ...props };
  delete domProps.activeClassName;
  delete domProps.disabledClassName;

  return React.createElement(
    "li",
    { className: baseClassName },
    React.createElement(
      Button,
      {
        className: combinedClassName,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        disabled: isDisabled,
        "aria-current": isCurrent ? "page" : undefined,
        "aria-label": domProps["aria-label"],
        tabIndex: isDisabled ? -1 : 0,
        ...domProps,
      },
      children
    )
  );
};

export default PaginationItem;
