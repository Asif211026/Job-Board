# Deploying the Job Board Frontend to Vercel

This guide will walk you through deploying the frontend of your Job Board application to Vercel.

## Prerequisites

1. A GitHub account with your Job Board repository
2. A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)
3. Your backend already deployed to Render at: https://job-board-um9x.onrender.com

## Deployment Steps

### 1. Log in to Vercel

Visit [vercel.com](https://vercel.com) and sign in with your GitHub account.

### 2. Import Your Repository

1. Click on "Add New..." → "Project"
2. Select your "Job-Board" repository from the list
3. If you don't see it, you may need to configure Vercel to access your repository:
   - Click "Adjust GitHub App Permissions"
   - Select your repository and save

### 3. Configure the Project

On the "Configure Project" screen:

1. **Project Name**: Enter a name for your project (e.g., "job-board-frontend")
2. **Framework Preset**: Select "Create React App"
3. **Root Directory**: Enter "client" (this is important since your React app is in the client folder)
4. **Build and Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Environment Variables**:
   - Click "Add" and enter the following:
     - Name: `REACT_APP_API_URL`
     - Value: `https://job-board-um9x.onrender.com/api`

### 4. Deploy

Click the "Deploy" button and wait for the deployment to complete.

### 5. Access Your Deployed Frontend

Once the deployment is successful, Vercel will provide you with a URL to access your application (e.g., `https://job-board-frontend.vercel.app`).

## Troubleshooting

If you encounter any issues:

1. **Build Errors**: Check the build logs in Vercel to see what went wrong
2. **API Connection Issues**: Ensure the `REACT_APP_API_URL` environment variable is correctly set
3. **Routing Problems**: The vercel.json file should handle client-side routing, but if you encounter 404 errors when navigating, verify the configuration

## Updating Your Application

When you push changes to the `main` branch of your GitHub repository, Vercel will automatically redeploy your application with the latest changes.

## Custom Domain (Optional)

To add a custom domain to your Vercel deployment:

1. Go to your project settings in Vercel
2. Click on "Domains"
3. Add your domain and follow the instructions to configure DNS settings 