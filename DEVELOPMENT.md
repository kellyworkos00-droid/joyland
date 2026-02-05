# JOYLAND SPA - User & Developer Guide

## 🎯 Project Overview

**JOYLAND SPA** is a modern, production-ready spa self-booking web application built with Next.js 15. It allows clients to browse spa services, book appointments online, and manage their bookings, while providing an admin dashboard for staff to manage all appointments.

### Key Benefits
- ✅ Reduces staff workload with automated booking
- ✅ Improves customer experience with easy online booking
- ✅ Real-time availability updates prevent double-bookings
- ✅ Automated confirmation system
- ✅ Complete admin management suite

---

## 👥 User Workflows

### Client Journey

#### 1. **Browse Services** (`/services`)
- View all available spa services
- See pricing and duration for each service
- Filter by preferences (optional enhancement)

#### 2. **Sign Up** (`/signup`)
- Create account with: Name, Email, Phone, Password
- Email validation
- Phone format validation
- Password strength requirements (min 6 chars)

#### 3. **Login** (`/login`)
- Enter email and password
- Credentials verified against database
- Session stored in browser

#### 4. **Book Appointment** (`/book/[serviceId]`)
- Select date (next 30 days available)
- Select time slot (30-min intervals, 9 AM - 6 PM)
- View real-time availability
- Confirm booking

#### 5. **Confirmation** (`/confirmation/[appointmentId]`)
- View booking summary
- See confirmation number
- Download receipt (invoice)
- Option to book another service

#### 6. **View Bookings** (`/bookings`)
- See all past and upcoming appointments
- View appointment details
- Cancel or reschedule (future enhancement)

### Admin Workflow

#### 1. **Access Dashboard** (`/admin`)
- View all appointments at a glance
- See key statistics:
  - Total bookings
  - Confirmed appointments
  - Cancelled appointments
  - Revenue

#### 2. **Filter Appointments**
- Filter by date
- Filter by service
- Search by client name (future)

#### 3. **Manage Bookings**
- View detailed appointment info
- Client contact information
- Service details
- Status (confirmed/cancelled/completed)

---

## 🏗️ Technical Architecture

### Frontend Stack
```
Next.js 15 (App Router)
├── React 19 (UI Components)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
├── date-fns (Date Handling)
└── Lucide React (Icons)
```

### Backend Stack
```
Next.js API Routes
├── Authentication (signup/login)
├── Service Management
├── Appointment Management
├── Availability Checking
└── Admin Endpoints
```

### Data Layer
```
In-Memory Storage (Demo)
├── Users
├── Services
└── Appointments

⚠️ NOTE: Resets on server restart. For production, migrate to PostgreSQL/MySQL/SQLite.
```

---

## 📂 File Structure Explained

```
app/
├── api/                          # Backend API Routes
│   ├── auth/
│   │   ├── signup/route.ts      # User registration
│   │   └── login/route.ts       # User authentication
│   ├── services/
│   │   └── route.ts             # List all services
│   ├── appointments/
│   │   └── route.ts             # Create appointment
│   ├── availability/
│   │   └── route.ts             # Check time slots
│   └── admin/
│       └── appointments/        # Admin endpoints
│
├── book/
│   └── [serviceId]/             # Dynamic booking page
│       └── page.tsx
│
├── confirmation/
│   └── [appointmentId]/         # Order confirmation
│       └── page.tsx
│
├── admin/
│   └── page.tsx                 # Admin dashboard
│
├── (auth)/
│   ├── login/page.tsx           # Login form
│   ├── signup/page.tsx          # Registration form
│
├── services/
│   └── page.tsx                 # Services listing
│
├── bookings/
│   └── page.tsx                 # User's appointments
│
├── layout.tsx                   # Root layout
├── page.tsx                     # Home page
└── globals.css                  # Global styles

components/
├── Navbar.tsx                   # Navigation bar
├── Footer.tsx                   # Footer
└── ServiceCard.tsx              # Reusable service card

lib/
├── db.ts                        # Database layer & mock data
└── utils.ts                     # Helper functions

public/                          # Static assets (empty)
```

---

## 🔄 Data Flow

### Booking Flow
```
1. Client logs in
   ↓
2. Browses services (/api/services)
   ↓
3. Selects date & service
   ↓
4. Checks availability (/api/availability)
   ↓
5. Selects time slot
   ↓
6. Creates appointment (/api/appointments)
   ├→ System checks if slot is available
   ├→ Prevents double-booking
   ├→ Creates appointment record
   └→ Returns confirmation
   ↓
7. Views confirmation page
   ↓
8. Appointment saved in database
```

### Admin Flow
```
1. Access /admin dashboard
   ↓
2. Load all appointments (/api/admin/appointments)
   ↓
3. Apply filters (date, service)
   ↓
4. View statistics
   ├→ Total bookings
   ├→ Revenue
   └→ Status breakdown
   ↓
5. View appointment details
   ├→ Client info
   ├→ Service details
   └→ Booking status
```

---

## 🛠️ Development Guide

### Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit: `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

### Project Structure Philosophy

- **App Router**: Uses Next.js 15 App Router for cleaner routing
- **Server Components**: Leverages React Server Components where possible
- **Client Components**: "use client" only when needed (state, effects)
- **TypeScript**: Full type safety throughout
- **Tailwind CSS**: Utility-first CSS for rapid development

### Component Patterns

#### Page Components
```typescript
// Pages use dynamic data and client-side interactivity
'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Fetch data, handle side effects
  }, [])
  
  return <div>{/* JSX */}</div>
}
```

