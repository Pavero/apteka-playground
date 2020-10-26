let config = {
  ftp: {
    host: '62.109.21.9',
    user: 'apteka',
    password: '1D0m7I2r',
    url: '/web/polygon.tirkai.ru'
  }
};

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let less = require('gulp-less');
let minifyCSS = require('gulp-minify-css');
let gutil = require('gulp-util');
let autoprefixer = require('gulp-autoprefixer');
let ftp = require('vinyl-ftp');
let rigger = require('gulp-rigger');
let notify = require("gulp-notify");
let plumber = require("gulp-plumber");

gulp.task('js', function() {
  gulp.src([
              './src/js/jquery.min.js',
              './src/js/jquery-ui.min.js',
              './src/js/jquery-ui.touch-punch.js',
              './src/js/jquery.custom-scroll.min.js',
              './src/js/jquery.fancybox.min.js',
              './src/js/jquery.floatit.js',
              './src/js/jquery.maskedinput.js',
              './src/js/waves.min.js',
              './src/js/m-config.js',
              './src/js/m-service.js',
              './src/js/m-init.js',
              './src/js/m-template.js',
              './src/js/m-search.js',
              './src/js/m-tabs.js',
              './src/js/m-geo.js',
              './src/js/m-validate.js',
              './src/js/toast.js',
              './src/js/houston-we-have-a-problem.js',
              './src/js/vm-geo.js',
              './src/js/vm-main.js',
              './src/js/debug.js',
              './src/js/storage.js',
              './src/js/map.js',
              './src/js/main-page.js',
              './src/js/common.js',
              './src/js/product.js',
              './src/js/ui-input.js',
              './src/js/template.js',
              './src/js/catalog.js',
              './src/js/order.js',
              './src/js/profile.js',
              './src/js/cart.js',
              './src/js/minicart.js',
              './src/js/thanks.js',
              './src/js/feedback.js'
      ])
    .pipe(concat('./script.min.js'))
    /*
    .pipe(babel({
        presets: ['env']
    }))
    .on('error',function (err) {
      const message = err.message || '';
        const errName = err.name || '';
        const codeFrame = err.codeFrame || '';
        gutil.log(gutil.colors.red.bold('[JS babel error]')+' '+ gutil.colors.bgRed(errName));
        gutil.log(gutil.colors.bold('message:') +' '+ message);
        gutil.log(gutil.colors.bold('codeframe:') + '\n' + codeFrame);
        this.emit('end');
    })
    */
    //.pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('less', function () {
  gulp.src('./src/css/style.less')
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(minifyCSS())
  .pipe(gulp.dest("./css"));
});

gulp.task('default',['less','js']);



gulp.task( 'deploy', function () {
  var connect = ftp.create({
    host: config.ftp.host,
    user: config.ftp.user,
    password: config.ftp.password,
    parallel: 10,
    log: gutil.log
  });
  let globs = [
      'css/**',
      'js/**',
      'data/**',
  ];
  return gulp.src( globs, { base: './', buffer: false } )
      .pipe(connect.newer(config.ftp.url))
      .pipe(connect.dest(config.ftp.url));
});

gulp.watch('./src/css/*.less', ['less']);
gulp.watch('./src/js/*.js', ['js']);
