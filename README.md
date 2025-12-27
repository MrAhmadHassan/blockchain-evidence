# 🔐 EVID-DGC - Blockchain Evidence Management System

**Minimal, production-ready blockchain evidence management system.**

## ✨ Features

- 🔒 **Blockchain Security** - Immutable evidence storage
- 💾 **Database Storage** - Supabase PostgreSQL backend
- 👥 **8 User Roles** - Complete access control
- 📱 **Modern UI** - Professional red & white theme
- 🚀 **Production Ready** - Fully functional system

## 🚀 Quick Start

1. **Setup Database**
   ```sql
   -- Run database-schema.sql in Supabase SQL Editor
   ```

2. **Start Application**
   ```bash
   cd public
   python -m http.server 8080
   # or
   npx serve .
   ```

3. **Access System**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
public/
├── index.html              # Main registration page
├── dashboard.html          # Evidence management dashboard
├── health-check.html       # System health verification
├── styles.css             # Professional styling
├── app.js                 # Main application logic
├── config.js              # System configuration
├── storage.js             # Database & evidence management
├── dashboard-manager.js   # Dashboard functionality
├── robots.txt             # SEO configuration
├── sitemap.xml            # Site map
└── _headers               # Security headers

database-schema.sql         # Database setup
render.yaml                # Deployment configuration
```

## 👥 User Roles

1. 👁️ **Public Viewer** - View public evidence
2. 🕵️ **Investigator** - Create and manage cases
3. 🔬 **Forensic Analyst** - Analyze evidence
4. ⚖️ **Legal Professional** - Legal review
5. 🏛️ **Court Official** - Court proceedings
6. 📋 **Evidence Manager** - Manage evidence lifecycle
7. 🔍 **Auditor** - System auditing
8. 👑 **Administrator** - Full system access

## 🔧 Configuration

Update `config.js`:
- Supabase URL and API key
- File upload limits
- Network settings

## 🌐 Deployment

**Render.com (Free)**
1. Connect GitHub repository
2. Deploy with `render.yaml` configuration
3. Set up Supabase database
4. System ready for production

## 💰 Cost: $0

- Supabase Database: FREE (500MB)
- Render Hosting: FREE
- All features: FREE

## 🔒 Security Features

- File validation (50MB limit, type checking)
- SHA-256 hash generation for integrity
- Input sanitization (XSS prevention)
- Role-based access control
- Activity logging and audit trails

## 📄 License

MIT License - Open source evidence management system.

---

**Built for secure, legal-compliant evidence management** ⚖️