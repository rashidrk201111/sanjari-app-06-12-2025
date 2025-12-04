# 🚀 Sanjari Prints - Deployment Checklist

## ✅ All Deployment Files Status

### 📦 Docker Configuration Files
- ✅ **Dockerfile** - Multi-stage build for production
- ✅ **nginx.conf** - Nginx web server configuration
- ✅ **.dockerignore** - Excludes unnecessary files from Docker image
- ✅ **docker-compose.yml** - For local testing

### 🔧 Windows Batch Scripts
- ✅ **setup-gcloud.bat** - One-time Google Cloud setup
- ✅ **build.bat** - Build Docker image
- ✅ **deploy.bat** - Deploy to Google Cloud Run
- ✅ **local-test.bat** - Test Docker container locally
- ✅ **stop-local.bat** - Stop local container
- ✅ **logs.bat** - View application logs

### ⚙️ Configuration Files
- ✅ **.env.example** - Environment variables template
- ✅ **.gitignore** - Git ignore rules
- ✅ **cloudbuild.yaml** - CI/CD configuration

### 📖 Documentation
- ✅ **DEPLOYMENT.md** - Comprehensive deployment guide
- ✅ **QUICK-START.md** - 30-minute quick start guide
- ✅ **DEPLOYMENT-CHECKLIST.md** - This file

---

## 🎯 Pre-Deployment Steps

### Step 1: Install Prerequisites ✅
- [ ] Docker Desktop installed and running
- [ ] Google Cloud SDK (gcloud CLI) installed
- [ ] Verified installations:
  ```batch
  docker --version
  gcloud --version
  ```

### Step 2: Google Cloud Setup ✅
- [ ] Run `setup-gcloud.bat`
- [ ] Logged in to Google Cloud
- [ ] Project ID configured
- [ ] Region set (recommended: asia-south1)
- [ ] Required APIs enabled:
  - Cloud Run API
  - Container Registry API
  - Cloud Build API

### Step 3: Environment Configuration ✅
- [ ] Created `.env` file from `.env.example`
- [ ] Configured all required variables:

#### Supabase Settings
- [ ] `VITE_SUPABASE_URL` = Your Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` = Your Supabase anonymous key

#### Payment Gateway Settings
- [ ] `VITE_RAZORPAY_KEY_ID` = Your Razorpay key ID
- [ ] `VITE_PHONEPE_MERCHANT_ID` = Your PhonePe merchant ID

#### Application Settings
- [ ] `VITE_APP_URL` = Your domain URL
- [ ] `NODE_ENV` = production

#### Google Cloud Settings
- [ ] `GCP_PROJECT_ID` = Your Google Cloud project ID
- [ ] `GCP_REGION` = Your preferred region (e.g., asia-south1)
- [ ] `GCP_SERVICE_NAME` = sanjari-prints
- [ ] `DOCKER_IMAGE_TAG` = latest

### Step 4: Backend Configuration ✅
- [ ] Supabase database schema deployed
- [ ] Supabase Edge Functions deployed
- [ ] Payment gateway webhooks configured
- [ ] Google OAuth credentials configured

### Step 5: Local Testing ✅
- [ ] Run `local-test.bat`
- [ ] Application opens at http://localhost:8080
- [ ] Test all features:
  - [ ] Homepage loads
  - [ ] Products display correctly
  - [ ] Cart functionality works
  - [ ] User login/registration works
  - [ ] Admin panel accessible
  - [ ] Price calculator works
  - [ ] Bulk order form works

---

## 🚀 Deployment Process

### Option 1: Automated Deployment (Recommended)

Simply run:
```batch
deploy.bat
```

This will automatically:
1. Build Docker image
2. Push to Google Container Registry
3. Deploy to Google Cloud Run
4. Display your live URL

**Time:** 5-10 minutes (first deployment)

### Option 2: Manual Deployment

If you prefer manual control:

1. **Build:**
   ```batch
   build.bat
   ```

2. **Test locally:**
   ```batch
   local-test.bat
   ```

3. **Deploy:**
   ```batch
   deploy.bat
   ```

---

## 🔍 Post-Deployment Verification

### Verify Deployment Success ✅
- [ ] Deployment script completed without errors
- [ ] Service URL displayed
- [ ] Application accessible at the URL

### Test Production Application ✅
- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Products load from Supabase
- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Payment gateways work (test mode)
- [ ] Admin login works
- [ ] Admin dashboard functional

### Check Google Cloud Console ✅
- [ ] Service visible in Cloud Run
- [ ] Service status: Healthy
- [ ] Logs show no errors
- [ ] Custom domain mapped (if applicable)
- [ ] SSL certificate active

---

## 🌐 Custom Domain Setup (Optional)

### In Google Cloud Run ✅
- [ ] Navigate to Cloud Run → sanjari-prints
- [ ] Click "Manage Custom Domains"
- [ ] Add domain: sanjariprints.com
- [ ] Add www subdomain: www.sanjariprints.com

### In DNS Provider ✅
- [ ] Add A record for root domain
- [ ] Add CNAME record for www subdomain
- [ ] Add verification TXT record
- [ ] Wait for DNS propagation (24-48 hours)

### Update Configuration ✅
- [ ] Update `VITE_APP_URL` in `.env`
- [ ] Redeploy with `deploy.bat`
- [ ] Update Supabase OAuth redirect URLs
- [ ] Update payment gateway webhook URLs

---

## 📊 Monitoring Setup

### Enable Monitoring ✅
- [ ] Access Cloud Monitoring dashboard
- [ ] Set up uptime checks
- [ ] Configure error alerts
- [ ] Set up billing alerts

### View Logs ✅
```batch
logs.bat
```
Then select option 2 for Cloud Run logs

### Monitor Key Metrics ✅
- [ ] Request count
- [ ] Response time
- [ ] Error rate
- [ ] Memory usage
- [ ] CPU usage
- [ ] Cost

---

## 🔄 CI/CD Setup (Optional)

### Connect Repository ✅
- [ ] Go to Cloud Build → Triggers
- [ ] Connect GitHub/Bitbucket repository
- [ ] Create build trigger
- [ ] Configure `cloudbuild.yaml`
- [ ] Set substitution variables
- [ ] Test automatic deployment

---

## 🛠️ Troubleshooting

### If Build Fails
```batch
npm cache clean --force
rmdir /s /q node_modules
npm install
build.bat
```

### If Deployment Fails
```batch
# Re-authenticate
gcloud auth login
gcloud auth configure-docker

