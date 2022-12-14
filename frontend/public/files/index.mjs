import fs from 'fs'
import path from 'path'

var files = []
var html = ``
var counter = 0

const walkSync = (dir, callback) => {
    const files = fs.readdirSync(dir)
    files.forEach((file) => {
        const filepath = path.join(dir, file)
        const stats = fs.statSync(filepath)
        if (
            filepath.indexOf('files/node_modules') !== 0
        ) {
            if (stats.isDirectory()) {
                walkSync(filepath, callback)
            } else if (stats.isFile()) {
                callback(filepath, stats)
            }
        }
    })
}

export const saveFile = (filepath) => {
    counter++
    const fileSlugs = filepath.split('/')
    let type = fileSlugs[fileSlugs.length - 1].split('.')[1]
    if (!type) type = ''
    if (type !== 'DS_Store' && type !== 'gitignore' && type.length > 1) {
        html = `${html}<li><a href="#">${filepath}</a>(${type})</li>`
        files.push({
            type,
            filepath,
        })
    }
}

walkSync('./', saveFile)

fs.writeFile(
    'files.json',
    JSON.stringify(files, null, 2),
    (err) => {
        if (err) {
            console.error(err)
            return
        }
    }
)

console.log(`${counter} files found & files.json has been updated`)
