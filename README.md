# VisionTech.al - Company Landing Page

A modern, professional landing page for VisionTech.al, a technology startup specializing in web/app development, cybersecurity, and penetration testing services.

## 🚀 Features

- **Modern Design**: Inspired by NestJS website with premium, tech-forward aesthetics
- **Responsive**: Fully responsive design that works on mobile, tablet, and desktop
- **Performance Optimized**: Lazy loading, optimized assets, and efficient code splitting
- **SEO Friendly**: Meta tags, semantic HTML, and optimized structure
- **Accessibility**: WCAG 2.1 AA compliant
- **Full Stack**: Angular frontend with NestJS backend
- **Database Ready**: PostgreSQL with TypeORM and migrations
- **Contact Form**: Fully functional contact form with email notifications
- **Admin Ready**: API structure prepared for future admin panel

## 📁 Project Structure

```
visiontech-al/
├── frontend/          # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/         # Page components
│   │   │   ├── components/    # Reusable components
│   │   │   └── services/       # API services
│   │   └── assets/
│   └── angular.json
│
├── backend/           # NestJS API
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   ├── entities/          # Database entities
│   │   ├── config/            # Configuration files
│   │   └── database/          # Migrations and seeds
│   └── package.json
│
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- Angular 17+
- TypeScript
- SCSS
- Angular Material
- RxJS

### Backend
- NestJS
- TypeORM
- PostgreSQL
- class-validator
- Nodemailer (for email notifications)
- Helmet (security)
- Throttler (rate limiting)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Angular CLI (v17+)

## 🔧 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (copy from `.env.example`):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=visiontech

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:4200

# Optional: Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@visiontech.al
CONTACT_EMAIL=contact@visiontech.al
```

4. Create the PostgreSQL database:
```sql
CREATE DATABASE visiontech;
```

5. Start the backend server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000/api`

6. (Optional) Seed the database with sample data:
```bash
npm run seed
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `src/environments/environment.ts` file if needed (already included):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## 📚 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a single project
- `POST /api/projects` - Create a project
- `PATCH /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Case Studies
- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/:id` - Get a single case study
- `POST /api/case-studies` - Create a case study
- `PATCH /api/case-studies/:id` - Update a case study
- `DELETE /api/case-studies/:id` - Delete a case study

### Services
- `GET /api/services` - Get all services

### Contact
- `POST /api/contact` - Submit a contact form

### Demos
- `GET /api/demos` - Get all demos (optional `?category=` filter)
- `GET /api/demos/:id` - Get a single demo
- `POST /api/demos` - Create a demo
- `PATCH /api/demos/:id` - Update a demo
- `DELETE /api/demos/:id` - Delete a demo

## 🎨 Design System

The design system is inspired by the NestJS website with the following key elements:

- **Primary Color**: `#E0234E` (Red/Pink)
- **Background**: Dark theme (`#121212`, `#1e1e1e`)
- **Typography**: Inter font family
- **Animations**: Smooth fade-in and slide-up effects
- **Components**: Modern cards, buttons, and navigation

## 🗄️ Database Schema

The database includes the following tables:
- `projects` - Project portfolio items
- `case_studies` - Client success stories
- `services` - Service offerings
- `contact_submissions` - Contact form submissions
- `demos` - Interactive demo applications

## 🚀 Deployment

### Backend Deployment

1. Build the application:
```bash
npm run build
```

2. Set environment variables for production

3. Run migrations:
```bash
npm run migration:run
```

4. Start the production server:
```bash
npm run start:prod
```

### Frontend Deployment

1. Update `environment.prod.ts` with production API URL

2. Build for production:
```bash
npm run build
```

3. Deploy the `dist/visiontech-frontend` folder to your hosting provider

## 📝 Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Code Formatting
```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
npm run lint
```

## 🔒 Security Features

- Helmet.js for HTTP header security
- Rate limiting with @nestjs/throttler
- Input validation with class-validator
- CORS configuration
- SQL injection protection via TypeORM

## 📧 Contact Form Email

The contact form can send email notifications when properly configured. Set up SMTP credentials in the `.env` file.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

VisionTech.al
- Email: contact@visiontech.al
- Location: Albania

---

Built with ❤️ by VisionTech.al

