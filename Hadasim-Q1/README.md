#### README Q1

### Server (Backend) API

#### Features
1. **CRUD Operations**: Provides endpoints for creating, reading, updating, and deleting member records.
2. **Retrieve COVID-19 Information**: Endpoint to retrieve COVID-19 related information for a member.
3. **Retrieve Vaccination Records**: Endpoint to retrieve vaccination records for a member.
4. **Data Analysis**: Provides endpoints for conducting data analysis on member records.

#### Technologies Used
- Node.js: JavaScript runtime for building scalable server-side applications.
- Express.js: Web application framework for Node.js.
- Validator.js: JavaScript library for data validation in web applications.
- mysql2: MySQL client for Node.js, providing an easy-to-use API for interacting with MySQL databases.

#### Project Structure
The server-side API is structured as follows:
- **models**: Contains valitadorjs models for defining validation rules.
- **routes**: Contains route handlers for different API endpoints.
- **controllers**: Contains controller functions to handle business logic for each route.
- **config**: Contains configuration files for database connection and other settings.
- **middlewares**: Contains custom middleware functions for handling requests.
- **db.js**: Initializes the database connection and synchronizes models.

#### Setup Instructions
1. Navigate to the server directory and install dependencies by running `npm install`.
2. Set up your database connection in the `config/config.json` file.
3. Ensure that your database server is running.
4. Start the server with `npm start`.

#### API Endpoints
- **GET /members**: Retrieve a list of all members.
- **GET /members/:id**: Retrieve details of a specific member.
- **POST /members**: Add a new member to the database.
- **PUT /members/:id**: Update details of a specific member.
- **DELETE /members/:id**: Delete a member from the database.
- **GET /members/:id/covid**: Retrieve COVID-19 information for a specific member.
- **GET /members/:id/vaccinations**: Retrieve vaccination records for a specific member.
- **POST /members/:id/image**: Upload an image for a member (not implemented in frontend).
- **GET /analysis/notVaccinated**: Retrieve the count of members who are not vaccinated.

#### Database Schema
The database schema includes 4 tables for members, COVID-19 information, and 2 tables for vaccination records, with appropriate relationships between them.
![screenshot]('./screenshot1')

#### Database Connection
The database connection is established using the `mysql2/promise` library. The `query` function in the `db.js` file executes SQL queries asynchronously and returns the results.


### Client (Frontend) Application

#### Features
1. **View Members List**: Displays a list of all members with essential information such as ID, first name, last name, etc.
2. **Add New Member**: Allows users to add a new member to the database by providing necessary details.
3. **View Member Details**: Displays detailed information about a specific member, including personal details, COVID-19 information, and vaccination records.
4. **Edit Member Details**: Enables users to edit the details of a member.
5. **Delete Member**: Allows users to delete a member from the database.
6. **View COVID-19 Information**: Displays COVID-19 related information for a member, including receiving date and recovery date if available.
7. **View Vaccination Records**: Shows vaccination records for a member, including vaccination date and manufacturer.
8. **Data Analysis**: Provides the functionality to perform data analysis on member records.

#### Technologies Used
- React: Frontend library for building user interfaces.
- React Router: For declarative routing in the application.
- Formik: Form library for React, used for building and managing forms with ease.
- Yup: For schema-based form validation.

#### Project Structure
The project is structured as follows:
- **components**: Contains React components for different parts of the application.
  - `App.js`: Main component containing routes and navigation.
  - `MembersList.js`: Component for displaying the list of members.
  - `Member.js`: Component for displaying detailed information about a member.
  - `MemberRegister.js`: Component for adding a new member.
  - `Covid.js`: Component for displaying COVID-19 information for a member.
  - `Vaccinations.js`: Component for displaying vaccination records for a member.
  - `Analysis.js`: Component for performing data analysis on member records.
- **assets**: Contains image assets used in the application.
- **helper.js**: Utility functions for date conversion and form validation.

#### Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the client directory and install dependencies by running `npm install`.
3. Start the development server with `npm start`.
4. Ensure that the backend API is running and accessible at `http://localhost:3000`.
5. Fell free to start the client with `npm run dev`.
