# Modern Portfolio Website

A fully responsive, animated portfolio website with a Node.js/Express backend and SQLite database.

## Features
-   **Modern Design**: Glassmorphism, Animations (AOS/GSAP), Dark/Light Mode.
-   **Dynamic Content**: Projects are fetched from a database.
-   **Admin Panel**: Secure dashboard to manage projects (Add/Delete).
-   **Contact Form**: Saves messages to the database.
-   **Tech Stack**: HTML, Tailwind CSS, JS, Node.js, Express, SQLite.

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Build CSS**:
    ```bash
    npm run build:css
    ```

3.  **Start Server**:
    ```bash
    npm run dev
    ```

4.  **Access**:
    -   Public Site: `http://localhost:3000`
    -   Admin Panel: `http://localhost:3000/admin.html`

## Admin Credentials (Default)
-   **Username**: `admin`
-   **Password**: `password123`

## Deployment
-   **Frontend & Backend**: Can be deployed to services like Render, Railway, or Heroku.
-   **Database**: SQLite file is stored locally. For persistent cloud deployment, ensure the storage volume is persistent or switch to PostgreSQL.
