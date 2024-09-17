# REST/GraphiQL App

## Description

This project is a REST/GraphiQL Client developed as part of the [Rolling Scopes School](https://rs.school) React Course 2024Q3. It provides a user-friendly interface for making GraphQL queries and RESTful API requests.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Scripts](#scripts)
- [Authors](#authors)
- [Project Evaluation](#project-evaluation)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/seygorin/graphiql-app.git
   ```
2. Navigate to the project directory:
   ```
   cd graphiql-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env.local` file in the root directory and add your Firebase API key. You can refer to the `.env.example` file for the required structure.

## Usage

To start the application, run:

```
npm run dev
```

Then open your browser and navigate to the URL provided in the CLI.

## Features

- GraphQL query editor with syntax highlighting and auto-completion
- RESTful API client
- Request history
- Multi-language support
- User authentication
- Responsive design

## Scripts

- `npm run lint`: Run ESLint for code analysis
- `npm run format:fix`: Run Prettier to automatically format code
- `npm run test`: Run tests
- `npm run test:coverage`: Run tests with coverage report

## Authors

- [seygorin](https://github.com/seygorin): GraphiQL/RESTful, History
- [KsushaSher](https://github.com/KsushaSher): Deployment, Styles, Routing, i18n
- [Intrstng](https://github.com/Intrstng): Login/Logout, Firebase/Firestore

## Project Evaluation

For detailed information about the project's score and evaluation, please refer to the [SCORE.md](./SCORE.md) file.
