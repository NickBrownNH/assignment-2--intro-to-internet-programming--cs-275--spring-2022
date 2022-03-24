const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    CSSCompressor = require(`gulp-cssmin`),
    JSCompressor = require(`gulp-jsmin`),
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src([`html/*.html`, `html/**/*.html`]).pipe(htmlValidator());
};

let compressHTML = () => {
    return src([`html/*.html`,`html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressCSS = () => {
    return src([`css/*.css`,`css/**/*.css`])
        .pipe(CSSCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compressJS = () => {
    return src([`js/*.js`,`js/**/*.js`])
        .pipe(JSCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let buildJS = () => {
    return src('js/*.js')
       .pipe(babel())
       .pipe(dest('./transpiled'))
 };

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 100,
        server: {
            baseDir: [
                `js`,
                `css`,
                `html`
            ]
        }
    });

    watch(`html/*.html`, validateHTML)
        .on(`change`, reload);

    watch(`css/*.css`, lintCSS)
        .on(`change`, reload);

    watch(`js/*.js`, lintJS)
        .on(`change`, reload);
};

let build = () => {
    browserSync({
        notify: true,
        reloadDelay: 100,
        server: {
            baseDir: [
                `prod`
            ]
        }
    });
};


exports.buildJS = buildJS;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.HTMLProcessing = series(validateHTML, compressHTML);
exports.serve = series(
    validateHTML,
    lintCSS,
    lintJS,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    compressJS,
    build
);
