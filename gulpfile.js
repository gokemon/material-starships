// nicely done gulpfile sample
const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    cached = require('gulp-cached'),
    progeny = require('gulp-progeny'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    remember = require('gulp-remember'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev-append'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    shell = require('gulp-shell'),
    sourcemaps = require('gulp-sourcemaps'),
    spawn = require('child_process').spawn,
    uglify = require('gulp-uglify'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = require('yargs').argv;


// Browsers to target when prefixing CSS.
const COMPATIBILITY = [
    // major browsers
    'last 2 versions', 'ie >= 11'
];


// File paths to various assets are defined here.
const PATHS = {
    inputs: {
        icons: [
            'app/assets/icons/**/*'
        ],
        images: [
            'app/assets/images/**/*'
        ],
        index: [
            'app/index.html'
        ],
        javascript: [
            // app
            '!app/**/*.spec.js',
            'app/**/*.module.js',
            'app/**/*!(.module).js'
        ],
        rev: [
            'public/index.html'
        ],
        sass: [
            'app/**/*.scss'
        ],
        templates: [
            '!app/index.html',
            'app/**/*.html'
        ],
    },
    vendors: {
        javascript: [
            'bower_components/ne-swapi/dist/ne-swapi.js',
            'bower_components/identicon/pnglib.js',
            'bower_components/identicon/identicon.js'
        ],
    },
    outputs: {
        css: 'public/css',
        icons: 'public/icons',
        images: 'public/images',
        index: 'public',
        javascript: 'public/js',
        templates: 'public/templates'
    }
};


/* cleans the build directory */
gulp.task('clean', function() {
    return del(['public']);
});

gulp.task('icons', function() {
    return gulp.src(PATHS.inputs.icons)
        .pipe(gulp.dest(PATHS.outputs.icons));
});

gulp.task('images', function() {
    return gulp.src(PATHS.inputs.images)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{ removeViewBox: true }]
        }))
        .pipe(gulp.dest(PATHS.outputs.images));
});

gulp.task('index', function() {
    // copy index html file in app/ to public/
    return gulp.src(PATHS.inputs.index)
        .pipe(gulp.dest(PATHS.outputs.index))
        .pipe(livereload());
});

gulp.task('rev', function() {
    // appends revision for cache busting
    // return gulp.src(PATHS.outputs.index + '/index.html')
    return gulp.src(PATHS.inputs.rev)
        .pipe(rev())
        .pipe(gulp.dest(PATHS.outputs.index));
});

gulp.task('javascript', function() {
    return gulp.src(PATHS.inputs.javascript)
        .pipe(cached('scripts'))
        .pipe(progeny())
        .pipe(babel()).on('error', function(e) {
            console.error(e);
            this.emit('end');
        })
        .pipe(remember('scripts'))
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(concat('app.js'))
        .pipe(gulpif(!argv.production, sourcemaps.write()))
        .pipe(gulp.dest(PATHS.outputs.javascript))
        .pipe(gulpif(argv.production, uglify({ preserveComments: 'license' })))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(PATHS.outputs.javascript))
        .pipe(livereload());
});

gulp.task('vendor-javascript', function() {
    return gulp.src(PATHS.vendors.javascript)
        .pipe(cached('vendor-scripts'))
        .pipe(progeny())
        // .pipe(babel()).on('error', function(e) {
        //     console.error(e);
        //     this.emit('end');
        // })
        .pipe(remember('vendor-scripts'))
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(concat('vendor.js'))
        .pipe(gulpif(!argv.production, sourcemaps.write()))
        .pipe(gulp.dest(PATHS.outputs.javascript))
        .pipe(gulpif(argv.production, uglify({ preserveComments: 'license' })))
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest(PATHS.outputs.javascript))
        .pipe(livereload());
});


/* compiles scss files */
gulp.task('sass', function() {
    // compile sass files then combines all css files
    // creates a non-minified and minified master css
    return gulp.src(PATHS.inputs.sass)
        .pipe(cached('styles'))
        .pipe(progeny())
        .pipe(sassGlob())
        .pipe(sass({
            // includePaths: PATHS.includes.sass
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(concat('app.css'))
        .pipe(gulpif(!argv.production, sourcemaps.write()))
        .pipe(gulp.dest(PATHS.outputs.css))
        .pipe(cssnano())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(PATHS.outputs.css))
        .pipe(livereload());
});


/* live reload on template and partial files */
gulp.task('templates', function() {
    return gulp.src(PATHS.inputs.templates)
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(PATHS.outputs.templates))
        .pipe(livereload());
});


gulp.task('http-server', () => {
    let httpServer = spawn('http-server');
    httpServer.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    httpServer.stderr.on('data', (data) => {
        console.log(`${data}`);
    });
    httpServer.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

gulp.task('default', function(callback) {
    runSequence('build');
});

/* run the serve and watch task when gulp is called without arguments */
gulp.task('serve', function(callback) {
    runSequence('watch', 'http-server');
});

/* builds public files */
gulp.task('build', function(callback) {
    runSequence('clean', ['icons', 'images', 'index', 'vendor-javascript', 'javascript', 'sass', 'templates'], 'rev', callback);
});


/* watches these files for changes and run the task on update */
gulp.task('watch', ['build'], function() {
    livereload.listen();
    gulp.watch(PATHS.inputs.icons, ['icons']);
    gulp.watch(PATHS.inputs.images, ['images']);
    gulp.watch(PATHS.inputs.index, ['index']);
    gulp.watch(PATHS.inputs.javascript, ['javascript']);
    gulp.watch(PATHS.inputs.sass, ['sass']);
    gulp.watch(PATHS.inputs.templates, ['templates']);
});