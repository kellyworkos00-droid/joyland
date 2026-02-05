# 🚀 JOYLAND SPA - Installation & Launch Guide

## ✅ System Requirements

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **OS**: Windows, macOS, or Linux
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: 500MB free space

## 📥 Installation Steps

### Step 1: Verify Node.js Installation

Open terminal/command prompt and check:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

If not installed, download from: https://nodejs.org

### Step 2: Navigate to Project Directory

```bash
cd "c:\Users\zachn\OneDrive\Desktop\janesaspa"
```

Or use the terminal already open in VS Code.

### Step 3: Install Dependencies

```bash
npm install
```

⏱️ This may take 2-5 minutes depending on internet speed.

**What it does:**
- Downloads Next.js, React, Tailwind CSS, and other packages
- Creates `node_modules` folder (do not modify)
- Generates `package-lock.json` (do not modify)

## 🎯 Running the Application

### Development Mode (Recommended)

```bash
npm run dev
```

**Output will show:**
```
> next dev
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
✓ Ready in 2.3s
```

### Access the Application

Open your browser and go to: **http://localhost:3000**

**You should see:**
- JOYLAND SPA logo at top
- Hero section with spa imagery
- "Book Appointment" button
- Navigation menu

### Stop the Server

In terminal, press: `Ctrl + C`

---

## 🧪 Testing the Application

### Test User Flow

1. **Visit Home Page**
   - URL: `http://localhost:3000`
   - Verify hero section loads

2. **Sign Up**
   - Click "Sign Up" button
   - Fill form:
     - Name: John Doe
     - Email: john@example.com
     - Phone: 5551234567
     - Password: password123
   - Click "Sign Up"
   - Should redirect to services

3. **Browse Services**
   - See 6 spa services
   - Each shows price and duration
   - Click "Book Now" on any service

4. **Book Appointment**
   - Select date (tomorrow)
   - Select time slot (available times show in green)
   - Click "Confirm Booking"
   - See confirmation page

5. **View Admin Dashboard**
   - Go to: `http://localhost:3000/admin`
   - See appointment you just created
   - Try filtering by date/service

---

## 🛠️ Available Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check code quality
npm run lint

# Update dependencies (be careful!)
npm update
```

---

## 📱 Testing Responsive Design

### In Browser DevTools

1. **Open DevTools**: Press `F12`
2. **Toggle Mobile**: Press `Ctrl + Shift + M`
3. **Test Sizes**:
   - Mobile: 375px wide
   - Tablet: 768px wide
   - Desktop: 1024px+ wide

The app should look good on all sizes!

---

## 🔍 Troubleshooting

### Issue: "Port 3000 already in use"

**Solution**: Use different port
```bash
npm run dev -- -p 3001
```
Then visit: `http://localhost:3001`

### Issue: "npm: command not found"

**Solution**: Node.js not installed or not in PATH
1. Install Node.js from https://nodejs.org
2. Restart terminal
3. Try again

### Issue: "Module not found" error

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Styling looks wrong (no colors)

**Solution**: Clear cache and restart
```bash
# Stop the dev server (Ctrl+C)
rm -rf .next
npm run dev
```

### Issue: Database cleared/appointments disappeared

**This is normal!** The app uses in-memory storage that resets when you:
- Stop and restart the server
- Refresh the page after server restart
- Close the browser (sessions cleared)

For persistence, you need a real database (see DEVELOPMENT.md).

---

## 🌐 Accessing Different Pages

### Public Pages (No Login Required)
- Home: http://localhost:3000
- Services: http://localhost:3000/services
- Sign Up: http://localhost:3000/signup
- Login: http://localhost:3000/login

### Protected Pages (Login Required)
- Book: http://localhost:3000/book/1 (requires login)
- My Bookings: http://localhost:3000/bookings (requires login)
- Confirmation: http://localhost:3000/confirmation/123 (requires login)

### Admin Pages
- Dashboard: http://localhost:3000/admin (no auth in demo)

---

## 💾 What Files Should You Know About?

### Important Files
- `package.json` - Dependencies list
- `app/page.tsx` - Home page
- `app/api/` - Backend API routes
- `components/` - React components
- `lib/db.ts` - Database & mock data

### DO NOT Modify
- `node_modules/` - External dependencies
- `package-lock.json` - Dependency lock file
- `.next/` - Build output

### Safe to Modify
- Component files in `app/`
- Utility functions in `lib/`
- Configuration files (carefully)
- Documentation files

