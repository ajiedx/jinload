
const { readFileSync, statSync } = require('fs')
const { writeFile  } = require('fs')
let vs = require('./package.json')
let pf = ''
let fps = [], fpsi = 0

const finds = (path) => {
    console.log(path, fpsi)
    let file

    if (!path.includes('.')) file = readFileSync('./'+path)
    else file = readFileSync(path)
    file = file.toString().split('\n')
    let l = file.length - 1
    for (;;) {
        if (l < 0) break
        else {
            if (file[l].includes('require') && !file[l].includes('Ignore')) {
                if (file[l].includes('/')) {
                    if (!file[l].includes('\"')) {
                        fps[fpsi] = file[l].split('\'')[1]
                        if (pf === '') {
                            pf = fps[fpsi].split('/')
                            console.log(pf)
                            pf = pf.slice(0, pf.length - 1)
                            console.log(pf)
                            pf = pf.join('/')
                            console.log(pf, '----------')
                        }
                        fps[fpsi] = fps[fpsi].split('/')
                        fps[fpsi] = fps[fpsi].pop()
                        console.log(fps[fpsi])
                        fpsi = fpsi + 1
                        if (!fps[fpsi - 1].includes('.js')) fps[fpsi - 1] = fps[fpsi - 1] + '.js'
                        if (pf !== '') fps[fpsi - 1] = pf +'/'+fps[fpsi - 1]
                        finds(fps[fpsi - 1])

                    } else {
                        fps[fpsi] = file[l].split('\"')[1]
                        pf = fps[fpsi].split('/')[1]
                        fpsi = fpsi + 1
                        finds(fps[fpsi])

                    }
                } else {
                    if (!file[l].includes('\"')) {
                        fps[fpsi] = '../'+file[l].split('\'')[1]+'/package.json'

                        let pckg = require(fps[fpsi])
                        if (pckg.build) fps[fpsi] = '../'+file[l].split('\'')[1]+'/'+pckg.build
                        else fps[fpsi] = '../'+file[l].split('\'')[1]+'/'+pckg.main

                        fpsi = fpsi + 1
                    } else {
                        fps[fpsi] = '../'+file[l].split('\"')[1]+'/package.json'

                        let pckg = require(fps[fpsi])
                        if (pckg.build) fps[fpsi] = '../'+file[l].split('\'')[1]+'/'+pckg.build
                        else fps[fpsi] = '../'+file[l].split('\'')[1]+'/'+pckg.main

                        fpsi = fpsi + 1

                    }
                }
            }
            l = l - 1
        }
    }
}

finds(vs.main)
fps[fps.length] = fps[0]
let fpsclone = []
fpsl = fps.length - 1
let re = 0
for (;;) {
    if (fpsl < 0) break
    else {
        fpsclone[re] = fps[fpsl]
    }
    console.log(fpsl, re)
    fpsl = fpsl - 1
    re = re + 1

}

fps = fpsclone

// const fps = ['./node_modules/njsuper/njsuper.js', './src/x1.js']
let files = []

for (let i = 1; i < fps.length; i++) {
    console.log(fps[i], 'n', i)
    files[i] = readFileSync(fps[i])
    files[i] = files[i].toString().split('\n')
    for (var l in files[i]) {
        if (files[i][l].includes('module.exports') || files[i][l].includes('require')) files[i][l] = ''
    }
    files[i] = files[i].join('\n')

}

writeFile('./jinload.js.build', files.join('\n'), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
