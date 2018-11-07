var which = require('which')
const chalk = require('chalk')

const childProcess = require('child_process')

function runCmd(cmd, args, fn) {
    args = args || []
    let runner = childProcess.spawn(cmd, args, {
        stdio: 'inherit'
    })
    runner.on('close', function (code) {
        if(fn) {
            fn(code)
        }
        process.exit(code)
    })
}

function findNpm() {
    const npms = ['tnpm', 'cnpm', 'npm']
    for(let i = 0, len = npms.length; i < len; i++) {
        try {
            // 查找环境变量下指定的可执行文件的第一个实例
            which.sync(npms[i])
            console.log(`use npm: ${npms[i]}`)
            return npms[i]
        } catch (error) {
        }
    }
    throw new Error(chalk.red('Not found NPM, please install NPM'))
}

const npm = findNpm()
runCmd(which.sync(npm), ['install'], function() {
    console.log(`${npm} install completed!`)
})