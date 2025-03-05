# Hospital Management System

## Overview
The **Hospital Management System** is a React-based web application that allows users to manage hospital data, including adding, editing, deleting, and searching for hospitals by city. The frontend is built with React and Bootstrap, while it communicates with a backend API to fetch and update hospital data.

## Features
- **Add Hospitals**: Users can add new hospitals by providing details such as name, city, image URL, specialty, and rating.
- **Edit Hospitals**: Users can update hospital information.
- **Delete Hospitals**: Remove hospitals from the list.
- **Search by City**: Filter hospitals by city name.
- **Toast Notifications**: Feedback messages for user actions.
- **Loading Spinner**: UI enhancement for loading states.

## Tech Stack
- **Frontend**: React, React Bootstrap
- **Backend API**: Axios (for API requests)
- **Styling**: Bootstrap (CDN)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/hospital-management.git
   cd hospital-management
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. Ensure that the backend API is running at `http://localhost:5000/api/v1/hospitals`.

## API Endpoints
The application communicates with a backend API for data management. Ensure the backend supports the following endpoints:
- `GET /api/v1/hospitals` - Fetch all hospitals
- `GET /api/v1/hospitals?city={city}` - Fetch hospitals by city
- `POST /api/v1/hospitals/create` - Add a new hospital
- `PUT /api/v1/hospitals/update?id={id}` - Update hospital details
- `DELETE /api/v1/hospitals/delete?id={id}` - Delete a hospital

## Usage
1. Open the application in a browser at `http://localhost:3000`.
2. Use the form at the top to add a new hospital.
3. Click "Edit" to modify an existing hospital's details.
4. Click "Delete" to remove a hospital.
5. Use the search box to filter hospitals by city.

## Screenshots
(Include screenshots of the UI for better documentation.)

## Contributing
If you would like to contribute:
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push to your branch and create a Pull Request.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any issues or suggestions, feel free to create an issue in the repository or contact the project maintainers.

---
*Happy Coding!*

