Frontend Coding Challenge - README

This frontend application is developed to complement the backend 
system described in the coding challenge. It is built using modern
frontend technologies and follows a structured approach with components,
constants, methods, models, services, and utility functions.

Below is a comprehensive guide to the frontend application:

Empresa (Company) View:

    Display information about companies including NIT, name, address, and contact details.

    Form to add, edit, and delete companies (accessible to administrators only).

Productos (Products) View:

    Display product information such as code, name, characteristics, prices, and associated company.

    Allow administrators to manage products (add, edit, delete).

    Allow external users to view products.

Inicio de Sesión (Login) View:

    Provide a login form for users to authenticate.

Inventario (Inventory) View:

    Display inventory information.

    Allow administrators to download PDFs of inventory and send them via AWS API.

User Management:

    Authentication and authorization mechanisms to distinguish between administrators and external users.

Form Handling:

    Form validation and submission methods.

Project Structure:

    components: Reusable UI components.

    constants: Constants used across the application.

    methods: Utility methods for common tasks.

    models: Data models for frontend entities.

    services: Handles communication with the backend API.

    utils: Utility functions for various purposes.

    .env: Environment configuration file for sensitive data or environment-specific settings.

Technologies Used:

    React: JavaScript library for building user interfaces.

    axios: HTTP client for making requests to the backend API.

Setup Instructions:

    Clone this repository.

    Install dependencies using npm install or yarn install.

    Configure environment variables in the .env file, use .env.example as a guide.

    Run the application using npm start or yarn start.

    Access the application in your browser at the specified URL.

Deployment:

    The frontend application can be deployed on any hosting service compatible with React applications. Ensure proper configurations are set for deployment, including environment variables and backend API endpoint configurations.

Developer:
    
    Juan Pablo Carrillo Acero

Feel free to reach out for any questions or clarifications regarding the application setup or functionality. 