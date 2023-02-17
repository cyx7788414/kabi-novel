const { dest, series, src, parallel } = require("gulp");
const { createProject } = require("gulp-typescript");
let tsProject = createProject("tsconfig.json");
const browserify = require("browserify");
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const inject = require('gulp-inject');
const clean = require('gulp-clean');
const less = require('gulp-less');
const cssmin = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

function cleanDir(cb) {
    return src(['dist/*', 'temp/*']).pipe(clean());
}

function copyHtml(cb) {
    return src('src/index.html')
        .pipe(dest("dist"));
};

function buildLess(cb) {
    return src('src/style.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(dest('temp'));
}

function buildTs(cb) {
    return browserify({
        basedir: '.',
        debug: false,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        // .pipe(sourcemaps.write('./'))
        .pipe(dest("temp"));
}

function collect(cb) {
    var target = src('./src/index.html');
    var sources = src(['./temp/**/*.js', './temp/**/*.css'], { read: true });

    return target.pipe(inject(sources, {
        transform: function (filePath, file) {
            if (filePath.slice(-3) === '.js') {
                return '<script>' + file.contents.toString('utf8') + '</script>';
            }
            if (filePath.slice(-4) === '.css') {
                return '<style>' + file.contents.toString('utf8') + '</style>';
            }
            return file.contents.toString('utf8');
        }
    }))
        .pipe(dest('./dist'));
}

exports.default = series(cleanDir, parallel(buildTs, buildLess), collect);