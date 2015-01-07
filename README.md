# Spatch Web App 

## Requirements
	brew install npm
    npm install phantomjs -g

## Build && Run
Install all dependencies and launch the web app. 

    npm install
    gulp

Update sources or tests to recompile. 

**Notice: First time a reload is required to get template and sourceMappingURL**

## test 
Run tests once. Otherwise the run on every save.

    gulp test

## clean 
Destroy build and dist directories

    gulp clean

## Deploy
it prepare all files in `dist` directory
 
    gulp production 

## TODO
- on development environment first time sourceMapping and templates are missing.
- Compress file before put on s3
