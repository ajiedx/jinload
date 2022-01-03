const {NjSuper} = require('njsuper') // Ignore Export
const {JinCss} = require('./jincss') // Ignore Export

class NJinLoad extends NjSuper {
    constructor(dt, objx) {
        super(dt, objx)

        if (dt.lastLoads) {
            for (const i in this.dt.lastLoads) {
                this[i] = this.dt.lastLoads[i]
            }

        }
    }

    rsp(name) {
        console.log(this, name)
        if (this[name]) {
            return this[name]
        } else {
            return false
        }
    }
}

class NJinLoads extends NjSuper {
    constructor(dt, objx) {
        super(dt, objx)
        if (this.construct) {
            for (const i in this.loads) {
                this[i] = new NJinLoad(i, {load: this.loads[i]})
            }

            delete this.loads
        }
    }

    css (file) {
        if (this[file.name]) {
            this[file.name].indexifyCss(file.content)
            return this[file.name].response
        } else {
            this[file.name] = new JinCss(file.name)
            this[file.name].indexifyCss(file.content)
            return this[file.name].response
        }
    }

}

module.exports = {NJinLoads, NJinLoad}