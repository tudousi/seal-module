var gulp = require('gulp');
var umd = require('gulp-umd');
gulp.task('default', function() {
    return gulp.src('src/*.js')
    	.pipe(umd({
			dependencies: function (file) {
				return [{
				  name: 'seal-module',
				  amd: 'jQuery',
				  cjs: 'jQuery',
				  global: 'jQuery',
				  param: '$'
				}];
			}
		}))
    	.pipe(gulp.dest('build'));
	/*
    return gulp.src('src/*.js')
        .pipe(umd({
            dependencies: function(file) {
                return [{
                    name: 'moduleName1',
                    amd: 'moduleName1_amd',
                    cjs: 'moduleName1_cjs',
                    global: 'moduleName1_glob',
                    param: 'moduleName1'
                }, {
                    name: 'moduleName2',
                    amd: 'moduleName2_amd',
                    cjs: 'moduleName2_cjs',
                    global: 'moduleName2_glob',
                    param: 'moduleName2'
                }];
            },
			templateName: 'templateName',
        }))
        .pipe(gulp.dest('build'));
	*/
});
