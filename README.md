# Project Name

## Installation Guide

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Install npm or pnpm
You can use either `npm` or `pnpm` as your package manager:

#### Install npm (default with Node.js)
```sh
npm install -g npm
```

#### Install pnpm
```sh
npm install -g pnpm
```

### Install Playwright
Playwright is required for browser automation. Install it using your preferred package manager:

#### Using npm
```sh
npm install -D @playwright/test
npx playwright install
```

#### Using pnpm
```sh
pnpm add -D @playwright/test
pnpm exec playwright install
```

## Running Playwright Tests
Playwright can be launched in different modes:

### Run All Tests
```sh
npx playwright test
```

### Run a Specific Test File
```sh
npx playwright test path/to/test.spec.ts
```

### Run in Headed Mode (With UI)
```sh
npx playwright test --headed
```

### Run in Debug Mode
```sh
npx playwright test --debug
```

### Run with a Specific Browser
```sh
npx playwright test --project=chromium  # or firefox, webkit
```

## Configuring Environment Variables
Set up a `.env` file in the root directory to store credentials securely.

### Example `.env` File
```ini
API_KEY=your_api_key_here
DB_URL=your_database_url_here
USERNAME=your_username_here
PASSWORD=your_password_here
```

Ensure you load the environment variables in your Playwright config or test files:
```js
require('dotenv').config();
console.log(process.env.API_KEY);
```

## Additional Resources
- [Playwright Documentation](https://playwright.dev/)
- [dotenv Package](https://www.npmjs.com/package/dotenv)
