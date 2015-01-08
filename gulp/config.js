var dest = './build';
var src = './app';
var test = './test';
var dist = './dist';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },

  js:{
    src: src + '/scripts/**/*.js',
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
      entries: src + '/scripts/main.js',
      dest: dest + '/js',
      outputName: 'main.js'
      // list of externally available modules to exclude from the bundle
      // TODO we could use public CDN instead.
      //external: ['jquery', 'underscore']
    }]
  },
  deploy: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    htmlSrc: dest + '/*.html',
    dist: dist
  },
  environments:{
    development: {
      description: 'development',
      authURL: 'http://locahost'
    },
    staging: {
      description: 'staging',
      authURL: 'http://staging.spatch.co'
    },
    production: {
      description: 'production',
      authURL: 'spatch.co'
    }

  }

};