#### API Routes
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Validation
  if (!body.required) {
    return NextResponse.json({ error: 'Missing field' }, { status: 400 })
  }
  
  // Process
  // Return response
  return NextResponse.json({ success: true })
}
```

### Adding New Features

#### Add a New Service
Edit `lib/db.ts`:
```typescript
export const services: Service[] = [
  // Existing services...
  {
    id: '7',
    name: 'New Service',
    description: 'Service description',
    duration: 60,
    price: 99.99,
  },
]
```

#### Add a New Page
1. Create file in `app/` folder
2. Use appropriate naming:
   - `/app/page-name/page.tsx` for regular pages
   - `/app/[param]/page.tsx` for dynamic routes
3. Import Navbar/Footer as needed
4. Add styles using Tailwind classes

#### Add a New API Endpoint
1. Create file: `app/api/route-name/route.ts`
2. Export `GET`, `POST`, `PUT`, or `DELETE` functions
3. Return `NextResponse` with appropriate status codes
4. Use database functions from `lib/db.ts`

---

## 🎨 Styling Guide

### Color Palette
```
Primary Green:     #9ec8a8  (accent-green)
Accent Pink:       #e8b4c8  (accent-pink)
Background Cream:  #fef8f3  (accent-cream)
Dark Text:         #6b6157  (spa-900)
Light Text:        #b5a8a0  (spa-500)
```

### Predefined Classes
```typescript
// Buttons
.btn-primary      // Green button
.btn-secondary    // Light button

// Typography
.section-title    // Large section heading
.section-subtitle // Subtitle text

// Components
.card-shadow      // Hover shadow effect
.input-field      // Styled input
.badge            // Pill-shaped badge
```

### Adding Custom Styles
- Use Tailwind utility classes
- Add to `app/globals.css` for global styles
- Component-specific styles in CSS modules (optional)

---

## 🔐 Security Considerations

### Current Implementation (Demo)
- ⚠️ Passwords stored in plain text
- ⚠️ Session storage in browser
- ⚠️ No HTTPS/TLS
- ⚠️ No rate limiting
- ⚠️ In-memory data storage

### Production Recommendations
1. **Authentication**
   - Implement bcrypt for password hashing
   - Use JWT tokens with secure cookies
   - Add OAuth2 (Google, Facebook)

2. **Database**
   - Move to PostgreSQL/MySQL with encryption
   - Use connection pooling
   - Enable backups

3. **API Security**
   - Add rate limiting
   - Implement CORS properly
   - Use HTTPS/TLS
   - Add API authentication

4. **Admin Protection**
   - Add admin authentication
   - Implement role-based access control
   - Log all admin actions

---

## 🚀 Deployment Guide

### Vercel (Recommended for Next.js)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Supports Next.js
- **AWS Amplify**: AWS native
- **Docker + Any VPS**: Maximum flexibility

### Environment Variables
Create `.env.local`:
```bash
DATABASE_URL=your_database_url
API_URL=your_api_url
JWT_SECRET=your_secret_key
SMTP_HOST=your_email_host
SMTP_USER=your_email
SMTP_PASS=your_password
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Sign up with valid data
- [ ] Try invalid email format
- [ ] Try short password
- [ ] Login with correct credentials
- [ ] Login with wrong credentials

#### Booking
- [ ] View all services
- [ ] Click "Book Now" without login (should redirect)
- [ ] Select future date
- [ ] Select available time
- [ ] Confirm booking
- [ ] View confirmation page
- [ ] Check appointment in bookings

#### Admin
- [ ] Access admin dashboard
- [ ] View all appointments
- [ ] Filter by date
- [ ] Filter by service
- [ ] Verify statistics

### Automated Testing (Future)
- Add Jest for unit tests
- Add Cypress for E2E tests
- Add React Testing Library

---

## 📈 Performance Optimization

### Current Optimizations
- ✅ Next.js image optimization
- ✅ Code splitting with App Router
- ✅ CSS minification with Tailwind
- ✅ Client-side pagination (future)

### Future Improvements
- [ ] Server-side caching
- [ ] Database query optimization
- [ ] Image lazy loading
- [ ] API response caching
- [ ] CDN integration

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Port 3000 already in use
```bash
npm run dev -- -p 3001
```

**Issue**: Module not found errors
```bash
npm install
rm -rf .next node_modules
npm install
```

**Issue**: Styling not applying
- Clear browser cache
- Check Tailwind config
- Ensure CSS file is imported

**Issue**: API returns 404
- Check file path matches route
- Ensure `route.ts` is in correct folder
- Verify request method (GET/POST)

---

## 📚 Additional Resources

### Documentation Links
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React](https://react.dev)

### Useful Libraries
- `date-fns`: Date manipulation
- `lucide-react`: Icons
- `zod`: Schema validation
- `react-hook-form`: Form handling

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- [ ] Update npm packages monthly
- [ ] Monitor performance metrics
- [ ] Review error logs
- [ ] Backup database regularly
- [ ] Test backup restoration

### Getting Help
1. Check error messages in console
2. Review this guide
3. Check Next.js documentation
4. Search GitHub issues
5. Ask in developer community forums

---

## ✨ Future Roadmap

### Phase 1 (MVP - Current)
- ✅ Service browsing
- ✅ Appointment booking
- ✅ User authentication
- ✅ Basic admin dashboard

### Phase 2 (Q1 2024)
- [ ] Email confirmations
- [ ] Payment integration
- [ ] Real database (PostgreSQL)
- [ ] Staff management

### Phase 3 (Q2 2024)
- [ ] Mobile app
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Marketing tools

### Phase 4 (Q3 2024)
- [ ] Multi-location support
- [ ] Loyalty program
- [ ] Package deals
- [ ] AI recommendations

---

**Last Updated**: February 2024
**Version**: 1.0.0
**License**: MIT
