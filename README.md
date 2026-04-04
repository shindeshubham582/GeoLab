# 🌍 GeoLab - Geospatial Data Analysis Platform

> A modern, professional-grade web application for geospatial data analysis, environmental news tracking, and sample data processing.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3-blue)
![Recharts](https://img.shields.io/badge/Recharts-visualization-green)
![License](https://img.shields.io/badge/License-ISC-green)

## ✨ Features

### 📊 Sample Analysis Module
- **CSV Upload & Parsing**: Seamlessly upload and process geospatial sample data in CSV format
- **Real-time Calculations**: Automatic calculation of adjusted moisture, density, and other metrics
- **Advanced Analytics**: View comprehensive statistics and data summaries
- **Data Visualization**: Interactive charts including:
  - Line charts for moisture trends
  - Bar charts for density comparison
  - Scatter plots for correlations
  - Area charts for porosity distribution
- **Export Capabilities**: Download data as CSV, PDF reports, or JSON
- **Local Persistence**: Automatic save to browser's localStorage
- **Sorting & Filtering**: Sort by calculated values and filter by sample ID

### 📰 News Feed Module
- **Real-time News**: Fetch latest environmental, science, and technology news
- **Country-based Filtering**: Select news from different countries (India, USA, UK, Canada, Australia, Germany)
- **Intelligent Search**: Debounced search with trending suggestions
- **Trending Topics**: Quick-access trending searches
- **Modern Card Layout**: Beautiful card-based news display with images
- **Source Attribution**: Clear source identification and publication dates

### 🏠 Professional Home Page
- Feature showcase with visual cards
- Platform statistics and highlights
- Technology stack display
- Call-to-action buttons
- Responsive design

### 🎨 Modern UI/UX
- Professional gradient design (Purple & Blue theme)
- Responsive layout for all devices
- Smooth animations and transitions
- Dark-friendly color scheme
- Accessible components

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2 with TypeScript 5.9
- **State Management**: TanStack React Query for server state
- **Styling**: Emotion (CSS-in-JS) + Material UI
- **Data Visualization**: Recharts for interactive charts
- **File Processing**: PapaParse for CSV parsing
- **Export**: jsPDF and html2canvas for PDF generation
- **Icons**: Lucide React icons
- **Build Tool**: Webpack 5
- **Testing**: Jest & TypeScript
- **Deployment**: GitHub Pages

## 📋 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── TileAccordion.tsx
│   └── useDebounce.tsx
├── pages/               # Page components
│   ├── Home.tsx        # Landing page
│   ├── Samples.tsx     # Data analysis & visualization
│   └── News.tsx        # News feed
├── services/           # API & external services
│   └── newsApi.ts      # News API integration
├── types/              # TypeScript type definitions
│   └── samples.ts      # Sample data types
├── utils/              # Utility functions
│   ├── calculations.ts  # Data calculation logic
│   ├── csvParser.ts    # CSV parsing utility
│   ├── exportUtils.ts  # Export to CSV/PDF/JSON
│   └── storageHooks.ts # localStorage/sessionStorage hooks
├── styles/             # Global styles
│   └── GlobalStyles.tsx
├── App.tsx            # Main app component with routing
└── index.tsx          # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm 8+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shindeshubham582/GeoLab.git
cd GeoLab
```

2. **Install dependencies**
```bash
npm install
```

3. **Development server**
```bash
npm start
```
The application will open at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

## 📖 Usage Guide

### 📊 Sample Analysis (Samples Page)

1. **Upload CSV**: Click "Upload CSV" and select your data file
   - Format: Sample ID, Moisture, Dry Density, Correction Factor, Porosity
2. **View Analytics**: Automatic calculations and statistics
3. **Visualize Data**: Multiple chart types show relationships
4. **Export Results**: 
   - CSV for data processing
   - PDF for reports
   - JSON for programmatic use
5. **Filter & Sort**: Use search box to filter by Sample ID
6. **Auto-Calculate**: Toggle to recalculate on changes

### 📰 News Feed (News Page)

1. **Search**: Enter keywords in the search box
2. **Filter by Country**: Select from available countries
3. **Trending Topics**: Click trending tags for quick searches
4. **Read Articles**: Click "Read Article" to visit the full story
5. **Browse Results**: All articles display in a card layout

### 💾 Data Persistence

- Sample data is automatically saved to browser's localStorage
- Persists across browser sessions
- Clear data with the "Clear All" button

## 🔧 Scripts

```bash
# Development
npm start          # Start dev server with Webpack
npm run build      # Production build
npm run lint       # Run ESLint
npm test           # Run Jest tests
npm run deploy     # Deploy to GitHub Pages
```

## 📊 Data Format

### CSV Format for Samples
```csv
sampleId,moisture,dryDensity,correctionFactor,porosity
S001,15.2,1.8,5.0,25.0
S002,18.5,1.6,3.2,28.5
S003,12.1,1.9,4.5,22.1
```

### Calculations
- **Adjusted Moisture**: `moisture × (1 + correctionFactor/100)`
- **Adjusted Density**: `dryDensity × (1 - porosity/100)`

## 🔐 Environment Variables

No environment variables needed for basic functionality.

For News API customization, edit in `src/services/newsApi.ts`:
```typescript
const API_KEY = "your_newsdata_api_key";
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### GitHub Pages

1. **Deploy automatically**:
```bash
npm run deploy
```

2. **Manual deployment**:
```bash
npm run build
gh-pages -d dist
```

Visit: `https://shindeshubham582.github.io/GeoLab/`

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

## 🎯 Features Roadmap

- [ ] Dark mode toggle
- [ ] Advanced filtering & comparisons
- [ ] Real-time data updates with WebSocket
- [ ] User authentication & profiles
- [ ] Data sharing capabilities
- [ ] Mobile app version
- [ ] Advanced charting (3D plots)
- [ ] Data import from databases

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Salman Siddiqui**
- GitHub: [@shindeshubham582](https://github.com/shindeshubham582)
- Portfolio: [salman-siddiqui.in](https://salman-siddiqui.in)

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Icons from [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- UI Components from [Material-UI](https://mui.com/)
- News API from [NewsData.io](https://newsdata.io/)

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/shindeshubham582/GeoLab/issues)
- Email: shubham@example.com

---

**Made with ❤️ for geospatial data enthusiasts**
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
