# JS Factory  
============

This project is based on <https//github.com/greypants/gulp-starter> but has been heavily adapted to my needs

Includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds)
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [asset revisioning](https://github.com/sindresorhus/gulp-rev) (appending content hash to filenames: unicorn.css → unicorn-098f6bcd.css)
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [Image optimizationn](https://www.npmjs.com/package/gulp-imagemin)
- [jstify](https://github.com/zertosh/jstify) for compile underscore template
- [Mochify](https://github.com/mantoni/mochify.js) for run mocha via browserify pipeline
- [Chai](http://chaijs.com/api/bdd/) for `expect` in the tests
- [SinonJS](http://sinonjs.org/) for `stub,mock,spy` in the tests
- [Gulp-s3-upload](https://github.com/clineamb/gulp-s3-upload) for deploy, gzip assets and handle caching on AWS s3
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Multi environment (development|testing|staging|production)


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
Run tests once ( Ideal on CI )

    gulp test

## Deploy
it prepare all files in `dist` directory then deploy them to the configured s3 bucket 

    NODE_ENV=development|testing|staging|production BUILD_NUMBER=0.0.1 gulp deploy

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
    
Once the app has been deployed activated `Enable website hosting` and point to index.html as Index Document


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
- check if underscore is included twice.
- create consolify task stating from mochify
- Multiple bundles with shared dependencies (Need review)
