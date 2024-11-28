# API

# E-Kart Backend Server

This is the backend server for **E-Kart**, a product management and image upload platform that connects with Firebase for storage and Firestore for real-time database management. Built using Node.js, Express, and Firebase Admin SDK, this server provides APIs for uploading images, managing products, and real-time updates using Socket.IO.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Socket.IO Events](#socketio-events)
- [License](#license)

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Fast, unopinionated, minimalist web framework for Node.js
- **Firebase Admin SDK**: Integration with Firebase for database and file storage
- **Socket.IO**: Real-time communication between clients and server
- **Multer**: Middleware for handling file uploads

## Features

## Installation

1. GET PRIVATE FILES:

   ```bash
   git submodule init
   ```

   ```bash
   git submodule update
   ```

   Si modification

   ```
   git rm --cached private_files
   rm -rf private_files
   git submodule add https://github.com/E-Kart-Corp/private_files private_files
    git submodule init
   git submodule update
   ```

- **Image Uploads**: Upload images to Firebase Storage for specific products.
- **Product Management**: Store, retrieve, and manage product data in Firestore.
- **Real-Time Updates**: Notify clients of new product additions via Socket.IO.
- **Error Handling**: Robust error handling with descriptive responses.

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To start the server, use the following command:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Documentation

### POST `/api/products/upload_image`

- **Description**: Upload an image for a product and add it to the Firestore database.
- **Request Parameters**:
  - `image` (file): The image file to upload.
- **Response**: Returns the image URL and confirmation message on successful upload.

### GET `/api/products`

- **Description**: Retrieve the list of all products.
- **Response**: Returns a JSON array of product objects containing title, categories, price, and image URL.

## Socket.IO Events

### Event: `newProduct`

- **Description**: Triggered when a new product is added. Sends real-time notifications to all connected clients.
- **Payload**:
  - `title` (string): Product title
  - `categories` (array): Product categories
  - `price` (number): Product price
  - `imageUrl` (string): URL of the uploaded image

## Folder Structure

```plaintext
e-kart-backend/
├── server.js                    # Main server file
├── config/
│   └── firebaseConfig.js        # Firebase configuration
├── controllers/
│   └── uploadController.js      # Logic for uploading and retrieving products
├── middlewares/
│   └── uploadMiddleware.js      # Multer configuration for file uploads
├── routes/
│   └── productRoutes.js         # API routes for product management
└── sockets/
    └── socketConfig.js          # Socket.IO configuration
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides comprehensive guidance on setup, configuration, usage, and API details, making it easy to get started with development and understand the server structure. Let me know if you need any adjustments!
