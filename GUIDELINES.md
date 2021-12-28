## Running your own instance

These insturctions will get you a copy of the project up and running on your local machine for development or testing purposes.

### Prerequistes

- Node.js v12^
- npm
- expo-cli@~5.0.2

## Installation

### 1. Clone the project

```bash
$ git clone https://github.com/dqdq4197/BitFolio-app
```

### 2. Install packages from npm

```bash
$ cd BitFolio-app
$ npm install
```

### 3. make .env file & type declaration
This file consists of environment variables required for API requests. <br/>
The api key has a limited usage.

```
/BitFolio-app/.env

APP_NAME=bitfolio
APP_VERSION=1.0.0

CRYPTOCOMPARE_API_KEY=e113a4229ce5b75e3d091c98a15272458d178d93165351447a7b756ee7bb57e1
```

```
/BitFolio-app/@types/env.d.ts

declare module '@env' {
  export const APP_NAME: string
  export const APP_VERSION: string

  export const CRYPTOCOMPARE_API_KEY: string
}
```

## Start Frontend Development Server
Expo CLI starts Metro Bundler, which is an HTTP server that compiles the JavaScript code of our app using Babel and serves it to the Expo app

```bash
$ npm run ios
```
or 
```
$ npm start
```