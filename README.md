# Domain Management Application

A React-based web application for managing domains with features for adding, editing, filtering, and previewing domains.

## Features

### Domain Management

- ✨ Add new domains with status and activity settings
- 📝 Edit existing domain properties
- 🗑️ Delete domains with confirmation
- 👁️ Preview domains in a hover popup
- 🔄 Real-time status updates

### Filtering & Sorting

- 🔍 Search domains by name
- 📊 Filter domains by status (verified, pending, rejected)
- ⚡ Switch domain activity status
- 🔤 Sort domains by:
  - Name (Ascending/Descending)
  - Date (Ascending/Descending)
  - Activity status

### User Interface

- 📱 Responsive design for all screen sizes
- 🎯 Interactive previews with hover effects
- ⚡ Fast loading with lazy loading for previews
- 🎨 Clean and modern UI using Ant Design

## Technologies Used

- **Frontend Framework**: React + Vite
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Ant Design
- **Styling**: Tailwind CSS
- **API Integration**: RTK Query for data fetching
- **Code Quality**: ESLint

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd domains-hp
```

2.Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```bash
src/
├── assets/          # Icons and static assets
├── components/      # React components
│   ├── common/      # Reusable components
│   ├── content/     # Main content components
│   └── header/      # Header components
├── core/
│   ├── constants/   # Application constants
│   ├── hooks/       # Custom React hooks
│   ├── services/    # API and state management
│   └── utils/       # Utility functions
├── App.jsx         # Root component
└── main.jsx       # Application entry point
```

## 🔌 API Integration

**Base URL**: `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain`

### Endpoints

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| GET    | /        | Fetch domains |
| POST   | /        | Create domain |
| PUT    | /:id     | Update domain |
| DELETE | /:id     | Delete domain |

## Contact

### Benyamin Hosseinzadeh :

- Gmail : benyaminhosseinzadeh84@gmail.com
