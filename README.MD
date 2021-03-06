# DotCMS UI

## Run in dev mode
Watch and compile your files.

1. ```npm run start```
2. Open http://localhost:3000

## Run in prod mode
Watch and compile your files in prod mode and copy it into ```dotAdmin``` folder in core.

1. ```npm run dotcms -- -op=your-path-to-dotadmin``` (ex. ~/dev/dotcms/tomcat8/webapps/ROOT/dotAdmin)
2. Open http://localhost:8080/dotAdmin

## Build to prod
Compile your files in prod mode and copy it into ```dotAdmin``` folder in core.

1. ```npm run build -- -op=your-path-to-dotadmin``` (ex. ~/dev/dotcms/tomcat8/webapps/ROOT/dotAdmin)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
