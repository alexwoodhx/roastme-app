# AI Roast Me App

A fun application that generates humorous roasts using AI.

## Live Demo

Check out the live demo at [https://alexwoodhx.github.io/roastme-app/](https://alexwoodhx.github.io/roastme-app/)

## Features

- Generate basic roasts for free
- Premium roasts with more personalized content (coming soon)
- Upload a photo for even more personalized roasts (coming soon)

## Technical Details

### Frontend

- React.js with Vite
- Deployed on GitHub Pages
- Responsive design for mobile and desktop

### Backend

- Node.js with Express
- MongoDB for data storage
- OpenAI API for generating roasts
- Stripe for payment processing
- Deployed on Render

## Development Status

- **Frontend**: Fully deployed on GitHub Pages
- **Backend**: Deployed on Render
- **Current Limitation**: The GitHub Pages deployment currently uses mock data due to CORS restrictions between GitHub Pages and the Render backend. The full functionality with real AI-generated roasts is available when running locally.

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables in `backend/.env`
4. Start the backend:
   ```
   cd backend && npm start
   ```
5. Start the frontend:
   ```
   cd frontend && npm run dev
   ```
6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Future Improvements

- Resolve CORS issues between GitHub Pages and Render backend
- Implement premium roast features
- Add photo upload functionality
- Enhance UI/UX with animations and transitions