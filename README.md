# Cloud Hosting - Next.js Project

This is a full-stack web application built with Next.js, featuring a cloud hosting service theme. The project includes user authentication, an articles section, a commenting system, and an admin dashboard for content management.

## Features

- **User Authentication**: Secure user registration and login system using JWT.
- **Article Management**: Admins can create, read, update, and delete articles.
- **Comment System**: Authenticated users can add comments to articles, and either the comment owner or an admin can manage them.
- **Admin Dashboard**: A protected area for administrators to manage articles and comments.
- **Search and Pagination**: Users can search for articles and navigate through them using pagination.
- **Responsive Design**: The application is designed to be accessible on various devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & CSS Modules
- **State Management**: React Hooks
- **API Communication**: Axios & Next.js API Routes
- **Schema Validation**: [Zod](https://zod.dev/)
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cloud-hosting-project.git
    cd cloud-hosting-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="your_super_secret_jwt_key"
    ```

4.  **Apply database migrations:**
    Run the following command to sync your database schema with the Prisma schema.
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

The application exposes the following RESTful API endpoints:

### User API
- `POST /api/user/register`: Register a new user.
- `POST /api/user/login`: Log in a user.
- `GET /api/user/logout`: Log out a user.
- `GET /api/user/profile/:id`: Get user profile.
- `PUT /api/user/profile/:id`: Update user profile.
- `DELETE /api/user/profile/:id`: Delete user profile.

### Articles API
- `GET /api/articles`: Get articles with pagination.
- `POST /api/articles`: Create a new article (admin only).
- `GET /api/articles/search`: Search for articles.
- `GET /api/articles/count`: Get the total number of articles.
- `GET /api/articles/:id`: Get a single article.
- `PUT /api/articles/:id`: Update an article (admin only).
- `DELETE /api/articles/:id`: Delete an article (admin only).

### Comments API
- `GET /api/comments`: Get all comments (admin only).
- `POST /api/comments`: Create a new comment.
- `PUT /api/comments/:id`: Update a comment.
- `DELETE /api/comments/:id`: Delete a comment.

## Folder Structure

The project follows the standard Next.js `app` directory structure.

```
/src
|-- /app/
|   |-- /(user)/        # User-related pages (login, register)
|   |-- /admin/         # Admin dashboard pages
|   |-- /api/           # API routes
|   |-- /articles/      # Article listing and detail pages
|   |-- layout.tsx      # Root layout
|   |-- page.tsx        # Home page
|-- /components/        # Reusable React components
|-- /prisma/            # Prisma schema and migrations
|-- /public/            # Static assets
|-- /utils/             # Utility functions and types
```

## Deployment

The application is ready to be deployed on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure that you have set up the environment variables in your deployment provider's settings.
