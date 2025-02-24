# ZF Bus Connect Automated Testing

## Installation Guide

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Node Version
A Node version manager such as [NVM](https://github.com/nvm-sh/nvm) or [FNM](https://github.com/Schniz/fnm) can be used to install and manage different versions of Node.

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
Playwright is required to run automated tests. It can be installed using your preferred package manager:

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

#### Run All Tests using npx
```sh
npx playwright test
```

#### Run All Tests using pnpm
```sh
pnpm playwright test
```

### Run a Specific Test File

#### Run a specific test file using npx
```sh
npx playwright test path/to/test.spec.ts
```
#### Run a specific test file using pnpm
```sh
pnpm playwright test path/to/test.spec.ts
```

### Run in Headed Mode (With UI)

#### Run in headed mode using npx
```sh
npx playwright test --headed
```
#### Run in headed mode using pnpm
```sh
pnpm playwright test --headed
```

### Run in Debug Mode

#### Run in debug mode using npx
```sh
npx playwright test --debug
```
#### Run in debug mode using pnpm
```sh
pnpm playwright test --debug
```

### Run with a Specific Browser

#### Run with a specific browser using npx
```sh
npx playwright test --project=chromium  # or firefox, webkit
```
#### Run with a specific browser using pnpm
```sh
pnpm playwright test --project=chromium  # or firefox, webkit
```

## Configuring Environment Variables
Set up a `.env` file in the root directory to store credentials securely.

### Example `.env` File
```ini
TEST_USERNAME=your_username_here
TEST_PASSWORD=your_password_here
```

Ensure you load the environment variables in your Playwright config or test files:
```js
require('dotenv').config();
console.log(process.env.API_KEY);
```

## Additional Resources
- [Playwright Documentation](https://playwright.dev/)
- [dotenv Package](https://www.npmjs.com/package/dotenv)
