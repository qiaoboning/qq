

//引入包 ---
var gulp     = require("gulp"),
    sass     = require("gulp-sass"),//编译sass
    uglify   = require("gulp-uglify"),//压缩js文件
    imagemin = require("gulp-imagemin"),//压缩图片
    connect  = require("gulp-connect");//自动刷新
//拷贝html文件
gulp.task("copy-html",function(){
    gulp.src("./*.html")
        .pipe(gulp.dest("dist"));
});
//编译sass(nested，expanded，compact，compressed四种格式)
gulp.task("sass",function(){
    gulp.src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
});
//压缩图片
gulp.task("imagemin",function(){
    gulp.src("src/imgs/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/imgs"))
});
//压缩js文件
gulp.task("uglify",function(){
    gulp.src("src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
});


//刷新任务
gulp.task('connect',['sass','uglify','imagemin'],function(){
    gulp.src('./*.html').pipe(connect.reload());
})
//默认任务
gulp.task('default',['sass','uglify','imagemin'],function(){
    //开启服务器
    connect.server({
        livereload:true
    });

    // 监听命令
    gulp.watch(['./*.html','./src/scss/*.scss','./src/js/*.js'],['connect'])
 
});