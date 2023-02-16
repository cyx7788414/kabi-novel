const { dest, series, src } = require("gulp");
const { createProject } = require("gulp-typescript");
let tsProject = createProject("tsconfig.json");
const browserify = require("browserify");
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const inject = require('gulp-inject');
const clean = require('gulp-clean');

function cleanDir(cb) {
    return src(['dist', 'temp']).pipe(clean());
}

function copyHtml(cb) {
    return src('src/index.html')
        .pipe(dest("dist"));
};

function buildTs(cb) {
    // place code for your default task here
    //   cb();
    // return tsProject.src()
    //     .pipe(tsProject())
    //     .js.pipe(dest("dist"));
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
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

exports.default = series(cleanDir, buildTs, collect);