# Spatch Web App 

## Requirements

    npm install phantomjs -g

## Build && Run
Install all dependencies and launch the web app. 

    npm install
    gulp

Update sources or tests to recompile

## test 
Destroy build and dist directories

    gulp test

## clean 
Destroy build and dist directories

    gulp clean

## Deploy
it prepare all files in `dist` directory 
    gulp production 

## TODO
- Compress file before put on s3
