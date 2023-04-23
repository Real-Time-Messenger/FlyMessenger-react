![GitHub package.json version](https://img.shields.io/github/package-json/v/Real-Time-Messenger/FlyMessenger-react)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/Real-Time-Messenger/FlyMessenger-react)
![GitHub](https://img.shields.io/github/license/Real-Time-Messenger/FlyMessenger-react)

# Fly Messenger

Real-time messenger using client/server technology.

## Table Of Contents

<!-- TOC -->

* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installing](#installing)
    * [Testing](#testing)
    * [Building](#building)
    * [Linting](#linting)
    * [Format with Prettier](#format-with-prettier)
* [Technologies](#technologies)
* [Authors](#authors)
* [License](#license)

<!-- TOC -->

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You will need to have Node.js and npm installed on your system. You can check your Node.js version by running `node -v` in
your terminal and your npm version by running `npm -v`.

### Installing

1. First, clone the repository to your local machine:

```bash
git clone https://github.com/Real-Time-Messenger/FlyMessenger-react.git
```

2. Then, install the dependencies:

```bash
cd FlyMessenger-react
npm install
```

3. Open the `.env.sample` file and fill in the required fields. Then, rename the file to `.env`.

```dotenv
VITE_WS_URL=<your websocket url>
VITE_API_URL=<your api url>

VITE_APP_VERSION=$npm_package_version # or any other version you want to use
```

4. Finally, run the application:

```bash
npm run dev
```

The application will now be running on `http://localhost:5173`.

[//]: # (### Testing)

[//]: # ()
[//]: # (To run the tests, run:)

[//]: # ()
[//]: # (```bash)

[//]: # (npm run test)

[//]: # (```)

### Building

To build the application, run:

```bash
npm run build
```

### Linting

To lint the application, run:

```bash
npm run lint
```

### Format with Prettier

To format the application, run:

```bash
npm run format
```

## Technologies

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: TypeScript is a typed superset of JavaScript that compiles to plain
  JavaScript.
- **[ESLint](https://eslint.org/)**: ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript
  code.
- **[Prettier](https://prettier.io/)**: Prettier is an opinionated code formatter.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: The official, opinionated, batteries-included toolset for efficient Redux
  development.
- **[ky](https://github.com/sindresorhus/ky)**: Tiny and elegant HTTP client based on the browser Fetch API.
- **[react-i18next](https://react.i18next.com/)**: Internationalization for React done right.
- **[framer-motion](https://www.framer.com/motion/)**: A production-ready motion library for React.
- **[vite](https://vitejs.dev/)**: Next generation frontend tooling. It's fast!.

## Authors

- **[Kirill Goritski](https://t.me/winicred)**
- **[Vladislav Hodzajev](https://t.me/white_wolf_dd)**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details