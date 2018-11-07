/*
 * @Author: baizn
 * @Date: 2018-11-07 14:57:57
 * @LastEditors: baizn
 * @LastEditTime: 2018-11-07 17:02:56
 * @Description: 开发框架脚手架
 */

// 指定脚本的执行程序
// #!/usr/bin/env node
'use strict';

// require dependiencies
var program = require('commander');
var vfs = require('vinyl-fs')
var through = require('through2')
var chalk = require('chalk')
var fs = require('fs-extra')
var path = require('path')

// 定义版本号及命令选项
program.version('1.0.0')
    .option('-i --init [name]', 'init a new project', 'projectName')

program.parse(process.argv)

if(program.init) {
    var projectPath = path.resolve(program.init)
    var projectName = path.basename(projectPath)

    console.log('Start to init a new project in ')

    fs.ensureDirSync(projectName)

    var cwd = path.join(__dirname, '../templates/hyfe-react')

    vfs.src(['**/*', '!node_moudles/**/*'], {cwd: cwd, cwdbase: true, dot: true})
        .pipe(through.obj(function(file, enc, callback) {
            if(!file.stat.isFile()) {
                return callback()
            }
            this.push(file)
            return callback()
        }))
        .pipe(vfs.dest(projectPath))
        .on('end', function() {
            console.log('Installing packages......')
            process.chdir(projectPath)
            require('../lib/index')
        })
        .resume()
}