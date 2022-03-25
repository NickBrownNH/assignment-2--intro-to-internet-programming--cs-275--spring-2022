const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    CSSCompressor = require(`gulp-cssmin`),
    jsCompressor = require(`gulp-jsmin`),
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src([`dev/html/*.html`, `dev/html/**/*.html`])
    .pipe(htmlValidator());
};

let compressHTML = () => {
    return src([`dev/html/*.html`,`dev/html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/html`));
};

let compressCSS = () => {
    return src([`dev/css/*.css`,`dev/css/**/*.css`])
        .pipe(CSSCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/css`));
};

let compressJS = () => {
    return src([`dev/js/*.js`,`dev/js/**/*.js`])
        .pipe(jsCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/js`));
};

let lintCSS = () => {
    return src(`dev/css/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`dev/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJS = () => {
    return src('dev/js/*.js')
       .pipe(babel())
       .pipe(dest('./temp/js'))
 };

 let transpileJSForProd = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });

    watch(`dev/html/*.html`, validateHTML)
        .on(`change`, reload);

    watch(`dev/css/*.css`, lintCSS)
        .on(`change`, reload);

    watch(`dev/js/*.js`, lintJS)
        .on(`change`, reload);
};

exports.transpileJS = transpileJS;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.CSSCompressor = compressCSS;
exports.JSCompressor = compressJS;
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
    transpileJSForProd
);
