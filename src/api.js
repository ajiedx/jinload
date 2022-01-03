
const { X1 } = require('njx1')

class JinApi extends X1 {
    constructor(dt, objx) {
        super(dt, objx)
        this.vicount = 0
        this.viloads = {}
    }

    x1viload(text, name) {

        this.x1(text, name)
        this.viloads[name] = {id: this.x1id}
        this.output(this.ids)
        if (this.ids[this.x1id]) {
            for (let i = this.ids[this.x1id][0]; i < this.ids[this.x1id][1] + 1; i++) {
                console.log(this.options[i], '00000000000000000000000000000')
                if (this.options[i]) {
                    for (const l of this.options[i]) {
                        switch (l[0]) {
                            case 'append':
                                let query = document.querySelector(l[1])
                                query.append(this.elements[i])
                                break
                            case 'before':
                                if (this.isIntro('load', l[1])) {
                                    let nm = l[1].split('.')
                                    this.views(nm[1], 'load', {'JinLoadName': nm[1], 'JinLoad': l[1]})
                                    Object.assign(this.viloads[name], {before: nm[1]})
                                }
                                break
                            case 'jinload':
                                if (l[1] === 'views') {
                                    this.views(l[1], 'load', {'JinLoadName': l[1], 'JinLoad': l[1]})
                                    Object.assign(this.viloads[name], {name: name, view: l[1]})
                                }
                            case 'after':
                                if (this.isIntro('load', l[1])) {
                                    let nm = l[1].split('.')
                                    this.views(nm[1], 'load', {'JinLoadName': nm[1], 'JinLoad': l[1]})
                                    Object.assign(this.viloads[name], {after: nm[1]})
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
                console.log(elements[i][1])
                if (wrapper) {
                    element = document.createElement(elements[i][0])
                    for (const l in elements[i][1]) {

                        if(this.isIntro('=', elements[i][1][l])) {
                            // console.log(elements[i][1][l - 1], this.filterChars(elements[i][1][l], '='), '---')
                            element.setAttribute(elements[i][1][l - 1], this.filterChars(elements[i][1][l], '='))
                        } else if(this.isIntro(':', elements[i][1][l])) {
                            // console.log(this.filterChars(elements[i][1][l], ':'), '___')
                            element.innerText = this.filterChars(elements[i][1][l], ':')
                        }
                        // console.log(element)
                    }

                    wrap.append(element)
                }
                if (elements[i][0] === wrap[0]) {
                    console.log(elements[i])
                    wrap = document.createElement(wrap[0]); wrapper = true;
                    if (elements[i][1].length > 1) {
                        console.log(elements[i][1].length )
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


    webView(text, name) {
        let syntax
        if (this.isIntro('<', text[0])) syntax = 'html'
        else syntax = 'pjm'
        if (syntax === 'pjm') {
            this.x1viload(text, name)
            this.vicount = this.vicount + 1

            if (this.vicount > 3) {
                this.vicount = 0
                console.log(this.elements)
                for (const i in this.viloads) {
                    if (this.viloads[i].name) {
                        let body = document.querySelector('body')
                        if (this.viloads[i].after) {
                            let x1id = this.viloads[this.viloads[i].after].id
                            console.log(x1id, 'asdkaskdkaskdkas')
                            for (let i = this.ids[x1id][0]; i < this.ids[x1id][1] + 1; i++) {
                                console.log(this.elements[i], 'kkkkkkkkkkkkkkkkkk')
                                body.append(this.elements[i])
                            }
                        }
                        
                        if (this.viloads[i].view) {
                            let x1id = this.viloads[this.viloads[i].view].id
                            console.log(this.ids[x1id])
                            for (let i = this.ids[x1id][0]; i < this.ids[x1id][1] + 1; i++) {
                                console.log(this.elements[i], 'kkkkkkkkkkkkkkkkkk')
                                body.append(this.elements[i])
                            }
                        }
                        
                        if (this.viloads[i].before) {
                            let x1id = this.viloads[this.viloads[i].before].id
                            console.log(this.ids[x1id])
                            for (let i = this.ids[x1id][0]; i < this.ids[x1id][1] + 1; i++) {
                                console.log(this.elements[i], 'kkkkkkkkkkkkkkkkkk')
                                body.append(this.elements[i])
                            }
                        }
                    }
                }
               
            }
            
        }
    }
}

module.exports = {JinApi}
