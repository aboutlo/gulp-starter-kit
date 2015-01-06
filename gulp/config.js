var dest = "./build";
var src = './app';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + "/css/*.{sass,scss}",
    dest: dest + '/css',
    settings: {
      // Required if you want to use SASS syntax
      // See https://github.com/dlmanning/gulp-sass/issues/81
      sourceComments: 'map',
      imagePath: '/images' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    src: src + "/*.html",
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [ {
      entries: src + '/scripts/main.js',
      dest: dest + '/js',
      outputName: 'main.js',
      // list of externally available modules to exclude from the bundle
      external: ['jquery', 'underscore']
    }]
  },
  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest
  }
};
