# Deployment Guide for Job Board Application

This guide provides step-by-step instructions for deploying the Job Board application to production.

## Deploying the Backend (Server) to Render

1. **Create a MongoDB Atlas Cluster**
   - Sign up for MongoDB Atlas at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster (the free tier is sufficient for starting out)
   - Set up a database user with a secure password
   - Configure network access to allow connections from anywhere (for Render)
   - Get your MongoDB connection string, which will look like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobboard?retryWrites=true&w=majority`

2. **Deploy to Render**
   - Sign up for Render at [https://render.com](https://render.com)
   - Click "New+" and select "Web Service"
   - Connect your GitHub repository
   - Choose the repository and select the server directory (`/server`)
   - Configure your service with:
     - Name: `job-board-api`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add the following environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `8080` (Render assigned port)
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string for JWT token encryption
   - Click "Create Web Service"

3. **Verify Deployment**
   - Once deployed, test your API by visiting the URL provided by Render
   - Example: `https://job-board-api.onrender.com/api/jobs`

## Deploying the Frontend (Client) to Netlify

1. **Configure Environment Variables**
   - Make sure you've updated the `.env.production` file with the correct backend URL
   - Example: `REACT_APP_API_URL=https://job-board-api.onrender.com/api`

2. **Deploy to Netlify**
   - Sign up for Netlify at [https://www.netlify.com](https://www.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure your deployment with:
     - Base directory: `client`
     - Build command: `npm run build`
     - Publish directory: `build`
   - Add the following environment variable:
     - `REACT_APP_API_URL`: Your backend API URL
   - Click "Deploy site"

3. **Configure Redirect Rules**
   - After deployment, go to "Site configuration" → "Build & deploy" → "Continuous deployment"
   - Add the redirect rule for client-side routing (this is also in your netlify.toml file):
     - From: `/*`
     - To: `/index.html`
     - Status: `200`

4. **Verify Deployment**
   - Test your deployed application by visiting the URL provided by Netlify
   - Example: `https://job-board-application.netlify.app`

## Updating Your Deployments

### Updating Backend
- Push changes to GitHub
- Render will automatically deploy the latest changes from your repository's main branch

### Updating Frontend
- Push changes to GitHub
- Netlify will automatically deploy the latest changes from your repository's main branch

## Troubleshooting

### Backend Issues
- Check Render logs for error messages
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct and the database is accessible

### Frontend Issues
- Check Netlify build logs for errors
- Verify the API URL is correct in environment variables
- Clear browser cache to ensure you're seeing the latest version

## Custom Domain Setup (Optional)

### For Render
1. Go to your service dashboard
2. Click "Settings" → "Custom Domain"
3. Follow the instructions to add your domain

### For Netlify
1. Go to your site dashboard
2. Click "Domain Settings" → "Add custom domain"
3. Follow the instructions to add your domain 