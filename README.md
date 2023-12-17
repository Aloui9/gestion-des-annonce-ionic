# Gestion des Annonces Ionic

This project, "Gestion des Annonces Ionic," is an application developed with Ionic, Angular, and Firebase for managing and displaying announcements. It includes features such as user registration, login, creating and deleting announcements, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (register, login, logout)
- Creating, updating, and deleting announcements
- Viewing a list of announcements
- Dark mode toggle
- Responsive design

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Ionic CLI](https://ionicframework.com/docs/intro/cli)
- [Firebase Account](https://firebase.google.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/gestion-des-annonces-ionic.git

2. Change into the project directory:

    ```bash
    cd gestion-des-annonces-ionic

3. Install dependencies:

    ```bas
     npm install

4. Set up Firebase:

    - Create a new Firebase project on the Firebase Console.
    - Obtain your Firebase configuration and replace it in src/environments/environment.ts.
    - Configure Firebase Authentication (email/password) in the Firebase Console.

5. Run the application:

    ```bas
     ionic serve

### Usage

    - Access the application by navigating to http://localhost:8100/ in your web browser.
    - Register a new user or log in with an existing account.
    - Explore the available features such as creating announcements, viewing the list of announcements, and toggling dark mode.

### Folder Structure

   - src/app: Contains the Angular components, services, and modules.
   - src/assets: Contains static assets such as images.
   - src/environments: Contains environment configuration files.
   - src/services: Contains Angular services.
   - src/models: Contains TypeScript interfaces for data models.

### Contributing

    - Contributions are welcome! Feel free to open issues or submit pull requests.

### License

    - This project is licensed under the MIT License.