---

## 🚀 When Ready for Production

### Before Deploying

1. **Set up real database**
   - PostgreSQL recommended
   - See DEVELOPMENT.md for setup

2. **Add password hashing**
   - Install bcrypt: `npm install bcrypt`
   - Use in auth routes

3. **Enable HTTPS**
   - Get SSL certificate
   - Configure on server

4. **Set environment variables**
   - Create `.env.production`
   - Add database URL, API keys, etc.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

6. **Deploy to service**
   - Vercel (recommended): https://vercel.com
   - Netlify: https://netlify.com
   - AWS, DigitalOcean, etc.

### Deployment to Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Then follow the interactive prompts.

---

## 📊 Performance Tips

### Development
- Browser DevTools (F12) for debugging
- React DevTools extension
- NextJS debugging in VS Code

### Optimization
- Keep components small
- Avoid unnecessary re-renders
- Use proper data fetching
- Lazy load images

---

## 🔒 Security Reminders

### This is a Demo - In Production:

❌ **Never do this:**
- Store passwords as plain text
- Keep secrets in code
- Disable HTTPS
- Expose database

✅ **Always do this:**
- Hash passwords with bcrypt
- Use environment variables
- Enable HTTPS/TLS
- Add authentication
- Validate all inputs
- Rate limit API endpoints
- Use CORS properly

---

## 📚 Learning Resources

### Built-in Documentation
- [README.md](README.md) - Full overview
- [DEVELOPMENT.md](DEVELOPMENT.md) - Technical deep dive
- [API_DOCS.md](API_DOCS.md) - API reference
- [QUICKSTART.md](QUICKSTART.md) - Quick guide

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

## 🎓 Project Structure Quick Reference

```
Core App Files:
├── app/page.tsx           → Home page
├── app/api/               → API routes
├── components/            → React components
├── lib/db.ts             → Database
└── lib/utils.ts          → Helper functions

Configuration:
├── package.json          → Dependencies
├── tsconfig.json         → TypeScript config
├── next.config.js        → Next.js config
└── tailwind.config.js    → Tailwind config

Documentation:
├── README.md             → Full docs
├── QUICKSTART.md         → Quick start
├── DEVELOPMENT.md        → Dev guide
├── API_DOCS.md          → API reference
└── This File            → Setup guide
```

---

## ✨ First Time Success Checklist

- [ ] Node.js v18+ installed
- [ ] npm installed and working
- [ ] Navigated to project folder
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run dev` successfully
- [ ] Browser opened to http://localhost:3000
- [ ] Home page loaded with styling
- [ ] Signed up with test account
- [ ] Browsed services page
- [ ] Booked an appointment
- [ ] Viewed confirmation page
- [ ] Checked admin dashboard

---

## 🎉 Next Steps

1. **Explore the Application**
   - Test all pages
   - Try different flows
   - Check responsive design

2. **Review Code**
   - Understand structure
   - Read component files
   - Learn the patterns

3. **Customize**
   - Change colors
   - Update services
   - Modify text

4. **Enhance**
   - Add new features
   - Improve styling
   - Add more services

5. **Deploy**
   - Follow production steps
   - Choose platform
   - Launch to production

---

## 💬 Need Help?

### Check These First
1. Terminal error messages
2. Browser console (F12)
3. Troubleshooting section above
4. DEVELOPMENT.md guide

### Common Commands
```bash
# Restart dev server
npm run dev

# Clear cache & reinstall
rm -rf .next node_modules && npm install

# Check Node version
node --version

# Check npm version
npm --version
```

---

## 📞 Quick Reference

| What | Command |
|------|---------|
| Start app | `npm run dev` |
| Stop app | `Ctrl + C` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Update deps | `npm update` |
| Clear cache | `rm -rf .next` |
| Open home | http://localhost:3000 |
| Open admin | http://localhost:3000/admin |
| Open DevTools | `F12` |
| Mobile view | `Ctrl + Shift + M` |

---

## 🎯 You're Ready!

Your JOYLAND SPA application is set up and ready to go!

**Start now:**
```bash
npm run dev
```

**Then open:**
```
http://localhost:3000
```

**Enjoy building! 🧖‍♀️✨**

---

**For detailed information:**
- Setup issues → See Troubleshooting above
- Development questions → See DEVELOPMENT.md
- API questions → See API_DOCS.md
- General info → See README.md

---

**Good luck with your spa booking platform! 🚀**
