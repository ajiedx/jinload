
const { X1 } = require('njx1')

class JinApi extends X1 {
    constructor(dt, objx) {
        super(dt, objx)
        this.elements = {}
        this.options = {}
        this.id = 0
        this.ids = []
    }

    x1viload(text) {
        this.x1(text)
        for (let i in this.ids) {
            if (this.options[this.ids[i]][0] === 'append') {
                let query = document.querySelector(this.options[this.ids[i]][1])
                query.append(this.elements[this.ids[i]])
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


    webView(text) {
        let syntax
        if (this.isIntro('<', text[0])) syntax = 'html'
        else syntax = 'pjm'
        if (syntax === 'pjm') {
            this.x1viload(text)
        }
    }
}

module.exports = {JinApi}
