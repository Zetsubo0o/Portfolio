# Pranav Kumar - Freelancing Portfolio Website

A production-grade, multi-page portfolio website showcasing full-stack development expertise, algorithmic trading systems, and freelance services.

## Stack Overview

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: React Icons
- **Calendar**: Cal.com Embed
- **Features**: Dark theme with glass-morphism, smooth page transitions, responsive design

### Backend
- **Runtime**: Java 17
- **Framework**: Spring Boot 3.2
- **Features**: REST API, Email service (Gmail SMTP), CORS configuration, Rate limiting
- **Build Tool**: Maven
- **Database**: Not required (stateless service)

## Local Development

### Prerequisites
- Node.js 16+ and npm
- Java 17 JDK
- Maven 3.6+
- Git

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:8080

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create .env file (optional - can set env vars directly)
cp .env.example .env

# Set environment variables
export MAIL_USERNAME=kpranav715@gmail.com
export MAIL_APP_PASSWORD=your_16_char_app_password
export CORS_ORIGIN=http://localhost:5173

# Run with Maven
./mvnw spring-boot:run

# Or build and run JAR
./mvnw clean package -DskipTests
java -jar target/portfolio-1.0.0.jar
```

The backend will be available at `http://localhost:8080`

### API Endpoints

- `POST /api/contact` - Contact form submission
  - Request body: `{ name, email, subject, message }`
  - Response: `{ message }` (200) or `{ error }` (400/429)
  - Rate limit: 5 requests per hour per IP

- `GET /api/health` - Health check
  - Response: `{ status: "ok" }`

## Gmail SMTP Configuration

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification for your Google Account

### Step 2: Create App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. Copy this password - this is your `MAIL_APP_PASSWORD`

### Step 3: Configure Backend
Set these environment variables:
```bash
MAIL_USERNAME=kpranav715@gmail.com
MAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  # 16-char password from step 2
```

## Cal.com Calendar Integration

### Setup Instructions

