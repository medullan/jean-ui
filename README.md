jean-ui
=======

UI Template to be used with the [JEAN stack](https://github.com/medullan/jean)

[![Circle CI](https://circleci.com/gh/medullan/jean-ui.svg?style=svg)](https://circleci.com/gh/medullan/jean-ui)

### Setup

To setup the application, run

```bash
$ npm install
```
This will pull down all `npm dependencies` and `bower packages` for development and running the application.

### Starting the App

This template uses `harpjs` to serve web content.

To start the UI app, run
```bash
$ grunt serve
```
The app will start on port `9000` by default.
To specify a port, run
```bash
$ grunt serve --port=$PORT
```

### Environment Variables
You can set environment variables that will be available in the `CoreConstants` angular constant within the `core module`.

These environment variables are located in `harp.json`; within the `env` object.

`requiredEnv` determines which sub-object is used by angular.
Therefore, if `requiredEnv` is set to `development` then the `development` environment variables will be used.

Environment variables are extremely helpful in switching out the external api the app points to and can be used for other environment specific settings.
