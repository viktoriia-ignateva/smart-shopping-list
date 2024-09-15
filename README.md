# Smart Shopping List

Smart Shopping List is a web application designed to simplify the process of shopping. Instead of manually adding items to shopping list, the app intelligently suggests items for users based on their preferences, previous purchases, and other customizable criteria. This feature makes it easier for users to quickly build their shopping lists and streamline their shopping experience. The app is built using `React` for the web frontend, `Express.js` for the backend, and `MongoDB` for data storage.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/)

## Installing Node.js

1. Visit the [Node.js download page](https://nodejs.org/en/download/).
2. Download and install the LTS version for your operating system.
3. Verify the installation by running the following commands in your terminal:
   ```bash
   node -v
   npm -v
   ```
   This should display the installed versions of Node.js and npm.

## Installing MongoDB

Ensure MongoDB is installed and running on your machine. You can follow the instructions [here](https://docs.mongodb.com/manual/installation/) if you don't have it installed yet.

## Running the Frontend App

1. Navigate to the frontend directory:
   ```bash
   cd app
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Run the frontend application:
   ```bash
   npm start
   ```

The frontend will typically be available at `http://localhost:3000`.

## Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd service
   ```

2. Install the backend dependencies:
   ```bash
   npm install
   ```

3. Run the backend server:
   ```bash
   node server.js
   ```

The backend will be running at `http://localhost:5000` (or whichever port is configured in your server setup).
