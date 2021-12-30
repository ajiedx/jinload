const {NjSuper} = require('njsuper') // Ignore Export

class JinStyle {
  constructor(name) {
    const style = document.createElement('style')
    document.head.appendChild(style)
    style.setAttribute('jinstyle', name)
    this.style = style.sheet

    this.css = {}
    this.incss = {}
  }

  
  indexify(i, index, prop) {
    let line = ''
    let value = ''
    for (const l in i) {
      if (i[l] === '{') {
        this[prop][index] = {name: line.trim()}
        line = ''
        console.log(line)
      } else if (i[l] === ':') {  
        value = line.trim()
        console.log(line)
        line = ''
      } else if (i[l] === ';') {  
        Object.assign(this[prop][index], {[value]: line.trim()})
        console.log(line)
        line = ''
      } else {
        line = line + i[l]
      }
    }
    if (prop === 'incss') this[prop].indexify = true
  }

  load(file) {
    let json = JSON.parse(file)
    this.incss = {}
    if (this.style.cssRules.length == 0) {
      for (const i in json) {
        this.style.insertRule(i, json[i])
        this.indexify(i, json[i], 'css')
      }
    } else if (this.css) {
      let exists = false
      for (const i in json) {
        if (this.css[json[i]]) {
          if (isNaN(i)) {
            this.indexify(i, json[i], 'css')
            this.indexify(i, json[i], 'incss')
          } else {
            this.indexify('-1 {}', json[i], 'css')
            this.indexify('-1 {}', json[i], 'incss')
          }
          exists = true
        }
        if (!exists) {
          this.style.insertRule(i, json[i])
          this.indexify(i, json[i], 'css')
          exists = false
        }
      }
      if (this.incss.indexify) {
        delete this.incss.indexify
        console.log(this.incss)
        for (const i in this.incss) {
          if (this.incss[i].name === '-1') {
            this.style.cssRules[i].style = {}
            console.log()
          } else {
            for (const l in this.incss[i]) {
              if (l !== 'name') {
                this.style.cssRules[i].styleMap.set(l, this.incss[i][l])
              }
            }
          }
          
        }
      }
    }
  }

}

class JinCss extends NjSuper {
    constructor(dt, objx) {
        super(dt, objx)
        
        this.styles = {}

    }

    load(name, file) {

      if (!this.styles[name]) {
        this.styles[name] = new JinStyle(name)
        this.styles[name].load(file)

      } else {
        this.styles[name].load(file)
      }


    }
}

// let stylesheet = new CSSStyleDeclaration()
// console.log(stylesheet)

// .catch(err => {
// console.error('Failed to replace styles:', err);
// });

jincss = new JinCss()

module.exports = {JinStyle}