1. **Create Cal.com Account**
   - Go to [Cal.com](https://cal.com)
   - Sign up with your email
   - Create a 30-minute event type

2. **Connect Google Calendar**
   - In Cal.com settings, connect your Google Calendar
   - This enables automatic Google Meet link generation

3. **Update Portfolio**
   - Find your Cal.com username (e.g., `pranav-kumar`)
   - Open `frontend/src/pages/Contact.jsx`
   - Replace the placeholder:
     ```jsx
     <Cal
       namespace="portfolio-call"
       calLink="your-username/30min"  // Change this
     />
     ```

## Adding Your Photo

1. Obtain a professional headshot photo (recommended: 400x500px, JPG format)
2. Save as `pranav.jpg`
3. Place in `frontend/public/pranav.jpg`
4. The photo will automatically display on the home page hero section

If no photo is present, a placeholder message appears.

## Project Structure

```
portfolio/
├── frontend/
│   ├── public/
│   │   ├── pranav.jpg                    # Your professional photo
│   │   └── PranavKumar_SoftwareEngineer.pdf
│   ├── src/
│   │   ├── components/                   # Reusable UI components
│   │   ├── pages/                        # Route pages
│   │   ├── data/                         # Static data (projects, services, skills)
│   │   ├── App.jsx                       # Router and layout
│   │   ├── index.css                     # Tailwind + global styles
│   │   └── main.jsx                      # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/
│   ├── src/main/
│   │   ├── java/com/pranav/portfolio/
│   │   │   ├── PortfolioApplication.java
│   │   │   ├── controller/ContactController.java
│   │   │   ├── service/EmailService.java
│   │   │   ├── config/CorsConfig.java
│   │   │   └── dto/ContactRequest.java
│   │   └── resources/application.yml
│   ├── pom.xml
│   └── .env.example
│
└── README.md
```

## Pages

### Home (/)
- Hero section with photo, name, and rotating titles
- Featured projects and services teasers
- Call-to-action buttons
- Smooth scroll animations

### About (/about)
- Background and education details
- Experience at LTM
- Key achievements (awards, uptime, delivery metrics)
- Tech stack grid with icons
- Resume download button

### Services (/services)
- 6 service cards with detailed descriptions
- Typical deliverables for each service
- Process breakdown (Discovery → Design → Build → Ship → Support)
- Service inquiry CTA

### Projects (/projects)
- 4 featured project case studies
- Problem-Solution-Outcome narrative for each
- Technology stack badges
- Project links and resources

### Contact (/contact)
- Contact form (name, email, subject, message)
- Form validation and toast notifications
- Rate limiting (5 requests per hour)
- Cal.com calendar embed (30-min consultation booking)
- Social media links (GitHub, LinkedIn, Email, Phone)

## Customization Guide

### Edit Projects
Edit `frontend/src/data/projects.js` to update project details, stack, outcomes, and links.

### Edit Services
Edit `frontend/src/data/services.js` to customize service offerings and process steps.

### Edit Skills
Edit `frontend/src/data/skills.js` to update technology stack display on About page.

### Colors & Fonts
- Primary accent color: `#fbbf24` (amber-400) and `#f97316` (orange-500)
- Background: `#0a0a0a` (dark)
- Serif font: Instrument Serif / Playfair Display
- Sans font: Inter
- All configured in `frontend/tailwind.config.js`

### Email Recipients
Update the hardcoded recipient email in:
- `backend/src/main/java/com/pranav/portfolio/service/EmailService.java`
- Change `RECIPIENT_EMAIL` from `kpranav715@gmail.com` to your email

## Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio website"
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select project root: `frontend`

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Add `VITE_API_URL` with your backend URL
   - Example: `https://portfolio-api.onrender.com`

5. **Deploy**
   - Vercel will automatically deploy on push to main
   - Your site is live at `https://<project>.vercel.app`

### Backend Deployment (Render.com)

1. **Push to GitHub** (same repo as frontend)

2. **Create New Web Service**
   - Go to [Render](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select branch: `main`

3. **Configure Service**
   - Name: `portfolio-api`
   - Root Directory: `backend`
   - Runtime: `Java 17`
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/portfolio-*.jar`

4. **Set Environment Variables**
   - `MAIL_USERNAME=kpranav715@gmail.com`
   - `MAIL_APP_PASSWORD=your_16_char_password`
   - `CORS_ORIGIN=https://<your-frontend>.vercel.app`

5. **Deploy**
   - Render will build and deploy automatically
   - Your API is live at `https://portfolio-api.onrender.com`

### Custom Domain

1. **Domain Registration**
   - Register domain at any registrar (Namecheap, GoDaddy, Route 53, etc.)

2. **Vercel Domain Setup**
   - Go to your Vercel project settings
   - Add custom domain
   - Follow instructions to update DNS records

3. **DNS Configuration**
   - Update CNAME record:
     ```
     your-domain.com  CNAME  cname.vercel.com
     ```
   - Update env var on Render:
     - `CORS_ORIGIN=https://your-domain.com`

### Uptime Monitoring

**Important**: Render's free tier sleeps after 15 minutes of inactivity. To keep your backend always-on:

**Option 1: Free - Use UptimeRobot**
1. Go to [UptimeRobot](https://uptimerobot.com)
2. Create new monitor: `https://portfolio-api.onrender.com/api/health`
3. Set interval to 5 minutes
4. Backend stays warm and responsive

**Option 2: Paid - Render Starter Plan**
1. Upgrade to Starter plan ($7/month)
2. Backend runs 24/7 without sleep
3. No additional monitoring needed

## Performance & SEO

### Built-in Optimizations
- Lazy image loading
- Code splitting via Vite
- Responsive images
- Semantic HTML
- Meta tags per route
- Smooth scroll behavior
- Reduced motion support

### Lighthouse Scores Target
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

- CORS configured to allow only your domain
- Rate limiting on contact form (5 req/hr)
- Input validation on all form fields
- No sensitive data stored
- Environment variables for secrets
- HTTPS enforced in production

## Troubleshooting

### Contact form not sending emails
1. Check `MAIL_USERNAME` and `MAIL_APP_PASSWORD` are correct
2. Verify 2FA is enabled on Gmail account
3. Check Gmail app password is 16 characters (remove spaces)
4. Check backend logs for SMTP errors: `./mvnw spring-boot:run -X`

### Frontend can't reach backend
1. Check `VITE_API_URL` matches backend URL
2. Verify backend `CORS_ORIGIN` allows frontend domain
3. Check backend is running: `curl http://localhost:8080/api/health`

### Cal.com calendar not loading
1. Verify Cal.com username is correct
2. Check calendar link is public/accessible
3. Verify iframe isn't blocked by browser CSP

### Build errors
- Delete `node_modules` and `package-lock.json`, then `npm install`
- Clear Maven cache: `./mvnw clean`
- Check Node version: `node --version` (should be 16+)
- Check Java version: `java -version` (should be 17+)

## Maintenance

### Regular Updates
- Update npm dependencies: `npm update` in frontend/
- Update Maven dependencies: Review `pom.xml`
- Review and update project descriptions quarterly

### Monitoring
- Monitor Vercel analytics for traffic
- Check Render logs for backend errors
- Use UptimeRobot to track uptime
- Monitor Gmail for support emails

## License

Personal use only. All code created for Pranav Kumar's portfolio.

## Support

For questions or issues:
- Email: kpranav715@gmail.com
- GitHub: https://github.com/Zetsubo0o
- LinkedIn: https://linkedin.com/in/pranav-kumar15
