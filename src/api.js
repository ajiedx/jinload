
const { X1 } = require('njx1')

class JinApi extends X1 {
    constructor(dt, objx) {
        super(dt, objx)
        this.vicount = 0
        this.viloads = {}
        this.incomplete = false
        this.vicount = 0
        this.viindex = 0
        this.regElements = {}
    }

    x1viload(text, name) {
        if (text === 'cached') {
            if (this.cacheHas('x1__'+name)) {
                this.createX1Elements(this.cache('x1__'+name), name)
            } else {
                this.x1(text, name)
                // this.assign(this.x1s[name], {id: this.x1id})
                this.cache('x1__'+name, this.x1s[name])
            }
            
        } else {
            this.x1(text, name)
            // this.assign(this.x1s[name], {id: this.x1id})
            this.cache('x1__'+name, this.x1s[name])
        }
        
        this.viloads[name] = {id: this.x1id}
        console.log(this.viloads[name])
        console.log(this.x1s[name])
        
        if (this.ids[this.x1id]) {
            for (let i = this.ids[this.x1id][0]; i < this.ids[this.x1id][1] + 1; i++) {
                if (this.options[i]) {
                    for (const l of this.options[i]) {
                        switch (l[0]) {
                            case 'append':
                                let query = document.querySelector(l[1])
                                query.append(this.elements[i])
                                if (this.vicount > 0) this.viindex = this.viindex - 1
                                break
                            case 'after':
                                    if (this.isIntro('load', l[1])) {
                                        let nm = l[1].split('.')
                                        this.views(nm[1], 'load', {'JinLoadName': nm[1], 'JinLoad': l[1]})
                                        Object.assign(this.viloads[name], {after: nm[1]})
                                        this.vicount = this.vicount + 1
                                    }
                                    break
                            case 'before':
                                if (this.isIntro('load', l[1])) {
                                    let nm = l[1].split('.')
                                    this.views(nm[1], 'load', {'JinLoadName': nm[1], 'JinLoad': l[1]})
                                    Object.assign(this.viloads[name], {before: nm[1]})
                                    this.vicount = this.vicount + 1
                                }
                                break
                            case 'nj':
                                if (l[1] === 'views') {
                                    this.views(l[1], 'load', {'JinLoadName': l[1], 'JinLoad': l[1]})
                                    Object.assign(this.viloads[name], {name: name, view: l[1]})
                                    this.vicount = this.vicount + 1
                                }
                                break
                            default:
                                break
                        }
                        
                    }
                }
                    
            }
        }

        

    }

    createElements(wrap, elements) {
        if (elements) {
            // console.log(wrap)
            let wrapper = false, element
            for (const i in elements) {
                elements[i][1] = this.splitLeft(elements[i][1], ' :=')
                if (wrapper) {
                    element = document.createElement(elements[i][0])
                    for (const l in elements[i][1]) {

                        if(this.isIntro('=', elements[i][1][l])) {
                            element.setAttribute(elements[i][1][l - 1], this.filterChars(elements[i][1][l], '='))
                        } else if(this.isIntro(':', elements[i][1][l])) {
                            element.innerText = this.filterChars(elements[i][1][l], ':')
                        }
                    }

                    wrap.append(element)
                }
                if (elements[i][0] === wrap[0]) {
                    console.log(elements[i])
                    wrap = document.createElement(wrap[0]); wrapper = true;
                    if (elements[i][1].length > 1) {
                        for (const l in elements[i][1]) {
                            if(this.isIntro('=', elements[i][1][l])) {
                                console.log(elements[i][1][l - 1], this.filterChars(elements[i][1][l], '='), '---')
                                wrap.setAttribute(elements[i][1][l - 1], this.filterChars(elements[i][1][l], '='))
                            }
                            // console.log(element)
                        }
                    }
                }


            }
            console.dir( wrap)
        }

    }

    register(element, name) {
        this.regElements[name] = element
    }

    loadNappend() {
       
        for (const i in this.viloads) {
            if (this.viloads[i].name && !this.viloads[i].complete) {
                if (this.viloads[i].after) {
                    let x1id = this.viloads[this.viloads[i].after].id
                    for (let x = this.ids[x1id][0]; x < this.ids[x1id][1] + 1; x++) {
                        this.regElements[this.viloads[i].name].append(this.elements[x])
                    }
                }
                
                if (this.viloads[i].view) {
                    let x1id = this.viloads[this.viloads[i].view].id
                    for (let x = this.ids[x1id][0]; x < this.ids[x1id][1] + 1; x++) {
                        this.regElements[this.viloads[i].name].append(this.elements[x])
                    }
                }
                
                if (this.viloads[i].before) {
                    let x1id = this.viloads[this.viloads[i].before].id
                    for (let x = this.ids[x1id][0]; x < this.ids[x1id][1] + 1; x++) {
                        this.regElements[this.viloads[i].name].append(this.elements[x])
                    }
                }
                this.viloads[i].complete = true
                this.regElements[this.viloads[i].name].setAttribute('load', 'complete')
            }
        }
    }

    webView(text, name) {
        let syntax
        if (this.isIntro('<', text[0])) syntax = 'html'
        else syntax = 'x1'
        if (syntax === 'x1') {
            console.log(text, 'asdasdasd', name)
            this.x1viload(text, name)

            if (this.vicount > 0) {
                this.viindex = this.viindex  + 1
                if (this.viindex == this.vicount + 1) {
                    this.vicount = 0
                    this.index = 0
                    this.loadNappend()           
                }
            }
        }
    }
}

module.exports = {JinApi}
