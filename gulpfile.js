var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');
var initTestTasks = require('./tasks/test');
var initReleaseTasks = require('./tasks/release');

/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

// Read the package.json to detect the package name
var pkg = JSON.parse(require('fs').readFileSync('./package.json'));

var taskConfig = {

  component: {
    name: 'BurgerMenu',
    dependencies: [
      'browserify-optional',
      'classnames',
      'eve',
      'radium',
      'react',
      'react-dom',
      'snapsvg-cjs'
    ],
    lib: 'lib',
    file: 'BurgerMenu.js',
    src: 'src',
    dist: 'dist',
    pkgName: pkg.name
  },

  example: {
    src: 'example/src',
    dist: 'example/dist',
    files: [
      'index.html',
      '.gitignore',
      'normalize.css',
      'fonts/**/*'
    ],
    scripts: [
      'example.js'
    ],
    less: [
      'example.less'
    ]
  }

};

var testConfig = {
  paths: {
    src: 'src/**/*.js',
    test: 'test/*.js'
  }
};

var releaseConfig = {
  files: [
    'dist',
    'lib',
    'examples',
    'package.json',
    'bower.json'
  ],
  version: pkg.version
};

initGulpTasks(gulp, taskConfig);
initTestTasks(gulp, testConfig);
initReleaseTasks(gulp, releaseConfig);
