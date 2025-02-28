# AI Roast Me App

A full-stack application that generates humorous AI-powered roasts based on user input. Users can get free basic roasts or pay for premium "spicier" roasts using Stripe integration.

## Features

- AI-generated roasts using OpenAI's GPT
- User input for name and optional photo upload
- Free basic roasts and premium paid roasts
- Social media sharing
- Stripe payment integration
- MongoDB for tracking roast requests

## Tech Stack

### Backend
- Node.js
- Express
- OpenAI API
- MongoDB (for tracking)
- Stripe (for payments)

### Frontend
- React (Vite)
- Axios for API calls
- TailwindCSS for styling

### Deployment
- Vercel (frontend)
- Render/Fly.io (backend)
- MongoDB Atlas

## Project Structure

```
roastme-app/
├── backend/  # Express API
│   ├── index.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── .env
│   ├── package.json
├── frontend/  # React App
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── package.json
├── package.json (root, for running both frontend/backend together)
├── README.md
```

## Setup Instructions

1. Clone the repository
   ```
   git clone https://github.com/yourusername/roastme-app.git
   cd roastme-app
   ```

2. Install dependencies
   ```
   npm run install:all
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     OPENAI_API_KEY=your_openai_api_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
     FRONTEND_URL=http://localhost:5173
     ```

4. Start the development servers
   ```
   npm start
   ```

5. Access the application
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend`
3. Set the build command to `npm run build`
4. Set the output directory to `dist`

### Backend (Render/Fly.io)
1. Connect your GitHub repository
2. Set the root directory to `backend`
3. Set the build command to `npm install`
4. Set the start command to `npm start`
5. Add the environment variables from your `.env` file

## License

MIT