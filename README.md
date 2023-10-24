# Safety Observation Submission Portal

## Introduction

The Safety Observation Submission Portal is a web application designed to facilitate the reporting and management of safety observations in various environments. This portal offers a user-friendly interface for users to anonymously submit safety observations and provides tools for administrators and managers to monitor and address safety concerns.

## Features

- **User Authentication**: Secure user registration and login with authentication.

- **Password Encryption**: User passwords are securely hashed and encrypted for enhanced security.

- **Observation Submission**: Users can submit safety observations for their department, including answers to specific questions, comments, and a date/time are automatically assigned.

- **Admin Dashboard**: Administrators/Managers can review safety observations, view trends for various departments, and take action to address safety concerns.

- **Database Storage**: Utilizes SQLAlchemy for efficient and structured data storage.

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [Chart.js](https://www.chartjs.org/): A JavaScript library for creating interactive charts and visualizations.
  - [npm](https://www.npmjs.com/): A package manager for managing frontend dependencies.

- **Backend**:
  - [Flask](https://flask.palletsprojects.com/en/2.1.x/): A Python web framework for building the backend.
  - [SQLAlchemy](https://www.sqlalchemy.org/): An Object-Relational Mapping (ORM) library for working with databases.
  - [Pipenv](https://pipenv.pypa.io/): A package manager and virtual environment tool for Python.

- **Database**:
  - [PostgreSQL](https://www.postgresql.org/): A powerful, open-source relational database.

## Setup and Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/tjs7321/SOSP_proj
    cd SOSP_proj
    ```

2. **Set Up the Backend**:
    - Create a virtual environment with Pipenv:

      ```bash
      pipenv install --dev
      pipenv shell
      ```

    - Install the required Python packages:

      ```bash
      pipenv install -r requirements.txt
      ```

    - Apply the database migrations:

      ```bash
      flask db init
      flask db migrate
      flask db upgrade
      ```

    - Start the Flask server:

      ```bash
      cd server
      python app.py
      ```

3. **Set Up the Frontend**:
    - Navigate to the parent directory:

    - Install the required Node.js packages:

      ```bash
      npm install --prefix client
      ```

    - Start the React development server:

      ```bash
      npm start --prefix client
      ```

4. **Access the Application**:
    - Open your web browser and access the application at `http://localhost:4000`.

## Contributors

- [Theodore Smith](https://github.com/tjs7321)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Questions or Issues

If you have any questions or encounter any issues, please feel free to open an issue on this repository or contact [tjs7321@gmail.com].