# Verify project
gcloud config list

# Try again
deploy.bat
```

### If Application Doesn't Start
```batch
# Check logs
logs.bat

# View container logs locally
docker logs sanjari-prints-local
```

### If Environment Variables Missing
```batch
# Update Cloud Run env vars
gcloud run services update sanjari-prints ^
    --set-env-vars "VITE_SUPABASE_URL=...,VITE_SUPABASE_ANON_KEY=..." ^
    --region asia-south1
```

---

## 📱 Quick Commands Reference

### Deployment
```batch
setup-gcloud.bat      # Initial setup (one-time)
build.bat             # Build Docker image
local-test.bat        # Test locally
deploy.bat            # Deploy to Cloud Run
```

### Management
```batch
logs.bat              # View logs
stop-local.bat        # Stop local container
```

### Google Cloud CLI
```batch
# Get service URL
gcloud run services describe sanjari-prints --region asia-south1 --format="value(status.url)"

# View service details
gcloud run services describe sanjari-prints --region asia-south1

# List all services
gcloud run services list

# View logs
gcloud run services logs read sanjari-prints --region asia-south1 --limit 50

# Update environment variables
gcloud run services update sanjari-prints --set-env-vars "KEY=VALUE" --region asia-south1
```

---

## 💰 Cost Optimization

### Free Tier
- 2 million requests/month
- 360,000 GB-seconds memory
- 180,000 vCPU-seconds

### Optimization Tips
- ✅ Min instances set to 0 (scale to zero)
- ✅ Memory: 512Mi (adjust if needed)
- ✅ CPU: 1 (adjust if needed)
- ✅ Region: asia-south1 (closest to India)

### Monitor Costs
- [ ] Check billing dashboard regularly
- [ ] Set up billing alerts
- [ ] Review usage patterns
- [ ] Optimize if costs increase

---

## 📞 Support Contacts

**Sanjari Prints:**
- Phone: +91 7350001266 / 9323684301
- Email: sanjariprint@gmail.com

**Google Cloud Support:**
- Console: https://console.cloud.google.com/support
- Documentation: https://cloud.google.com/run/docs

**Technical Documentation:**
- Deployment Guide: `/DEPLOYMENT.md`
- Quick Start: `/QUICK-START.md`
- This Checklist: `/DEPLOYMENT-CHECKLIST.md`

---

## ✨ Success Criteria

Your deployment is successful when:
- ✅ Application is live and accessible
- ✅ All features work correctly
- ✅ No errors in logs
- ✅ Monitoring is active
- ✅ Custom domain configured (if applicable)
- ✅ SSL certificate active
- ✅ Payments work in test mode
- ✅ Admin dashboard accessible

---

## 🎉 You're Ready!

All deployment files are ready. Follow the steps above to deploy your Sanjari Prints website to Google Cloud.

**Quick Start:**
1. Run `setup-gcloud.bat` (one-time)
2. Configure `.env` file
3. Run `local-test.bat` to test
4. Run `deploy.bat` to go live

**Good luck with your deployment! 🚀**
