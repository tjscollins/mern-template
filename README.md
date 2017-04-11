# MERN Template based on Clementine.js

## Overview

This MERN Template is a boilerplate for fullstack JavaScript development which utilizes MongoDB, Express, React, and Node.js.

This is a modified version of the [Free Code Camp](http://www.freecodecamp.com) version of Clementine.js by Blake Johnston.  I have added **React** and **React-Redux** to the stack, as well as configuring **Gulp** and **Webpack** for building the front-end, **Karma** and **Mocha** for running unit tests on both the client-side and server-side applications, and **Istanbul** for verifying code coverage of your unit tests.

This boilerplate aims to be completely pre-configured for immediately developing a new Full-Stack MERN application.

# Quick Start Guide

### Prerequisites

In order to use this template, you must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)

### Installation & Startup

To install this template, simply enter the below in the terminal window:

```bash
$ git clone https://github.com/tjscollins/mern-template.git your-project
```

To install the dependencies, enter the following in your terminal:

```
$ cd your-project
$ yarn install
```

This will install the required components into the `your-project` directory.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
GITHUB_KEY=your-client-id-here
GITHUB_SECRET=your-client-secret-here
MONGO_URI=mongodb://localhost:27017/clementinejs
PORT=8080
APP_URL=http://localhost:8080/
```

### Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should see the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!

## License

MIT License. [Click here for more information.](LICENSE.md)
