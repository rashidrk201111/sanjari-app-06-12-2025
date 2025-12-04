# Sanjari Prints - Google Cloud Deployment Guide

Complete guide to deploy Sanjari Prints website to Google Cloud Platform using Docker and Cloud Run.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Environment Configuration](#environment-configuration)
4. [Local Testing](#local-testing)
5. [Google Cloud Deployment](#google-cloud-deployment)
6. [CI/CD Setup](#cicd-setup)
7. [Custom Domain Setup](#custom-domain-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
1. **Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop
   - Install and ensure Docker is running

2. **Google Cloud SDK (gcloud CLI)**
   - Download: https://cloud.google.com/sdk/docs/install
   - Install and verify: `gcloud --version`

3. **Google Cloud Account**
   - Create account: https://console.cloud.google.com/
   - Create a new project or use existing one
   - Enable billing for the project

---

## Initial Setup

### Step 1: Install Google Cloud SDK

1. Download the Google Cloud SDK installer for Windows
2. Run the installer and follow the installation wizard
3. Open a new Command Prompt and verify installation:
   ```batch
   gcloud --version
   ```

### Step 2: Run Setup Script

1. Open Command Prompt in your project directory
2. Run the setup script:
   ```batch
   setup-gcloud.bat
   ```

This script will:
- Authenticate you with Google Cloud
- Set up your project
- Enable required APIs (Cloud Run, Container Registry, Cloud Build)
- Configure Docker authentication
- Set default region

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```batch
   copy .env.example .env
   ```

2. Edit `.env` file with your actual values:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

   # Payment Gateway - Razorpay
   VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id

   # Payment Gateway - PhonePe
   VITE_PHONEPE_MERCHANT_ID=your-phonepe-merchant-id

   # Application Configuration
   VITE_APP_URL=https://your-domain.com

   # Google Cloud Configuration
   GCP_PROJECT_ID=your-gcp-project-id
   GCP_REGION=asia-south1
   GCP_SERVICE_NAME=sanjari-prints
   ```

---

## Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `VITE_RAZORPAY_KEY_ID` | Razorpay API key ID | `rzp_test_1234567890` |
| `VITE_PHONEPE_MERCHANT_ID` | PhonePe merchant ID | `M1234567890` |
| `VITE_APP_URL` | Your application URL | `https://sanjariprints.com` |
| `GCP_PROJECT_ID` | Google Cloud project ID | `sanjari-prints-prod` |
| `GCP_REGION` | Google Cloud region | `asia-south1` |

### Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the Project URL and anon public key
4. Update `.env` file with these values

### Payment Gateway Configuration

#### Razorpay
1. Go to Razorpay Dashboard
2. Navigate to Settings → API Keys
3. Copy the Key ID
4. Update `.env` file

#### PhonePe
1. Go to PhonePe Dashboard
2. Copy your Merchant ID
3. Update `.env` file

**Note:** Payment gateway secrets (Razorpay Key Secret, PhonePe Salt Key) should be stored in Supabase Edge Function secrets, not in `.env` file.

---

## Local Testing

### Build and Test Locally

1. **Build Docker Image**
   ```batch
   build.bat
   ```
   This creates a Docker image tagged with your GCP project ID.

2. **Run Container Locally**
   ```batch
   local-test.bat
   ```
   This will:
   - Start the container on port 8080
   - Open http://localhost:8080 in your browser
   - Display container logs

3. **Using Docker Compose** (Alternative)
   ```batch
   docker-compose up
   ```
   Access the application at http://localhost:8080

4. **Stop Local Container**
   ```batch
   docker stop sanjari-prints-local
   docker rm sanjari-prints-local
   ```

### View Container Logs
```batch
docker logs -f sanjari-prints-local
```

---

## Google Cloud Deployment

### Method 1: Using Deployment Script (Recommended)

Run the automated deployment script:
```batch
deploy.bat
```

This script will:
1. Build the Docker image
2. Configure Docker authentication
3. Push image to Google Container Registry
4. Deploy to Google Cloud Run
5. Display the service URL

### Method 2: Manual Deployment

1. **Build Docker Image**
   ```batch
   docker build -t gcr.io/YOUR_PROJECT_ID/sanjari-prints:latest .
   ```

2. **Push to Container Registry**
   ```batch
   docker push gcr.io/YOUR_PROJECT_ID/sanjari-prints:latest
   ```

3. **Deploy to Cloud Run**
   ```batch
   gcloud run deploy sanjari-prints ^
       --image gcr.io/YOUR_PROJECT_ID/sanjari-prints:latest ^
       --platform managed ^
       --region asia-south1 ^
       --allow-unauthenticated ^
       --port 8080 ^
       --memory 512Mi ^
       --cpu 1 ^
       --set-env-vars "VITE_SUPABASE_URL=...,VITE_SUPABASE_ANON_KEY=..."
   ```

### Get Service URL
```batch
gcloud run services describe sanjari-prints --region asia-south1 --format="value(status.url)"
```

---

## CI/CD Setup

### Automated Deployment with Cloud Build

1. **Connect Repository to Cloud Build**
   - Go to Cloud Build → Triggers
   - Click "Connect Repository"
   - Follow the wizard to connect your GitHub/Bitbucket repository

2. **Create Build Trigger**
   - Click "Create Trigger"
   - Name: `sanjari-prints-deploy`
   - Event: Push to branch
   - Branch: `^main$` (or your production branch)
   - Configuration: Cloud Build configuration file
   - Location: `/cloudbuild.yaml`

3. **Configure Substitution Variables**
   - Edit your trigger
   - Add substitution variables:
     - `_REGION`: `asia-south1`
     - `_VITE_SUPABASE_URL`: Your Supabase URL
     - `_VITE_SUPABASE_ANON_KEY`: Your Supabase key
     - `_VITE_RAZORPAY_KEY_ID`: Your Razorpay key
     - `_VITE_PHONEPE_MERCHANT_ID`: Your PhonePe merchant ID
     - `_VITE_APP_URL`: Your application URL

4. **Test Trigger**
   - Push code to your repository
   - Cloud Build will automatically build and deploy

### Manual Cloud Build
```batch
gcloud builds submit --config cloudbuild.yaml
```

---

## Custom Domain Setup

### Step 1: Add Custom Domain in Cloud Run

1. Go to Cloud Run console
2. Select your service (`sanjari-prints`)
3. Click on "Manage Custom Domains"
4. Click "Add Mapping"
5. Select your service
6. Enter your domain (e.g., `sanjariprints.com` and `www.sanjariprints.com`)

### Step 2: Configure DNS Records

Add these DNS records to your domain provider:

For **root domain** (sanjariprints.com):
- Type: `A`
- Name: `@`
- Value: [IP provided by Cloud Run]

For **www subdomain**:
- Type: `CNAME`
- Name: `www`
- Value: `ghs.googlehosted.com`

### Step 3: Verify Domain

1. Cloud Run will provide verification records
2. Add the TXT record to your DNS
3. Wait for verification (can take up to 48 hours)

### Step 4: Enable HTTPS

Cloud Run automatically provisions SSL certificates for custom domains.
- Wait 15-20 minutes after DNS propagation
- Certificate will be auto-renewed

---

## Monitoring and Logs

### View Application Logs
```batch
gcloud run services logs read sanjari-prints --region asia-south1
```

### View Logs in Console
1. Go to Cloud Run console
2. Select your service
3. Click on "Logs" tab

### Set Up Monitoring
1. Go to Cloud Monitoring
2. Create dashboards for:
   - Request count
   - Response time
   - Error rate
   - Memory usage

---

## Scaling Configuration

### Auto-scaling Settings

Edit in `deploy.bat` or Cloud Run console:

```batch
--min-instances 0           # Minimum instances (0 = scale to zero)
--max-instances 10          # Maximum instances
--memory 512Mi              # Memory per instance
--cpu 1                     # CPU per instance
--concurrency 80            # Requests per instance
```

### Cost Optimization
- Set `min-instances` to 0 for scale-to-zero
- Use `asia-south1` region for lowest latency in India
- Monitor usage in Billing dashboard

---

## Troubleshooting

### Common Issues

#### 1. Docker Build Fails
**Problem:** Build fails with npm errors

**Solution:**
```batch
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s /q node_modules
npm install

# Try building again
build.bat
```

#### 2. Authentication Errors
**Problem:** `gcloud auth` errors

**Solution:**
```batch
# Re-authenticate
gcloud auth login

# Configure Docker again
gcloud auth configure-docker

# Verify authentication
gcloud auth list
```

#### 3. Deployment Fails
**Problem:** Cloud Run deployment fails

**Solution:**
```batch
# Check if APIs are enabled
gcloud services list --enabled

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Check project configuration
gcloud config list

# Try deploying again
deploy.bat
```

#### 4. Container Doesn't Start
**Problem:** Container exits immediately

**Solution:**
```batch
# Check container logs
docker logs sanjari-prints-local

# Run container in interactive mode
docker run -it --rm gcr.io/YOUR_PROJECT_ID/sanjari-prints:latest sh

# Check if port 8080 is available
netstat -an | findstr 8080
```

#### 5. Environment Variables Not Working
**Problem:** App can't connect to Supabase/payment gateways

**Solution:**
- Verify `.env` file exists and has correct values
- Check environment variables in Cloud Run:
  ```batch
  gcloud run services describe sanjari-prints --region asia-south1
  ```
- Update environment variables:
  ```batch
  gcloud run services update sanjari-prints ^
      --set-env-vars "VITE_SUPABASE_URL=..." ^
      --region asia-south1
  ```

#### 6. DNS Not Resolving
**Problem:** Custom domain not working

**Solution:**
- Verify DNS records using `nslookup`:
  ```batch
  nslookup sanjariprints.com
  ```
- Check DNS propagation: https://www.whatsmydns.net/
- Wait 24-48 hours for full propagation
- Verify SSL certificate status in Cloud Run console

---

## Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables are configured in `.env`
- [ ] Supabase database schema is deployed
- [ ] Supabase Edge Functions are deployed
- [ ] Payment gateway credentials are configured
- [ ] Google OAuth is set up
- [ ] Docker image builds successfully
- [ ] Application runs correctly locally
- [ ] All tests pass
- [ ] Custom domain is configured
- [ ] SSL certificate is active
- [ ] Monitoring is set up
- [ ] Backup strategy is in place

---

## Maintenance

### Update Application

1. Make code changes
2. Build new image:
   ```batch
   build.bat
   ```
3. Deploy:
   ```batch
   deploy.bat
   ```

### Rollback Deployment

```batch
# List revisions
gcloud run revisions list --service sanjari-prints --region asia-south1

# Rollback to previous revision
gcloud run services update-traffic sanjari-prints ^
    --to-revisions REVISION_NAME=100 ^
    --region asia-south1
```

### View Deployment History

```batch
gcloud run revisions list --service sanjari-prints --region asia-south1
```

---

## Cost Estimation

### Google Cloud Run Pricing (as of 2024)

**Free Tier:**
- 2 million requests per month
- 360,000 GB-seconds of memory
- 180,000 vCPU-seconds

**Estimated Monthly Cost** (after free tier):
- Small traffic (10K requests/month): ₹0-100
- Medium traffic (100K requests/month): ₹500-1000
- Large traffic (1M requests/month): ₹3000-5000

**Additional Costs:**
- Cloud Storage: ~₹50-200/month
- Cloud Build: Free tier covers most usage
- Container Registry: ~₹50-100/month

---

## Support and Resources

### Documentation
- Google Cloud Run: https://cloud.google.com/run/docs
- Docker: https://docs.docker.com/
- Supabase: https://supabase.com/docs

### Helpful Commands

```batch
# View service details
gcloud run services describe sanjari-prints --region asia-south1

# List all services
gcloud run services list

# View logs
gcloud run services logs read sanjari-prints --region asia-south1 --limit 50

# Delete service
gcloud run services delete sanjari-prints --region asia-south1

# List container images
gcloud container images list --repository=gcr.io/YOUR_PROJECT_ID
```

---

## Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use Secret Manager** for sensitive data (optional):
   ```batch
   gcloud secrets create razorpay-secret --data-file=-
   ```
3. **Enable Cloud Armor** for DDoS protection
4. **Set up Cloud IAM** with least privilege access
5. **Regular security updates** - Rebuild images monthly
6. **Monitor for vulnerabilities** - Use Container Analysis

---

## Contact

For issues with Sanjari Prints:
- Phone: +91 7350001266 / 9323684301
- Email: sanjariprint@gmail.com

For Google Cloud support:
- Cloud Console: https://console.cloud.google.com/support
- Documentation: https://cloud.google.com/docs

---

**Last Updated:** November 2024
**Version:** 1.0.0
