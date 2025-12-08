# 📊 Job Application Tracker - Frontend

A modern, feature-rich React application for tracking job applications efficiently. Built with React, Vite, TailwindCSS, and integrated with Django REST API backend.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Features

### ✨ Core Features

- **Authentication System** - Secure JWT-based login/registration with auto token refresh
- **Dashboard** - Overview of application statistics with interactive charts
- **Application Management** - Full CRUD operations with search and filtering
- **Analytics** - Visual insights with charts and metrics
- **Profile Management** - User profile and settings
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 📊 Dashboard

- Real-time statistics (Total, Active, Offers, Rejected)
- Application trends visualization
- Success rate tracking
- Recent activity feed

### 💼 Applications

- Create, edit, and delete applications
- Advanced search and filtering
- Status management (Applied, Screening, Interview, Offer, Rejected, etc.)
- Detailed application cards with company info
- Job details and requirements tracking

### 📈 Analytics

- Status distribution pie chart
- Applications timeline chart
- Top skills analysis
- Key metrics and insights
- Success rate calculation

## 🛠️ Tech Stack

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| **React 18**        | UI Library              |
| **Vite**            | Build Tool & Dev Server |
| **React Router v6** | Client-side Routing     |
| **TailwindCSS**     | Styling & UI            |
| **Axios**           | HTTP Client             |
| **React Query**     | Server State Management |
| **React Hook Form** | Form Handling           |
| **Recharts**        | Data Visualization      |
| **date-fns**        | Date Utilities          |
| **Lucide React**    | Icon Library            |
| **React Hot Toast** | Notifications           |

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API running ([Backend Repository](https://github.com/HKC17/Job_Tracker_Backend))
- MongoDB database configured

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Job_Tracker_Frontend.git
cd Job_Tracker_Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Job Application Tracker
VITE_APP_VERSION=1.0.0
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
job_tracker_frontend/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Shared components
│   │   ├── applications/   # Application components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── analytics/      # Analytics components
│   │   └── profile/        # Profile components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎨 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT tokens (access + refresh) stored in localStorage
3. Access token included in all API requests
4. Automatic token refresh on expiration
5. Redirect to login when refresh token expires

## 🎯 Usage Guide

### Getting Started

1. **Register/Login**

   - Navigate to `/register` to create an account
   - Or login at `/login` with existing credentials

2. **Dashboard**

   - View your application statistics
   - Monitor trends and success rate
   - See recent activity

3. **Add Applications**

   - Click "New Application" button
   - Fill in company and job details
   - Track status as you progress

4. **Analytics**

   - View detailed charts and insights
   - Analyze your job search performance
   - Track most in-demand skills

5. **Profile**
   - Update personal information
   - Add professional links
   - Manage account settings

## 🔗 API Integration

This frontend connects to the Django REST API backend:

- **Backend Repository:** [Job_Tracker_Backend](https://github.com/HKC17/Job_Tracker_Backend)
- **API Base URL:** `http://localhost:8000/api`

### API Endpoints Used

- `POST /auth/register/` - User registration
- `POST /auth/login/` - User login
- `POST /auth/refresh/` - Token refresh
- `GET /applications/` - Get applications
- `POST /applications/` - Create application
- `PUT /applications/:id/` - Update application
- `DELETE /applications/:id/` - Delete application
- `GET /analytics/dashboard/` - Dashboard stats

## 📦 Building for Production

```bash
# Build the project
npm run build

# Output will be in dist/ folder
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_NAME=Job Application Tracker
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
npx kill-port 3000
```

### API Connection Issues

1. Verify backend is running
2. Check CORS configuration
3. Verify `.env` API URL

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Recharts](https://recharts.org/) - Charting Library
- [Lucide](https://lucide.dev/) - Icon Library

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Applications

![Applications](screenshots/applications.png)

### Analytics

![Analytics](screenshots/analytics.png)

## 🔮 Future Enhancements

- [ ] File upload for resumes
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Export data (CSV, PDF)
- [ ] Dark mode
- [ ] Mobile app
- [ ] AI-powered job recommendations

## 📞 Support

For issues and questions:

- Open an issue on [GitHub Issues](https://github.com/YOUR_USERNAME/Job_Tracker_Frontend/issues)
- Email: your.email@example.com

---

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Your Name](https://github.com/YOUR_USERNAME)
