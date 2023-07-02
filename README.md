# Cadmus Inquisition Graffiti App

- [Cadmus Inquisition Graffiti App](#cadmus-inquisition-graffiti-app)
  - [Docker](#docker)
  - [History](#history)
    - [2.0.0](#200)
    - [1.2.1](#121)
    - [1.2.0](#120)
    - [1.1.0](#110)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Docker

Quick Docker image build:

1. `npm run build-lib`;
2. update version in `env.js` and `ng build --configuration production`;
3. `docker build . -t vedph2020/cadmus-ingra-app:2.0.0 -t vedph2020/cadmus-ingra-app:latest` (replace with the current version).

Production version:

(1) build as above.

(2) in `dist/cadmus-ingra-app/env.js` change the URL endpoints and version like this:

```js
// https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
(function (window) {
  window.__env = window.__env || {};

  // environment-dependent settings
  window.__env.apiUrl = "https://cadmus-ingra-api.fusi-soft.com/api/";
  window.__env.biblioApiUrl = 'https://cadmus-ingra-biblioapi.fusi-soft.com/api/';
  window.__env.version = "1.2.1-prod";
})(this);
```

(3) build the image: `docker build . -t vedph2020/cadmus-ingra-app:1.2.1-prod`.

## History

### 2.0.0

- 2023-07-02: moved to PostgreSQL.
- 2023-05-19: updated Angular and packages.
- 2023-03-16: updated packages.
- 2022-12-23:
  - updated packages.
  - updated Monaco editor.
  - removed Angular Flex Layout.
- 2022-11-28:
  - updated to Angular 15.
  - replaced Akita with ELF.

### 1.2.1

- 2022-10-10: more preview styles.
- 2022-05-10:
  - updated packages.
  - added preview.

### 1.2.0

- 2022-09-28:
  - replaced ProperName with AssertedProperName in prisoner info.
  - updated Angular and Cadmus packages.
- 2022-07-30: upgraded to Angular 14, refactoring untyped forms.

### 1.1.0

- 2021-12-22: upgraded to new shell.

- 2021-10-17: updated `DocReferencesPart` using new model from bricks, which is a breaking change for this part in the database, see <https://github.com/vedph/cadmus_ingra>.
