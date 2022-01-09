
const { JinApi } = require('./api')
class JinCache extends JinApi {
    constructor(dt, objx) {
        super(dt, objx)
        this.cached = {}
    }

    cacheHas(name) {
        if (localStorage.hasOwnProperty(name)) return true
        else false
    }

    cache(name, value) {
        if (!value && localStorage.hasOwnProperty(name)) {
            console.log(JSON.parse(localStorage.getItem(name)))
            console.log(JSON.parse(localStorage.getItem(name)))
            return JSON.parse(localStorage.getItem(name))
        } else if (this.typeof(value) === 'string') {
            console.log(name)
            localStorage.setItem(name, value)
        } else if (this.typeof(value) === 'object') {
            console.log(name)
            localStorage.setItem(name, JSON.stringify(value))
            localStorage.getItem(name)
        }
    }
}

module.exports = {JinCache}