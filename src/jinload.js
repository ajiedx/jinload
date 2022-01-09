
const { JinCache } = require('./cache')
const { JinStyle } = require('./css')
const { NjSuper } = require('njsuper') // Ignore Export
const { JinCss } = require('./jincss') // Ignore Export


class JinLoad extends JinCache {
    super(dt, objx) {
        this.ext = ''
        this.path = ''
        this.files = {}
        this.styles = {}

    }

    init() {
        this.htmlAttributes()
        document.body.addEventListener('click', function (evt) {
            evt.preventDefault();
            let href
            let execute = false
            let parentUrl = 'no-parent'
            if (evt.target.hasAttribute('href')) href = evt.target.getAttribute('href')
            const addExeHistory = (path, parent) => {
                if (window.history.state.history) window.history.state.history.push(path)
                execute = true
                Object.assign(window.history.state, {prev: path, parent: parent})
                window.history.pushState(window.history.state, '', path)
            }

            if (window.history.state == null || window.history.state.prev == undefined) {
                execute = true
                window.history.pushState({prev: href, history: [href]}, '', href)
            } else if (window.history.state.prev) {
                if (href.includes('.')) {
                    let url = location.pathname.split('/')
                    let last = url[url.length - 1]
                    if ('./' + last !== href) {
                        let path
                        if (window.history.state.parent) {
                            if (window.history.state.parent === url[url.length - 2]) {
                                path = url.slice(0, url.length - 1).join('/') + href.slice(1, href.length)
                                parentUrl = url[url.length - 2]
                                addExeHistory(path, parentUrl)
                            } else {
                                parentUrl = url[url.length - 1]
                                path = location.pathname + href.slice(1, href.length)
                                addExeHistory(path, parentUrl)
                            }
                        } else {
                            parentUrl = url[url.length - 1]
                            path = location.pathname + href.slice(1, href.length)
                            addExeHistory(path, parentUrl)
                        }
                    }
                } else {
                    addExeHistory(href, parentUrl)
                }
            }

            if (evt.target.hasAttribute('nj') && execute) {
                const jinloadvalue = evt.target.getAttribute('nj')
                const history = {href: href.split('/')[1], parent: parentUrl}
                const header = {
                    'EventListener': 'body',
                    'Event': 'click',
                    'JinLoadName': jinloadvalue,
                    'HistoryParent': parentUrl
                }
                jinload.views(jinloadvalue, 'click', header, history)
            }

        })
    }

    load(name, func, ext, state) {
        let perspective = 'GET'
        if (state === 'update') perspective = 'PUT'

        let path
        if (name.includes(ext)) path = '/jinload/' + name
        else path = '/jinload/' + name + '.' + ext

        fetch(path, {
            method: perspective,
            headers: {
            // 'Content-Type': 'text/javascript',
            },
            // body: JSON.stringify(data),
        })
        .then(response => {
            response.text().then(function(text) {
                if (state) {
                    if (state == 'update') {
                        if (ext === 'js') console.log('*****************        '+name+'.js        *****************')
                        else if (ext === 'css') console.log('##################        '+name+'.css        ##################')
                    }
                    func(text)
                    if (state) onJinLoad(state), console.log(state)
                } else {
                    func(text)
                }
            })
        })
        // .then(data => {
        //     console.log('Success:', data)
        // })
        .catch((error) => {
            console.error('Error:', error)
        })
    }

    js(name, state) {

        // if (this.path === '') {
        //     this.path = name.split('/').slice(0, -1).join('/')
        //     name = name.split('/').pop().split('.')[0]
        // }

        this.load(name, eval, 'js', state)

    }

    css(name, state) {
        if (jincss) {
            const runCss = (text) => { if (text) jincss.load(name, text) }
            this.load(name, runCss, 'css', state)
        }
    }



    htmlAttributes() {
        // const html = document.querySelector('html')
        // html.setAttribute('jinload', 'html')

        // const body = document.querySelector('body')
        // body.setAttribute('jinload', 'body')
        const jinloads = [...document.body.querySelectorAll('[nj]')]

        for (const j in jinloads) {
            let jinload = jinloads[j].getAttribute('nj')
            
            if (this.isIntro('load', jinload)) {
                // let element = document.body.querySelector('[jinload='+jinload+']')
                // console.log(element, 'kkkkkkkkkkkkkkk')
                let name = jinload.split('.')[1]
                this.views(name, 'load', {'JinLoadName': name, 'JinLoad': jinload})
                // jinload[j].parentNode(i, jinloads[j])
                this.register(jinloads[j], name)
            }
        }

    }

    rqs(name, path, func, headers, errsp, state) {
        fetch(path, headers).then(response => {
            response.text().then((text) => {
                console.log(text, 'asdasdasdsad')
                func(text)
                if (state) onJinLoad(state), console.log(state)
            })
        }).catch((error) => {
            console.error('JinLoad Fetch Error from "'+ name +'" path: "'+path+ '" '+ errsp + ':', error)
        })
    }



    views(name, state, header, history) {
        let path = location.pathname; let perspective
        if (state === 'click') if (history.parent !== 'no-parent') path = path.split('/').filter(path => history.parent !== path).join('/')
        const resolveView = (text) => {
            if (state) {
                this.webView(text, name)
                console.log(text, 'views'+name+this.filterChars(path, '/')+state)
                this.cache('views'+name+this.filterChars(path, '/')+state, text)
            }
        }

        if (this.cacheHas('views'+name+this.filterChars(path, '/')+state)) {
            this.webView('cached', name)
        } else {
            if (state === 'click') perspective = 'GET'
            else if (state === 'load') perspective = 'PUT'
    
            let headers = {
                'Content-Type': '*/*',
                'Event': state
            }

            Object.assign(headers, header)
    
            this.rqs(name, path, resolveView, {
                method: perspective,
                headers,
            }, 'views from event ' + state, state)
        }
    }

    startReload() {
        window
        if (window.Worker) {
            const worker = new Worker('/jinupdate.js')

            worker.postMessage('http://localhost:8000')
            worker.onmessage = function(event) {
                // console.log(event.data, '')
                if (event.data === 'RELOAD') {
                    location.href = '/'
                } else {
                    if (window.jinload) {
                        this.reloadFileName = event.data.split('/')[0].split('.')[0]
                        this.reloadExt = event.data.split('/')[0].split('.')[1]

                        if (this.reloadExt === 'js') {
                            window.jinload.js(this.reloadFileName, 'update')
                        } else if (this.reloadExt === 'css') {
                            window.jinload.css(this.reloadFileName, 'update')
                        }

                    }
                }

            }
        }
    }
}


jinload = new JinLoad()

function onJinLoad(state) {
    if (state === 'ready') {
        jinload.init()
        let comestas = document.querySelector('#comestas')
        let help = document.querySelector('.hello')
        comestas.click()
        help.click()
        console.log('----------------------------------------')
    }
    if (state === 'jinReload') {
        jinload.startReload()
    }

}


const { NJinLoad, NJinLoads } = require('./load') // Ignore Export

module.exports = {NJinLoad, NJinLoads, JinCss}