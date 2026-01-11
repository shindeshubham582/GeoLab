This project is a React + TypeScript web application built as part of the GeoLab technical assignment.

The application contains two main features:

1. News section – Fetches and displays latest news based on selected categories.

2. Samples section – Uploads CSV data, performs calculations, and displays results in an interactive table.

The project is built using modern frontend tools and follows clean coding practices.


__Features__

__Home Page__
* Simple landing page
* Navigation to News and Samples modules

__News Page__

* Fetches news using public API
* Filter by categories (Environment, Science, Technology)
* Search with debounce for better performance
* Loading and error handling
* Clean Material UI layout

__Samples Page__

* Upload CSV file with sample data
* Parse CSV using PapaParse
* Editable table using Material UI
* Automatic calculations
* Sorting by Adjusted Moisture and Adjusted Density
* Filter by Sample ID
* Summary dashboard
* Error handling for invalid CSV files
* Supports re-uploading same file

__Tech Stack__
__React__
Used to build a component-based UI with clean separation of logic and UI.

__TypeScript__
Used for type safety, better code readability, and to catch bugs at compile time.

__Webpack__
Used as a custom build tool for bundling, development server, and production builds.

__Material UI__
Used to build a clean and professional user interface quickly without writing a lot of custom CSS.

__Styled Emotion CSS__
Used for writing component-level styles using JavaScript with scoped styling and better maintainability.

__React Query__
Used for handling API calls, caching, loading state, and error handling in a clean way.

__PapaParse__
Used to parse CSV files in the browser efficiently and safely.

__Jest__
Used for unit testing business logic such as calculations and CSV parsing.


Installation & Setup
Prerequisites

*Node.js (v18 or later recommended)
*npm

__Step 1: Clone the repository__

__Step 2: Install dependencies__
npm install

__Step 3: Start development server__
npm start
App will run on:
http://localhost:3000

__Running Tests__
npm test

__Author__
Shubham Shinde
Senior Frontend Developer (React)
