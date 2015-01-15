# gulp-starter (Browserify + Backbone & Flux Pattern) 
============

This projext is based on <https//github.com/greypants/gulp-starter> but has been heavily adapted to my needs

Starter Gulp + Browserify project with examples of how to accomplish some common tasks and workflows. 
Read the [blog post](http://viget.com/extend/gulp-browserify-starter-faq) for more context, and check out the [Wiki](https://github.com/greypants/gulp-starter/wiki) for some good background knowledge.

Includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds)
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [Image optimizationn](https://www.npmjs.com/package/gulp-imagemin)
- [Mochify](https://TODO)
- [Chai](https://TODO)
- [Gulp-s3-upload](https://TODO)
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Multi environment deploy via s3 (development|staging|production)
- Multiple bundles with shared dependencies (Need review)

## Install

    brew install npm
    npm install phantomjs -g
    
### Install npm dependencies

    npm install

This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory.

### The `gulp` command

To run the version of gulp installed local to the project, in the root of your this project, you'd run

    ./node_modules/.bin/gulp

**WAT.** Why can't I just run `gulp`? Well, you could install gulp globally with `npm install -g gulp`, which will add the gulp script to your global bin folder, but it's always better to use the version that's specified in your project's package.json.  My solution to this is to simply alias `./node_modules/.bin/gulp` to `gulp`. Open up `~/.zshrc` or `~./bashrc` and add the following line:

    alias gulp='node_modules/.bin/gulp'
    
Now, running `gulp` in the project directory will use the version specified and installed from the `package.json` file.

#### Run gulp and be amazed.

    gulp
    
This will run the `default` gulp task defined in `gulp/tasks/default.js`, which has the following task dependencies: `['sass', 'images', 'markup', 'watch']`


## test 
Run tests once.

    gulp test

## Deploy
it prepare all files in `dist` directory then deploy them to the configured s3 bucket 

    NODE_ENV=development|staging|production BUILD_NUMBER=0.0.1 gulp deploy

Example

    NODE_ENV=development gulp deploy
    
## clean 
Destroy build and dist directories

    gulp clean
    
#### Other Gulp tasks:
  - The `sass` task compiles your css files.
  - `images` moves images copies images from a source folder, performs optimizations, the outputs them into the build folder
  - `markup` doesn't do anything but copy an html file over from src to build, but here is where you could do additional templating work.
  - `watch` has `watchify` as a dependency, which will run the browserifyTask with a `devMode` flag that enables sourcemaps and watchify, a browserify add-on that enables caching for super fast recompiling. The task itself starts watching source files and will re-run the appropriate tasks when those files change.

### Configuration

#### Build
All build paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. 
Adapt the paths and settings to the structure and needs of your project.

#### AWS Keys (only to deploy)

Create a directory `~/.aws/credentials`
Then put a JSON `credentials.json` inside the directory:

    {
      'accessKeyId': 'AAAAAAAAAAAAAAAAAAAAA',
      'secretAccessKey': '000000000000000000000000000000000000000000'
    }

#### App
All App settings have been abstracted into a centralized config object in `app/config.js`.

    'use strict';
    
    module.exports = {
    
      buildNumber: '/* @echo buildNumber */' || '0.0.0',
      description: '/* @echo description */' || 'development' ,
      authURL: '/* @echo authURL */' || 'http://localhost'
    
    };

Add any property you need. The properties are filled reading the object `environments` in `gulp/config.js` (default:development) 

## TODO
- refactoring app/scripts to app/js
- add watch options to mochify if env === development and remove from watch task
- create consolify task stating from mochify
- on development environment first time sourceMapping and templates are missing. Task dependencies need a review 
- Use https://www.npmjs.com/package/gulp-rev to create unique js and css files.
