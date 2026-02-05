# JOYLAND SPA - Self-Booking Web Application

A modern, fully-featured spa self-booking web application built with Next.js 15, TypeScript, and Tailwind CSS. Clients can view spa services, book appointments online, and receive confirmations. Admin dashboard for managing bookings.

## 🎯 Features

### Client Features
- **Browse Services**: View all available spa services with prices and durations
- **Easy Booking**: Simple step-by-step booking process
- **Real-time Availability**: Check available time slots dynamically
- **Double-booking Prevention**: System prevents duplicate bookings
- **Booking Confirmation**: Instant confirmation page with appointment details
- **Authentication**: Sign up and login system for clients
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Admin Features
- **Dashboard**: Overview of all appointments
- **Statistics**: Total bookings, revenue, cancellations at a glance
- **Filtering**: Filter appointments by date and service
- **Appointment Management**: View detailed appointment information

### UI/UX Highlights
- **Spa-themed Design**: Soft beige, white, pastel green, and pink color scheme
- **Modern Components**: Loading states, success states, error handling
- **Accessible**: Semantic HTML and keyboard navigation
- **Fast Performance**: Optimized with Next.js

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Database**: In-memory storage (easily replaceable with PostgreSQL/MySQL/SQLite)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📋 Project Structure

```
janesaspa/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── appointments/
│   │   └── auth/
│   │       ├── login/
│   │       └── signup/
│   ├── book/
│   │   └── [serviceId]/
│   ├── confirmation/
│   │   └── [appointmentId]/
│   ├── admin/
│   ├── services/
│   ├── login/
│   ├── signup/
│   ├── bookings/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ServiceCard.tsx
├── lib/
│   ├── db.ts (Database & data management)
│   └── utils.ts (Utility functions)
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run start
```

## 📱 Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section with CTA |
| Services | `/services` | Browse all spa services |
| Book Appointment | `/book/[serviceId]` | Date/time selection & booking |
| Confirmation | `/confirmation/[appointmentId]` | Booking summary & receipt |
| Sign Up | `/signup` | User registration |
| Login | `/login` | User authentication |
| My Bookings | `/bookings` | User's appointment history |
| Admin Dashboard | `/admin` | Manage all appointments |

## 🎨 Color Scheme

- **Primary Green**: `#9ec8a8` - Main brand color
- **Accent Pink**: `#e8b4c8` - Highlights and secondary CTAs
- **Background Cream**: `#fef8f3` - Soft background
- **Text Dark**: `#6b6157` - Primary text color

## 🔐 Authentication

- Users register with name, email, phone, and password
- Login system to access bookings
- Session storage for user data (can be replaced with JWT)
- Password validation (minimum 6 characters)

## 📅 Booking System

- **Date Selection**: 30-day availability window
- **Time Slots**: 30-minute intervals from 9 AM to 6 PM
- **Availability Check**: Real-time slot verification
- **Double-booking Prevention**: Prevents same slot bookings
- **Status Tracking**: confirmed, cancelled, completed

## 💾 Database

Currently uses in-memory storage for demo purposes. Easy to migrate to:
- PostgreSQL
- MySQL
- SQLite
- MongoDB
- Firebase

## 🚦 API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Services & Availability
- `GET /api/services` - List all services
- `GET /api/availability` - Get available time slots

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/admin/appointments` - List all appointments (admin)

## 📦 Services (Mock Data)

1. **Swedish Massage** - $89.99 (60 min)
2. **Deep Tissue Massage** - $99.99 (60 min)
3. **Facial Treatment** - $79.99 (45 min)
4. **Hot Stone Therapy** - $119.99 (75 min)
5. **Aromatherapy Treatment** - $69.99 (50 min)
6. **Full Body Scrub** - $59.99 (45 min)

## ✨ Future Enhancements

- [ ] Email confirmations (Nodemailer/SendGrid)
- [ ] Payment integration (Stripe)
- [ ] Real database (PostgreSQL)
- [ ] Admin authentication
- [ ] Cancel/reschedule appointments
- [ ] User profile management
- [ ] Service ratings and reviews
- [ ] Multi-language support
- [ ] SMS notifications
- [ ] Calendar view
- [ ] Staff scheduling
- [ ] Discount codes

## 🐛 Known Limitations

- In-memory data storage (resets on server restart)
- No actual email sending
- No payment processing
- Demo admin dashboard (no auth)

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

For questions or issues, please contact:
- Email: info@joylandspa.com
- Phone: (555) 123-4567

---

**Made with ❤️ for spa businesses worldwide**
