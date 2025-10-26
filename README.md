# SpotIt - Citizen Issue Tracker Frontend

A modern, responsive React web application for reporting, tracking, and managing civic issues in your community.

## Features

- **Report Issues**: Submit civic issues with location, photos, and category
- **Track Complaints**: Monitor issue status in real-time with timeline updates
- **Public Dashboard**: View all reported issues on an interactive map
- **Leaderboard**: Gamification system with points and badges
- **Admin Dashboard**: Manage issues, assign authorities, and track SLAs
- **Chatbot Widget**: AI-powered assistant for quick queries
- **Multi-language Support**: English and Telugu localization
- **Responsive Design**: Mobile-first, works on all devices

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Localization**: i18next (ready for integration)
- **Maps**: Google Maps API integration
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/minicsr07/SplotIt-frontend
cd spotit-citizen-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your API keys to `.env.local`:
- Google Maps API Key
- Backend API URL
- Cloudinary URL (for image uploads)
- FCM API Key (for notifications)

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`


## Project Structure

\`\`\`
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   ├── page.tsx            # Home page
│   ├── report/             # Report issue page
│   ├── track/              # Track issue page
│   ├── issues/             # Public dashboard
│   ├── leaderboard/        # Leaderboard page
│   ├── profile/            # User profile
│   ├── admin/              # Admin dashboard
│   └── auth/               # Authentication pages
├── components/
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section
│   ├── report-form.tsx     # Issue reporting form
│   ├── map-picker.tsx      # Google Maps integration
│   ├── track-form.tsx      # Issue tracking form
│   ├── issues-dashboard.tsx # Public dashboard
│   ├── leaderboard.tsx     # Leaderboard component
│   ├── admin-dashboard.tsx # Admin panel
│   ├── chatbot-widget.tsx  # Chatbot widget
│   └── auth/               # Auth components
└── lib/
    └── utils.ts            # Utility functions
\`\`\`

## API Integration

The frontend expects the following API endpoints from the backend:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/issues` - Create new issue
- `GET /api/issues` - List issues
- `GET /api/issues/:id` - Get issue details
- `PATCH /api/issues/:id` - Update issue
- `POST /api/issues/:id/comments` - Add comment
- `GET /api/leaderboard` - Get leaderboard
- `POST /api/chatbot` - Chatbot queries

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

\`\`\`bash
npm run build
\`\`\`

## Environment Variables

\`\`\`
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_url
NEXT_PUBLIC_FCM_API_KEY=your_fcm_key
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For support, email support@spotit.app or open an issue on GitHub.
