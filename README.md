# react-clientside-pagination

**A lightweight, flexible, and production-ready React pagination library built for modern frontend development.**  
Supports both controlled and uncontrolled modes, responsive design, accessibility, and complete customization.

![npm version](https://img.shields.io/npm/v/react-clientside-pagination.svg)

<!-- ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) -->

![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react)

---

## 📦 Installation

Ensure you have **React 18+** installed.

```bash
npm install react-clientside-pagination
```

---

## Quick Start

```jsx
import React from "react";
import Pagination from "react-clientside-pagination";

const cars = [
  /* 32 car objects fetched from API */
];

function CarListing() {
  return (
    <Pagination
      data={cars}
      itemsPerPage={10}
      renderItem={(car) => (
        <div key={car.id} className="car-card">
          <h3>{car.name}</h3>
          <p>{car.brand}</p>
        </div>
      )}
      labels={{ prev: "← Prev", next: "Next →" }}
      className="w-full"
      containerClassName="flex justify-center gap-2 p-4"
      buttonClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition"
    />
  );
}
```

---

## Core Concepts

- **Data-driven pagination**: Pass any array of objects (e.g., products, users, cars).
- **Controlled / Uncontrolled Modes**: Manage `currentPage` internally or externally.
- **Custom Rendering**: Use `renderItem` to define how each item appears.
- **Custom Styling**: Add your own classes or integrate with Tailwind, MUI, or Chakra.
- **Ellipsis Logic**: Smartly shows limited page buttons using `maxButtons` (default 5).
- **Accessibility First**: Fully ARIA-compliant and keyboard-navigable.

---

## API Reference

### `<Pagination />` Props

| Prop                 | Type       | Default                              | Description                           |
| -------------------- | ---------- | ------------------------------------ | ------------------------------------- |
| `data`               | `array`    | `[]`                                 | Array of data items to paginate.      |
| `itemsPerPage`       | `number`   | `10`                                 | Items displayed per page.             |
| `renderItem`         | `function` | -                                    | Render function for each data item.   |
| `keyExtractor`       | `function` | optional                             | Function to extract a unique key.     |
| `className`          | `string`   | `""`                                 | Wrapper custom class.                 |
| `containerClassName` | `string`   | `""`                                 | Pagination controls container class.  |
| `buttonClassName`    | `string`   | `""`                                 | Pagination button styling class.      |
| `maxButtons`         | `number`   | `5`                                  | Max number of visible page buttons.   |
| `labels`             | `object`   | `{ prev: "Previous", next: "Next" }` | Customizable navigation labels.       |
| `emptyPlaceholder`   | `node`     | `null`                               | Element to render when data is empty. |
| `currentPage`        | `number`   | -                                    | Controlled current page.              |
| `onPageChange`       | `function` | -                                    | Called when page changes.             |
| `ariaLabel`          | `string`   | `"Pagination"`                       | Accessibility label.                  |

---

## Hook API: `usePagination`

If you prefer a **headless logic-only** approach:

```js
import { usePagination } from "react-clientside-pagination";

const { currentPage, totalPages, paginatedItems, goTo, goNext, goPrev } =
  usePagination({ data, itemsPerPage });
```

---

## Styling Options

The component is **styling-agnostic** and works with any system.

### Example with TailwindCSS

```jsx
<Pagination
  buttonClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition"
  containerClassName="flex justify-center gap-2 p-4"
  className="w-full"
/>
```

### Using CSS Modules or Styled Components

Yes, you can! Wrap it in your own styled component or pass classNames dynamically.

---

## Accessibility

- Full keyboard support (`ArrowLeft`, `ArrowRight`)
- ARIA attributes (`aria-label`, `aria-current`)
- Focusable elements and tab order maintained
- Optional `aria-live` region for page updates (recommended for screen readers)

---

## Troubleshooting

| Issue                              | Cause                               | Fix                                                                 |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------------------------- |
| Pagination buttons not showing     | Data length ≤ itemsPerPage          | Add more data or lower itemsPerPage                                 |
| Page doesn’t reset after filtering | Controlled mode not handling update | Clamp page via `onPageChange`                                       |
| Custom styles not applying         | Missing class props                 | Ensure className, containerClassName, or buttonClassName are passed |

---

## FAQ

**Q:** Can I use styled-components or CSS modules?  
**A:** Absolutely. The component doesn’t enforce any style system.

**Q:** Does it work with SSR?  
**A:** Currently designed for client-side usage. Server pagination support planned.

**Q:** How to change language or button text?  
**A:** Use the `labels` prop, e.g., `{ prev: "←", next: "→" }`.

**Q:** How to show an empty UI when no items?  
**A:** Use `emptyPlaceholder={<div>No data found</div>}`.

---

## Contributing

We welcome contributions!

1. Fork the repo
2. Run `npm install`
3. Implement your changes
4. Run `npm run build`
5. Submit a pull request
<!--
Follow **semantic versioning** and add clear commit messages. -->

---

<!--
## LICENSE

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. -->
