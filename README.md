# CloudSEK Assessment Project 🚀

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

## 📖 Overview

This full-stack application, developed for the CloudSEK assessment, combines a ReactJS frontend with an Express.js backend, utilizing MongoDB as the database.

> **Note:** MongoDB URI is included in the `.env` files, which are uploaded to GitHub for reference and easy setup.

## 🌐 Live URLs

- Frontend: [![https://cloud-sek-assessment-frontend.vercel.app]](https://cloud-sek-assessment-frontend.vercel.app)
- Backend: [![https://cloud-sek-assessment-backend.vercel.app]](https://cloud-sek-assessment-backend.vercel.app)

## 🛠️ Technology Stack

- Frontend: ReactJS, react-router-dom
- Backend: Express.js
- Database: MongoDB

## 🗂️ Project Structure

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

## 🚀 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SantoshPayasi/cloudSEK_Assessment.git
   cd cloudSEK_Assessment
   ```

2. Setup Backend:
   ```bash
   cd backend
   npm install
   ```

3. Setup Frontend:
   ```bash
   cd ../frontend-post-management
   npm install
   ```

4. Configuration:
   - Backend: Check `constants.js` file and ensure the origin is set to "*" or "http://localhost:3000"
   - Frontend: In the `.env` file, verify that `REACT_APP_BACKEND_URL` is set to "http://localhost:3001"

5. Running the application:
   - Start the backend server:
     ```bash
     cd backend
     npm run start
     ```
   - Start the frontend application:
     ```bash
     cd frontend-post-management
     npm run start
     ```

## ⚠️ Important Notes

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

## 📝 Text Styling Feature Guide

The frontend includes a rich text editing feature for comments and posts. Here's how to use it:

1. **Selecting Text**: 
   - Highlight the portion of text in a comment or post that you want to style.

2. **Applying Styles**:
   - Click on the desired styling icon in the toolbar.
   - Available styles include bold, italic, hyperlink.
   - If a style is already applied, clicking its icon will remove that style.

3. **Creating Hyperlinks**:
   - Select the text you want to turn into a link.
   - Click the link icon in the toolbar.
   - In the popup, enter the target URL for the link.
   - Confirm to apply the hyperlink to the selected text.

4. **Removing Styles**:
   - To remove a style, select the styled text and click the corresponding style icon again.

> **Note:** This feature enhances the visual appeal and functionality of your comments and posts, allowing for more expressive and informative content.

## 🤝 Contributing

For any contributions or issues, please open an issue or submit a pull request on the GitHub repository.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

---

[![Made with ❤️ by Santosh Payasi](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20by-Santosh%20Payasi-red.svg)](https://github.com/SantoshPayasi)
