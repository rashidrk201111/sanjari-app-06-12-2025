# Sanjari Prints - Quick Start Deployment Guide

Fast-track guide to deploy your application to Google Cloud in under 30 minutes.

## Prerequisites Checklist

- [ ] Docker Desktop installed and running
- [ ] Google Cloud SDK (gcloud) installed
- [ ] Google Cloud account with billing enabled
- [ ] Supabase project configured
- [ ] Payment gateway credentials ready

---

## 🚀 Quick Deployment Steps

### Step 1: Install Required Software (10 minutes)

1. **Install Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop
   - Install and start Docker

2. **Install Google Cloud SDK**
   - Download: https://cloud.google.com/sdk/docs/install
   - Run installer
   - Verify: Open Command Prompt and run `gcloud --version`

### Step 2: Google Cloud Setup (5 minutes)

Run the setup script in your project directory:

```batch
setup-gcloud.bat
```

Follow the prompts:
- Login to Google Cloud (browser will open)
- Enter your Project ID (or create new project in console)
- Select region: `asia-south1` (Mumbai - recommended for India)

### Step 3: Configure Environment (3 minutes)

1. Copy environment template:
   ```batch
   copy .env.example .env
   ```

2. Edit `.env` file with your credentials:
   ```env
   # Supabase (from Supabase Dashboard → Settings → API)
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...

   # Razorpay (from Razorpay Dashboard → Settings → API Keys)
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx

   # PhonePe (from PhonePe Dashboard)
   VITE_PHONEPE_MERCHANT_ID=Mxxxxx

   # Your domain
   VITE_APP_URL=https://sanjariprints.com

   # Google Cloud (set by setup-gcloud.bat)
   GCP_PROJECT_ID=your-project-id
   GCP_REGION=asia-south1
   ```

### Step 4: Test Locally (5 minutes)

Build and run locally to verify everything works:

```batch
local-test.bat
```

This will:
- Build the Docker image
- Start container on http://localhost:8080
- Open in your browser

Test the application:
- [ ] Homepage loads
- [ ] Products display
- [ ] Cart functionality
- [ ] Login works
- [ ] Admin panel accessible

Stop the container when done:
```batch
stop-local.bat
```

### Step 5: Deploy to Cloud (5 minutes)

Deploy to Google Cloud Run:

```batch
deploy.bat
```

This will:
- Build Docker image
- Push to Google Container Registry
- Deploy to Cloud Run
- Display your live URL

**Note:** First deployment takes 5-10 minutes. Subsequent deployments are faster (2-3 minutes).

### Step 6: Verify Deployment (2 minutes)

1. Open the URL provided by the deploy script
2. Test main functionality:
   - [ ] Site loads correctly
   - [ ] Products display
   - [ ] User can add to cart
   - [ ] Login/registration works
   - [ ] Admin panel works

---

## 🔧 Useful Commands

### View Application Logs
```batch
logs.bat
```

### Rebuild and Redeploy
```batch
deploy.bat
```

### Stop Local Container
```batch
stop-local.bat
```

### Get Service URL
```batch
gcloud run services describe sanjari-prints --region asia-south1 --format="value(status.url)"
```

---

## 🌐 Custom Domain Setup (Optional)

### Quick Steps:

1. **In Google Cloud Console:**
   - Go to Cloud Run → Select service → Manage Custom Domains
   - Add your domain: `sanjariprints.com`

2. **In Your DNS Provider:**
   Add these records:
   ```
   Type: A
   Name: @
   Value: [IP from Cloud Run]

   Type: CNAME
   Name: www
   Value: ghs.googlehosted.com
   ```

3. **Wait for DNS propagation** (15 minutes to 48 hours)

4. **Update .env file:**
   ```env
   VITE_APP_URL=https://sanjariprints.com
   ```

5. **Redeploy:**
   ```batch
   deploy.bat
   ```

---

## 📊 Cost Estimate

**Free Tier Includes:**
- 2 million requests/month
- 360,000 GB-seconds memory
- 180,000 vCPU-seconds

**Typical Small Business Costs:**
- 10,000 requests/month: ~₹0-100
- 50,000 requests/month: ~₹200-500
- 100,000 requests/month: ~₹500-1,000

**Tips to Reduce Costs:**
- Use scale-to-zero (min-instances: 0)
- Optimize images and assets
- Enable Cloud CDN

---

## ❗ Troubleshooting

### Build Fails
```batch
# Clear cache and rebuild
npm cache clean --force
rmdir /s /q node_modules
npm install
build.bat
```

### Authentication Issues
```batch
# Re-authenticate
gcloud auth login
gcloud auth configure-docker
```

### Environment Variables Not Working
```batch
# Verify env vars in Cloud Run
gcloud run services describe sanjari-prints --region asia-south1

# Update env vars
gcloud run services update sanjari-prints ^
    --set-env-vars "VITE_SUPABASE_URL=..." ^
    --region asia-south1
```

### Port Already in Use (Local Testing)
```batch
# Stop the container
stop-local.bat

# Or kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID [process_id] /F
```

---

## 📋 Pre-Deployment Checklist

Before deploying to production:

### Application
- [ ] All environment variables configured
- [ ] Supabase database schema deployed
- [ ] Supabase Edge Functions deployed
- [ ] Google OAuth configured
- [ ] Payment gateways tested

### Testing
- [ ] Application runs locally
- [ ] All pages load correctly
- [ ] Cart and checkout work
- [ ] User authentication works
- [ ] Admin panel accessible
- [ ] Payment integration tested

### Google Cloud
- [ ] Google Cloud project created
- [ ] Billing enabled
- [ ] APIs enabled (Run, Container Registry, Build)
- [ ] Service account configured
- [ ] Region selected (asia-south1)

### DNS (if using custom domain)
- [ ] Domain purchased
- [ ] DNS records ready to update
- [ ] SSL certificate will auto-provision

---

## 🎯 Next Steps After Deployment

1. **Monitor Performance**
   - Check Cloud Run metrics
   - Set up alerts for errors
   - Monitor costs in billing dashboard

2. **Set Up CI/CD**
   - Connect repository to Cloud Build
   - Configure automatic deployments
   - See DEPLOYMENT.md for details

3. **Optimize**
   - Enable Cloud CDN
   - Optimize images
   - Add caching headers

4. **Security**
   - Review IAM permissions
   - Enable Cloud Armor (optional)
   - Set up regular backups

5. **Marketing**
   - Configure Google Analytics
   - Set up SEO
   - Submit sitemap to Google

---

## 📞 Support

**Sanjari Prints:**
- Phone: +91 7350001266 / 9323684301
- Email: sanjariprint@gmail.com

**Google Cloud Support:**
- Console: https://console.cloud.google.com/support
- Documentation: https://cloud.google.com/run/docs

---

## 🎉 Success!

You've successfully deployed Sanjari Prints to Google Cloud!

**Your application is now:**
- ✅ Running on Google Cloud Run
- ✅ Auto-scaling based on traffic
- ✅ Secured with HTTPS
- ✅ Monitored and logged
- ✅ Ready for production traffic

**Next:** Share your URL and start accepting orders! 🚀
