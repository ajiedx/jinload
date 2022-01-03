const { NjSuper } = require('njsuper') // Ignore Export

class JinCss extends NjSuper {
    constructor(dt, objx) {
        super(dt, objx)
    }

    json(css, state) {
        this.response = 'JinCss: '+state+'\r\n\r\n { '
        let line = ''

        for (const l in css) {
            let li = css[l].length - 1
            for (const i in css[l]) {
                if (i == li) {
                    line = '"'+css[l][i][2]+'": ' + css[l][i][1]
                    this.response = this.response + line + ' }\r\n'
                    line = ''
                }  else {
                    line = '"'+css[l][i][2]+'": ' + css[l][i][1]
                    this.response = this.response + line + ',\r\n'
                    line = ''
                }
            }
        }
    }

    indexifyCss(file) {

        this.load = [[]], this.li = 0, this.i = 0, this.innew = [[]], this.exists = false
        let iw = 0, f = false, double = '', brackets = 1, il = false
        this.min = 0, this.down = false, this.index = 0
        if (this.il) {
            this.il[0][1] = 0
            for (let i = 1; i < this.il.length; i++) {
                this.il[i][1] = this.il[i-1][2]
            }
            console.log(this.il)
        }
        const flow = (dbl, index) => {

            if (this.incss[this.li][index] && this.incss[this.li][index][0] === double) this.exists = true
            else {
                let li = 0
                if (this.il[this.li][2] - this.il[this.li][0] + 1 > index) {
                    let nd = index
                    for (let i = 0; i < 6; i++) {
                        if (this.incss[this.li][nd]) {
                            console.log(this.incss[this.li][nd])
                            if (this.incss[this.li][nd][0] !== dbl) li = li + 1
                            else {
                                f = true; this.exists = true;  break; 
                            }
                            nd = nd + 1
                        }

                    }
                    
                }

                if (f) {
                    // console.log(index)
                    for (let de = 0; de < li; de++) {
                        this.incss[this.li][index][2] = Number('-'+this.incss[this.li][index][1])
                        if (!this.innew[this.li]) this.innew[this.li] = []
                        this.innew[this.li][iw] = []
                        this.innew[this.li][iw] = this.incss[this.li][index]
                        index = index + 1, iw = iw + 1
                    }
                    this.il[this.li][1] = this.il[this.li][1] + li;
                    this.index = index
                    // this.load[this.li][index] = []
                    // this.load[this.li][index][1] =

                } else {
                    this.li = this.li + 1
                    if (this.incss[this.li]) {
                        let sm = false
                        if (!this.il[this.li]) this.il[this.li] = [], this.il[this.li][0] = this.il[this.li - 1][2], this.il[this.li][1] = this.il[this.li - 1][2]
                        // console.log( this.il[this.li][1],  this.il[this.li][2], this.il[this.li][1] < this.il[this.li][2], this.li)
                        if (this.il[this.li + 1]) {
                            if (this.il[this.li][1] == this.il[this.li][2]) {
                                if (this.incss[this.li + 1][this.il[this.li + 1][2] - this.il[this.li + 1][1]]) {
                                    if (this.incss[this.li + 1][this.il[this.li + 1][2] - this.il[this.li + 1][1]][1] == this.il[this.li][1]) {
                                        console.log(this.li, 'asdlalsdlasld')
                                        sm = true, this.li = this.li + 1, this.index = this.il[this.li][1] + 1
                                        // console.log(dbl, this.il[this.li + 1][2] - this.il[this.li + 1][1], this.incss[this.li + 1][this.il[this.li + 1][2] - this.il[this.li + 1][1]][1])
                                    }
                                }
                            }
                        }
                        if (sm) {
                            flow(dbl, this.index)
                            sm = false
                        }
                        else if (!this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]]) {
                            let br = false
                            if (this.il[this.li + 1]) {
                                if (this.incss[this.li + 1][0][1] == this.il[this.li][1]) this.index = this.incss[this.li + 1][this.incss[this.li + 1].length - 1][1], br = true
                                
                            } if (br) { flow(dbl, this.index), br = false } else {
                            this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]] = []
                            this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]][0] = dbl
                            this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]][1] = this.il[this.li][1]
                            index = this.il[this.li][1] - this.il[this.li][0]
                            this.down = true }
                        } else {
                            this.index  = this.il[this.li][1] - this.il[this.li][0]
                            // console.log(this.index, this.li, this.il[this.li][1], this.il[this.li][0], 'aisuodasuhdouasd', dbl)
                            flow(dbl, this.index)
                        }

                    }
                    else {
                        if (!this.il[this.li]) this.il[this.li] = [], this.il[this.li][0] = this.il[this.li - 1][2], this.il[this.li][1] = this.il[this.li - 1][2]
                        this.incss[this.li] = []

                        this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]] = []
                        this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]][0] = dbl
                        this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]][1] = this.il[this.li][1]
                        index = this.il[this.li][1] - this.il[this.li][0]

                        this.down = true
                    }

                }
            }

        }
        for (const i in file) {
            if (file[i] === '{') {
                if (brackets == 1) {
                    if (this.incss) {
                        if (!this.index) this.index = this.il[this.li][1]
                        flow(double, this.index, 0)
                    } else {
                        this.load[this.li][this.i] = []
                        this.load[this.li][this.i][0] = double
                        this.load[this.li][this.i][1] = this.i
                    }
                    brackets = 2
                } else {
                    brackets = 0
                    break
                }

            }
            if (file[i] === '}') {
                if (brackets == 2) {
                    if (this.exists) {
                        if (this.incss[this.li][this.index][2] !== double  + '}') {
                            this.incss[this.li][this.index][2] = double  + '}'
                            if (!this.innew[this.li]) this.innew[this.li] = []
                            this.innew[this.li][iw] = this.incss[this.li][this.index]
                            iw = iw + 1
                        } else {

                        }

                        this.il[this.li][1] = this.il[this.li][1] + 1
                        this.index = this.il[this.li][1] - this.il[this.li][0]
                        this.li = this.li - this.li
                        this.exists = false
                    } else if (this.down) {
                        if (this.incss[this.li][this.il[this.li][1]]) {
                            if (this.incss[this.li][this.il[this.li][1]][2] !== double + '}') {
                                this.il[this.li][1] = this.il[this.li][1] + 1
                                this.li = this.li - this.li
                            } else {
                                this.il[this.li][1] = this.il[this.li][1] + 1
                                this.li = this.li - this.li
                            }
                        } else {
                            if (!this.incss[this.li]) this.incss[this.li] = []
                            this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]][2] = double + '}'
                            if (!this.innew[this.li]) this.innew[this.li] = []
                            this.innew[this.li][iw] = this.incss[this.li][this.il[this.li][1] - this.il[this.li][0]]
                            iw = iw + 1
                            this.il[this.li][1] = this.il[this.li][1] + 1
                            this.index = this.il[this.li][1] - this.il[this.li][0]
                            this.li = this.li - this.li

                        }

                        this.down = false
                    } else {
                        console.log(double)
                        this.load[this.li][this.i][2] = double  + '}'
                        this.i = this.i + 1
                    }

                    double = ''
                    brackets = 1
                } else {
                    brackets = 0
                    break
                }
            }  else if(!file[i].match(/[\n\r\t]/)) {
                double = double + file[i]
            }
        }
        if (this.il) {
            // for (const i in this.il) {
            //     // this.lindex = this.il[i][2]
            //     if (this.il[i][2] > this.il[i][1]) {
            //         let fi = this.il[i][2] - this.il[i][0]
            //         this.incss[i][this.il[i][2] - this.il[i][0]] = ['']
            //         flow('', this.il[i][1])

            //         delete this.incss[i][this.il[i][2] - this.il[i][0]]
            //     }
            // }

            for (let i = 0; i < this.il.length; i++) {
                this.il[i][2] = this.il[i][1]
            }
        }


        if (!this.incss) {
            this.il = [[]]
            if (brackets != 0) this.json(this.load, 'First Load'), this.incss = this.load, this.il[0][1] = this.i, this.il[0][0] = 0, this.il[0][2] = this.i
            else this.response = 'JinCss: No Brackets\r\n\r\n', console.log('Close The Brackets')
        } else if (this.innew) {
            // console.log(this.incss)
            // this.output(this.innew)
            
            if (!this.innew[0]) this.response = 'JinCss: No Changes\r\n\r\n'
            if (brackets != 0 && this.innew[0]) this.json(this.innew, 'Load')
            else this.response = 'JinCss: No Brackets\r\n\r\n', console.log('Close The Brackets')
        }
    }
}


module.exports = {JinCss}
