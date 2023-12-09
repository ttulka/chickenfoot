const BEGIN = '⠿'
const REG0 = ['⠈', '⠘', '⠠', '⠰']
const REG1 = ['⠉', '⠊', '⠌', '⠙', '⠚', '⠜', '⠡', '⠢', '⠤', '⠩', '⠬', '⠱', '⠲', '⠴', '⠹', '⠼']
const REG2 = ['⠋', '⠍', '⠎', '⠛', '⠝', '⠞', '⠣', '⠥', '⠦', '⠫', '⠮', '⠳', '⠵', '⠶', '⠽']
const REG3 = ['⠏', '⠟', '⠧', '⠯', '⠷']
const COND_U = ['⠘', '⠙', '⠚', '⠜', '⠛', '⠝', '⠞', '⠟']
const COND_D = ['⠰', '⠱', '⠲', '⠴', '⠳', '⠵', '⠶', '⠷']
const INC = ['⠈', '⠉', '⠊', '⠌', '⠋', '⠍', '⠎', '⠏']
const DEC = ['⠠', '⠡', '⠢', '⠤', '⠦', '⠥', '⠣', '⠧']
const NN = '⠩'
const NE = '⠹'
const EE = '⠽'
const SE = '⠼'
const SS = '⠬'
const SW = '⠮'
const WW = '⠯'
const NW = '⠫'
const DIR = [NN, NW, NE, SS, SW, SE, WW, EE]
const ALL = [BEGIN, ...COND_U, ...COND_D, ...INC, ...DEC, ...DIR]
// unused: '⠐', '⠨', '⠸', '⠁', '⠂', '⠄', '⠑', '⠒', '⠔', '⠪', '⠺', '⠃', '⠆', '⠓', '⠕', '⠖', '⠭', '⠻', '⠾', '⠇', '⠗'

const interpret = (program, reg0, reg1, reg2, reg3) => {
    // initialize
    const r = [reg0 ? reg0 : 0, reg1 ? reg1 : 0, reg2 ? reg2 : 0, reg3 ? reg3 : 0]
    const p = parse(program)

    // execute
    const i = begin(p)
    while (true) {
        const idx = i.toString()
        if (!p.has(idx)) break

        const c = p.get(idx)
        if (BEGIN === c) {
            i.c++
            continue
        }
        if (COND_U.includes(c)) {
            const v = r[regIndex(c)]
            if (!v) i.r--
            i.c++
            continue
        }
        if (COND_D.includes(c)) {
            const v = r[regIndex(c)]
            if (!v) i.r++
            i.c++
            continue
        }
        if (INC.includes(c)) {
            r[regIndex(c)]++
            i.c++
            continue
        }
        if (DEC.includes(c)) {
            const ri = regIndex(c) 
            if (r[ri] > 0) r[ri]--
            i.c++
            continue
        }
        if (NN === c) {
            i.r--
            continue
        }
        if (NE === c) {
            i.r--
            i.c++
            continue
        }
        if (EE === c) {
            i.c++
            continue
        }
        if (SE === c) {
            i.r++
            i.c++
            continue
        }
        if (SS === c) {
            i.r++
            continue
        }
        if (SW === c) {
            i.r++
            i.c--
            continue
        }
        if (WW === c) {
            i.c--
            continue
        }
        if (NW === c) {
            i.r--
            i.c--
            continue
        }
        throw new Error('INVALID_CMD')
    }
    return r
}

function regIndex(cmd) {
    if (REG0.includes(cmd)) return 0
    if (REG1.includes(cmd)) return 1
    if (REG2.includes(cmd)) return 2
    if (REG3.includes(cmd)) return 3
    throw new ERROR('REG_INDEX_INVALID')
}

function parse(program) {
    const p = new Map()    // parsed program
    const prog = program.replaceAll(/\r\n/g, '\n') // remove win newlines
    let begin = false
    let row = 0, col = 0
    for (let c of prog) {
        if (c === '\n') {
            row++
            col = 0
            continue
        }
        if (BEGIN === c) {
            if (begin) throw new Error('BEGIN_UNAMBIGUOUS')
            begin = true
        }
        col++
        if (!ALL.includes(c)) continue // ignore
        p.set(row + ',' + col, c)
    }
    if (!begin) throw new Error('BEGIN_NOT_FOUND')
    return p
}

function begin(program) {
    for (var [k, v] of program) {
        if (v === BEGIN) return index(k)
    }
}

function index(idxStr) {
    const i = idxStr.split(',')
    return new Index(i[0], i[1])
}

class Index {
    constructor(r, c) {
        this.r = r
        this.c = c
    }
    toString() {
        return this.r + ',' + this.c
    }
}

module.exports = interpret