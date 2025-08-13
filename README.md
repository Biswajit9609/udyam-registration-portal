# Udyam Registration Portal

A modern React-based clone of the official Udyam Registration form with multi-step validation and responsive design.

🌐 **Live Demo:** [https://udyam-registration-portal-indol.vercel.app/](https://udyam-registration-portal-indol.vercel.app/)

## Features

- ✅ Multi-step form with Aadhaar and PAN validation
- ⚡ Real-time form validation with error handling
- 📱 Fully responsive design with Tailwind CSS
- 🔒 TypeScript for type safety
- 🗄️ PostgreSQL database integration
- 🎨 Modern UI matching government portal design
- 📊 Progress tracking with visual indicators
- 🔐 OTP verification simulation

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Testing Library (Testing)

**Backend:**
- Node.js + Express
- Prisma ORM
- PostgreSQL Database
- CORS enabled for cross-origin requests

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── UdyamForm.tsx      # Main form component
│   │   └── UdyamForm.test.tsx # Test file
│   ├── assets/                # Images and static files
│   └── App.tsx               # Root component
├── server/
│   ├── index.js              # Express server
│   ├── prisma/               # Database schema
│   └── package.json          # Backend dependencies
└── package.json              # Frontend dependencies
```

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Git

### Frontend Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd udyam-registration-portal

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Setup database
npx prisma migrate dev

# Start server
npm run dev
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
# For production: https://udyam-registration-portal.railway.internal
```

### Backend (server/.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/udyam_db"
FRONTEND_URL="http://localhost:5173"
# For production: https://udyam-registration-portal-indol.vercel.app
PORT=3001
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submit` | Submit form data |

## Database Schema

```sql
model Submission {
  id               Int     @id @default(autoincrement())
  aadhaarNumber    String  @unique
  entrepreneurName String
  organisationType String
  panNumber        String  @unique
  createdAt        DateTime @default(now())
}
```

## Deployment

### Frontend (Vercel)
- **URL:** [https://udyam-registration-portal-indol.vercel.app/](https://udyam-registration-portal-indol.vercel.app/)
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Environment Variables:** `VITE_API_URL`

### Backend (Railway)
- **URL:** udyam-registration-portal.railway.internal
- **Platform:** Railway
- **Start Command:** `node index.js`
- **Environment Variables:** `DATABASE_URL`, `FRONTEND_URL`, `PORT`

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Original Udyam Registration Portal design
- Ministry of MSME, Government of India
- React and TypeScript communities