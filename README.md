# Cadmus Inquisition Graffiti App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Docker

Quick Docker image build:

1. `npm run build-lib`
2. `ng build --configuration production`
3. `docker build . -t vedph2020/cadmus-ingra-app:1.1.0 -t vedph2020/cadmus-ingra-app:latest` (replace with the current version).

## History

- 2022-07-30: upgraded to Angular 14, refactoring untyped forms.

### 1.1.0

- 2021-12-22: upgraded to new shell.

- 2021-10-17: updated `DocReferencesPart` using new model from bricks, which is a breaking change for this part in the database, see <https://github.com/vedph/cadmus_ingra>.
