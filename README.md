# URL Shortener

This is a full-stack URL shortener application that allows users to generate shortened URLs for long links, manage their shortened links, and track their usage statistics. Built with the PERN (PostgreSQL, Express, React, Node.js) stack, this project is designed to offer a simple and intuitive interface with a robust backend API.
## Features

- Shorten long URLs with a unique, shortened identifier.
- Store URLs in a PostgreSQL database.
- Frontend interface built with React.
- Backend server using Express and Node.js and TypeScript.
- Deployed for production use on Vercel.

## Technologies Used

- **Frontend**: React, CSS, React Router Dom
- **Backend**: Express, Node.js, Typescript
- **Database**: PostgreSQL

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Sairajepawar/URLshortner.git
   ```
2. Navigate to the project directory and set up both `frontend` and `backend` folders.

3. Install dependencies:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Configure environment variables in `.env` for both frontend and backend, including database credentials and API keys as needed.<br>
  a. Create .env file in frontend directory
    ```bash
    VITE_API_BASE_URL=http://localhost:3000/
    ```
    b. Create .env file in backend directory
    ```bash
    DB_USER =  user name who can access database instance
    PASSWORD =  password of respective owner
    HOST =  host name of database instance
    PORT = port number of database instance
    DATABASE = name of database
    CA = certificate authority
    ```
    
6. Start the application:
   ```bash
   # In backend
   npm run start

   # In frontend
   npm run dev
   ```

## Contributing

Feel free to fork the project, raise issues, and create pull requests. All contributions are welcome!
