# Quick Setup Guide

## Prerequisites Checklist

- [ ] Node.js (v18+) installed
- [ ] PostgreSQL (v12+) installed and running
- [ ] Angular CLI installed globally (`npm install -g @angular/cli`)

## Step-by-Step Setup

### 1. Database Setup

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE visiontech;

# Exit psql
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from env.example)
cp env.example .env

# Edit .env with your database credentials
# DB_PASSWORD=your_actual_password

# Start the backend (development mode)
npm run start:dev

# In another terminal, seed the database (optional)
npm run seed
```

Backend should now be running at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Frontend should now be running at `http://localhost:4200`

## Verification

1. Open `http://localhost:4200` in your browser
2. You should see the VisionTech.al homepage
3. Check browser console for any errors
4. Test the contact form
5. Navigate to Demos page

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Check if port 3000 is available

### Frontend won't start
- Make sure backend is running first
- Check if port 4200 is available
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Database connection errors
- Verify PostgreSQL is running: `pg_isready`
- Check database exists: `psql -U postgres -l`
- Verify credentials in `.env` file

### API errors in browser console
- Ensure backend is running on port 3000
- Check CORS configuration in `backend/src/main.ts`
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL

## Next Steps

1. Update contact information in footer and contact page
2. Add your actual social media links
3. Configure SMTP for email notifications (optional)
4. Customize colors and branding in `frontend/src/styles.scss`
5. Add your actual project images and content
6. Deploy to production!

