var dest = './build';
var src = './app';
var test = './test';
var dist = './dist';
var fs = require('fs');

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },

  js:{
    src: src + '/js/**/*.js',
    dest: dest + '/js',
    test: test + '/**/*.js'
  },

  sass: {
    src: src + '/css/*.{sass,scss}',
    dest: dest + '/css',
    settings: {
      // Required if you want to use SASS syntax
      // See https://github.com/dlmanning/gulp-sass/issues/81
      sourceComments: 'map',
      imagePath: '/images' // Used by the image-url helper
    }
  },
  images: {
    src: src + '/images/**',
    dest: dest + '/images'
  },
  markup: {
    src: src + '/*.html',
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [ {
      entries: src + '/js/main.js',
      dest: dest + '/js',
      outputName: 'main.js'
      // list of externally available modules to exclude from the bundle
      // TODO we could use public CDN instead.
      //external: ['jquery', 'underscore']
    }]
  },
  deploy: {
    credentials: JSON.parse(fs.readFileSync(process.env.HOME + '/.aws/credentials/credentials.json')),
    region: 'eu-west-1', // AWS s3 region
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    htmlSrc: dest + '/*.html',
    imgSrc: dest + '/images/**/*.*',
    dist: dist
  },
  environments:{
    development: {
      environment: 'development',
      authURL: 'http://localhost',
      bucket:  'dev.example'
    },
    testing: {
      environment: 'testing',
      authURL: 'http://localhost',
      bucket:  'testing.example'
    },
    staging: {
      environment: 'staging',
      authURL: 'http://staging.example.com',
      bucket:  'staging.example'
    },
    production: {
      environment: 'production',
      authURL: 'http://example.com',
      bucket:  'example'
    }

  }

};
