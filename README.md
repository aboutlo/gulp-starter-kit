# Web App 

## Requirements
    brew install npm
    npm install phantomjs -g

## Build && Run
Install all dependencies and launch the web app. 

    npm install
    gulp clean && gulp 

Update sources or tests to recompile. 

**Notice: First time a reload is required to get template and sourceMappingURL**

## test 
Run tests once. Otherwise the run on every save.

    gulp test

## clean 
Destroy build and dist directories

    gulp clean

## Deploy
it prepare all files in `dist` directory. 

    NODE_ENV=development|staging|production BUILD_NUMBER=0.0.1 gulp deploy

Example

    NODE_ENV=development gulp deploy
    
**Notice: BUILD_NUMBER is handler by jenkins**

## TODO
- refactorin app/scripts to app/js
- on development environment first time sourceMapping and templates are missing. Task dependencies need a review 
- Compress file before put on s3
- Use https://www.npmjs.com/package/gulp-rev to create unique js and css files.
