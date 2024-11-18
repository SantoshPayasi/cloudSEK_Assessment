# CloudSEK Assessment Project

## Overview
This full-stack application, developed for the CloudSEK assessment, combines a ReactJS frontend with an Express.js backend, utilizing MongoDB as the database.  

Note: Added mongoURI and uploaded in github for reference and easy to setup .

## Live URLs
- Frontend: [https://cloud-sek-assessment-frontend.vercel.app](https://cloud-sek-assessment-frontend.vercel.app)
- Backend: [https://cloud-sek-assessment-backend.vercel.app](https://cloud-sek-assessment-backend.vercel.app)

## Technology Stack
- Frontend: ReactJS
- Backend: Express.js
- Database: MongoDB

## Project Structure

### Backend Structure
```
backend/
├── node_modules/
├── src/
│   ├── config/         # Database connection and other configurations
│   ├── controller/     # Request handlers
│   ├── middleware/     # Custom middleware functions
│   ├── models/         # Database models
│   ├── repository/     # Database operations
│   ├── routes/         # API routes
│   │   ├── customRoutes/
│   │   └── main.route.js
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── app.js          # Express application setup
│   └── constants.js    # Application constants
├── .env
├── .gitignore
├── index.js            # Entry point of the application
├── package-lock.json
├── package.json
└── vercel.json
```

### Frontend Structure
```
frontend-post-management/
├── node_modules/
├── public/
├── src/
│   ├── api/            # API call functions
│   ├── components/     # Reusable React components
│   ├── config/         # Axios configurations
│   ├── pages/          # Main application pages
│   ├── utils/          # Utility functions (e.g., statusCodeUtility)
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/SantoshPayasi/cloudSEK_Assessment.git
   cd cloudSEK_Assessment
   ```

2. Setup Backend:
   ```
   cd backend
   npm install
   ```

3. Setup Frontend:
   ```
   cd ../frontend-post-management
   npm install
   ```

4. Configuration:
   - Backend: Check `constants.js` file and ensure the origin is set to "\*" or "http://localhost:3000"
   - Frontend: In the `.env` file, verify that `REACT_APP_BACKEND_URL` is set to "http://localhost:3001"

5. Running the application:
   - Start the backend server:
     ```
     cd backend
     npm run start
     ```
   - Start the frontend application:
     ```
     cd frontend-post-management
     npm run start
     ```

## Important Notes
- Ensure that the backend server is running on port 3001 as the frontend is configured to communicate with this port by default.
- The backend entry file is `index.js` outside the `src` folder.
- In the backend:
  - `app.js` contains the Express application setup.
  - Controllers are in the `controller` folder.
  - Business logic is in the `services` folder.
  - Database operations are in the `repository` folder.
  - Database connection and other configurations are in the `config` folder.
  - Utility functions are in the `utils` folder.
  - Constants are defined in `constants.js`.
- In the frontend:
  - Main pages are in the `pages` folder.
  - Reusable components are in the `components` folder.
  - Utility functions (like statusCodeUtility) are in the `utils` folder.
  - Axios configurations are in the `config` folder.
  - API calls are in the `api` folder.

## Contributing
For any contributions or issues, please open an issue or submit a pull request on the GitHub repository.

