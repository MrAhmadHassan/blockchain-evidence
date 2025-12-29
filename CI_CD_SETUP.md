# 🚀 CI/CD Setup Guide: GitHub Actions + Render Preview

## Overview
This setup provides a two-layer safety approach:
1. **GitHub Actions** - Automated tests and code quality checks
2. **Render Preview Environments** - Live preview deployments for manual verification

## 🔧 Setup Steps

### 1. GitHub Actions Configuration

#### Already Added Files:
- `.github/workflows/ci.yml` - Main CI pipeline
- `tests/app.test.js` - Basic test suite
- `.eslintrc.json` - Code quality rules
- `.prettierrc` - Code formatting rules

#### What GitHub Actions Does:
- ✅ Runs automated tests
- ✅ Security vulnerability scanning
- ✅ Code quality checks (ESLint)
- ✅ HTML validation
- ✅ Build verification

### 2. Render Preview Environments Setup

#### Step 1: Connect Repository to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `Gooichand/blockchain-evidence`

#### Step 2: Configure Main Service
```yaml
Name: evid-dgc-production
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
Plan: Free
```

#### Step 3: Enable Preview Environments
1. In Render service settings, go to "Environment"
2. Enable "Preview Environments"
3. Set "Preview Expires After": 7 days
4. Configure environment variables:
   - `NODE_ENV=staging`
   - `SUPABASE_URL=your_preview_db_url`
   - `SUPABASE_KEY=your_preview_key`

### 3. Environment Variables Setup

#### Production Environment:
```env
NODE_ENV=production
SUPABASE_URL=your_production_supabase_url
SUPABASE_KEY=your_production_supabase_key
GA_MEASUREMENT_ID=G-KEYDE0ZH4Z
```

#### Preview Environment:
```env
NODE_ENV=staging
SUPABASE_URL=your_preview_supabase_url
SUPABASE_KEY=your_preview_supabase_key
GA_MEASUREMENT_ID=G-KEYDE0ZH4Z
```

### 4. Workflow Process

#### For Pull Requests:
1. **Developer creates PR** → GitHub Actions runs automatically
2. **Tests pass** → Render creates preview environment
3. **Manual verification** on preview URL
4. **Approve & merge** → Deploys to production

#### For Direct Pushes to Main:
1. **Push to main** → GitHub Actions runs
2. **Tests pass** → Auto-deploy to production
3. **Monitor** production deployment

## 🔍 GitHub Actions Pipeline Details

### Test Stage:
- Installs dependencies
- Runs Jest tests
- Checks code formatting

### Security Stage:
- NPM audit for vulnerabilities
- TruffleHog secret scanning

### Lint Stage:
- ESLint code quality checks
- HTML validation

### Build Stage:
- Verifies project builds successfully
- Only runs if all previous stages pass

## 📱 Render Preview Features

### Automatic Preview Creation:
- Every PR gets a unique preview URL
- Format: `https://evid-dgc-preview-pr-123.onrender.com`
- Isolated database for testing

### Preview Management:
- Previews auto-expire after 7 days
- Can manually delete previews
- Full feature testing environment

## 🚦 Status Checks

### GitHub PR Status:
- ✅ Tests Passed
- ✅ Security Scan Clean
- ✅ Code Quality Good
- ✅ Build Successful
- 🔗 Preview Environment Ready

### Render Deployment Status:
- 🟢 Production: Live
- 🟡 Preview: Building
- 🔴 Failed: Check logs

## 🛠️ Local Development

### Install Dependencies:
```bash
npm install
```

### Run Tests:
```bash
npm test
npm run test:watch  # Watch mode
```

### Code Quality:
```bash
npm run lint        # Check code quality
npm run lint:fix    # Auto-fix issues
npm run format      # Format code
```

### Local Server:
```bash
npm run dev         # Backend with auto-reload
npm run frontend    # Frontend only
```

## 🔧 Troubleshooting

### GitHub Actions Failing:
1. Check workflow logs in GitHub Actions tab
2. Fix failing tests or linting issues
3. Push fixes to trigger re-run

### Render Preview Issues:
1. Check Render dashboard for build logs
2. Verify environment variables
3. Check database connectivity

### Common Fixes:
```bash
# Fix linting issues
npm run lint:fix

# Update dependencies
npm audit fix

# Clear cache
npm ci
```

## 📊 Monitoring

### GitHub Actions:
- View workflow history
- Monitor test coverage
- Track build times

### Render:
- Monitor deployment logs
- Check service health
- View preview environment usage

## 🎯 Best Practices

### Before Creating PR:
1. Run tests locally: `npm test`
2. Check code quality: `npm run lint`
3. Format code: `npm run format`
4. Test locally: `npm run dev`

### PR Review Process:
1. Wait for GitHub Actions ✅
2. Test preview environment
3. Review code changes
4. Approve and merge

### Production Deployment:
1. Monitor deployment logs
2. Verify functionality
3. Check analytics
4. Monitor error rates

This setup ensures your code is both technically correct (via automated tests) and functionally working (via preview environment) before going live! 🚀