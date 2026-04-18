# Quick Start Guide

## What's Been Built

A complete, production-grade portfolio website for Pranav Kumar with:
- 5 pages (Home, About, Services, Projects, Contact)
- React 18 + Vite frontend with Framer Motion animations
- Spring Boot 3.2 Java backend with email service
- Gmail SMTP integration for contact form
- Cal.com calendar for booking calls
- Rate limiting and form validation
- Fully responsive design (dark theme, glass-morphism)

## File Locations

```
/sessions/keen-trusting-wozniak/mnt/Resume/portfolio/
├── frontend/          # React + Vite
├── backend/           # Spring Boot Java
└── README.md          # Full deployment guide
```

## Pre-Deployment Setup

### 1. Gmail App Password (Required for emails)
```bash
1. Go to myaccount.google.com/security
2. Enable 2-Step Verification
3. Create App Password (select Mail & Windows Computer)
4. Copy 16-character password
5. Set: export MAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

### 2. Cal.com Calendar Setup
```bash
1. Create account at cal.com
2. Create 30-minute event type
3. Connect Google Calendar
4. Get your username (e.g., "pranav-kumar")
5. Update in Contact.jsx: calLink="your-username/30min"
```

### 3. Add Your Photo
```bash
1. Get professional headshot (~400x500px, JPG)
2. Save as: frontend/public/pranav.jpg
3. Done! It appears on home page hero
```

## Local Development

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env: set VITE_API_URL=http://localhost:8080
npm run dev
# Visit http://localhost:5173
```

### Backend
```bash
cd backend
export MAIL_USERNAME=kpranav715@gmail.com
export MAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
export CORS_ORIGIN=http://localhost:5173
./mvnw spring-boot:run
# API runs on http://localhost:8080
```

## Testing

1. **Frontend loads**: http://localhost:5173
2. **Backend health**: http://localhost:8080/api/health
3. **Contact form**: Go to /contact page, fill form, submit
4. **Check email**: You should receive notification + auto-reply

## Deployment Overview

### Vercel (Frontend)
- Push to GitHub
- Connect Vercel
- Set `VITE_API_URL` env var
- Auto-deploys on push

### Render.com (Backend)
- Push to GitHub (same repo)
- Create Web Service
- Set root: `backend/`
- Set Java 17 runtime
- Set SMTP env vars
- Auto-deploys on push

See README.md for detailed deployment steps.

## Key Customization Points

| What | Where | Change |
|------|-------|--------|
| Projects | `frontend/src/data/projects.js` | Add/edit 4 projects |
| Services | `frontend/src/data/services.js` | Add/edit 6 services |
| Skills | `frontend/src/data/skills.js` | Update tech stack |
| Colors | `frontend/tailwind.config.js` | Theme colors |
| Email recipient | `backend/.../EmailService.java` | RECIPIENT_EMAIL |
| Cal.com username | `frontend/src/pages/Contact.jsx` | calLink prop |

## File Overview

### Frontend Key Files
- `src/App.jsx` - Router setup
- `src/pages/*.jsx` - 5 pages with animations
- `src/components/*.jsx` - Reusable UI components
- `src/data/*.js` - Project/service/skill data
- `src/index.css` - Tailwind + glass-morphism + animations
- `tailwind.config.js` - Dark theme, colors, fonts

### Backend Key Files
- `src/main/java/.../ContactController.java` - POST /api/contact endpoint
- `src/main/java/.../EmailService.java` - Gmail SMTP logic
- `src/main/java/.../ContactRequest.java` - Validation DTO
- `src/main/java/.../CorsConfig.java` - CORS setup
- `src/main/resources/application.yml` - Spring Boot config

## Important Notes

- Resume PDF is already at: `frontend/public/PranavKumar_SoftwareEngineer.pdf`
- Photo placeholder at: `frontend/public/PLACEHOLDER_pranav.jpg.txt`
- Email goes to hardcoded address (change in EmailService.java if needed)
- Rate limit: 5 contact form submissions per hour per IP
- Cal.com namespace: "portfolio-call" (can be changed, but consistent)

## Common Tasks

### Deploy Frontend
```bash
npm run build  # Creates frontend/dist/
# Deploy frontend/ to Vercel
```

### Deploy Backend
```bash
./mvnw clean package -DskipTests  # Creates JAR in target/
# Deploy backend/ to Render
```

### Update Projects
1. Edit `frontend/src/data/projects.js`
2. Add new object to `projects` array
3. Push to GitHub (auto-deploys via Vercel)

### Update Services
1. Edit `frontend/src/data/services.js`
2. Add service cards and process steps
3. Push to GitHub (auto-deploys)

## Troubleshooting

**Contact form not sending?**
- Check MAIL_USERNAME and MAIL_APP_PASSWORD are correct
- Verify Gmail 2FA is enabled
- Check backend logs for SMTP errors

**Cal.com not loading?**
- Verify username is correct
- Check calendar event type is public
- Try refreshing the page

**Frontend can't reach backend?**
- Check VITE_API_URL in .env
- Verify CORS_ORIGIN on backend
- Ensure backend is running: `curl http://localhost:8080/api/health`

**Build fails?**
- Delete `node_modules` and `package-lock.json`, then `npm install`
- Check Node version: `node --version` (need 16+)
- Check Java version: `java --version` (need 17+)

## Next Steps

1. Read full README.md for comprehensive deployment instructions
2. Set up Gmail App Password
3. Create Cal.com account
4. Add your photo
5. Test locally
6. Deploy to Vercel + Render
7. Update custom domain
8. Monitor via Render + UptimeRobot

---

All source code is production-ready. No npm install or builds needed to have the code files. Just copy/customize and deploy!
