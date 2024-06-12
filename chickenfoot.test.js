const chickenfoot = require('./chickenfoot')

test('error: no begin', () => {
    expect(() => chickenfoot('')).toThrow('BEGIN_NOT_FOUND')
})

test('error: begin unambiguous', () => {
    expect(() => chickenfoot('⠿⠿')).toThrow('BEGIN_UNAMBIGUOUS')
    expect(() => chickenfoot('⠿⠿⠿')).toThrow('BEGIN_UNAMBIGUOUS')
    expect(() => chickenfoot('⠿ ⠿')).toThrow('BEGIN_UNAMBIGUOUS')
})

test('simplest', () => {
    expect(chickenfoot(`⠿`)).toStrictEqual([0, 0, 0, 0])
})

test('dead code', () => {
    expect(chickenfoot(`⠿ ⠈`)).toStrictEqual([0, 0, 0, 0])
})

test('unsued braille symbols', () => {
    expect(chickenfoot(`⠿⠐⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠨⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠸⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠁⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠂⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠄⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠑⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠒⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠔⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠪⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠺⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠃⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠆⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠓⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠕⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠖⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠭⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠻⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠾⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠇⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿⠗⠈`)).toStrictEqual([0, 0, 0, 0])
})

test('ignored symbols', () => {
    expect(chickenfoot(`⠿A⠈`)).toStrictEqual([0, 0, 0, 0])
    expect(chickenfoot(`⠿.⠈`)).toStrictEqual([0, 0, 0, 0])  // dot
    expect(chickenfoot(`⠿:⠈`)).toStrictEqual([0, 0, 0, 0])  // colon
    expect(chickenfoot(`⠿;⠈`)).toStrictEqual([0, 0, 0, 0])  // semicolon
})

test('inc r0', () => {
    expect(chickenfoot(`⠿⠈`)).toStrictEqual([1, 0, 0, 0])
    expect(chickenfoot(`⠿⠈⠈`)).toStrictEqual([2, 0, 0, 0])
})

test('inc r1', () => {
    expect(chickenfoot(`⠿⠉`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`⠿⠊`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`⠿⠌`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`⠿⠉⠊⠌⠌`)).toStrictEqual([0, 4, 0, 0])
})

test('inc r2', () => {
    expect(chickenfoot(`⠿⠍`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`⠿⠋`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`⠿⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`⠿⠍⠍⠋⠋⠎⠎`)).toStrictEqual([0, 0, 6, 0])
})

test('inc r3', () => {
    expect(chickenfoot(`⠿⠏`)).toStrictEqual([0, 0, 0, 1])
    expect(chickenfoot(`⠿⠏⠏⠏`)).toStrictEqual([0, 0, 0, 3])
})

test('dec r0', () => {
    expect(chickenfoot(`⠿⠈⠈⠠`)).toStrictEqual([1, 0, 0, 0])
    expect(chickenfoot(`⠿⠈⠈⠈⠈⠠⠠`)).toStrictEqual([2, 0, 0, 0])
})

test('dec r1', () => {
    expect(chickenfoot(`⠿⠉⠉⠡`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`⠿⠉⠉⠢`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`⠿⠉⠉⠤`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`⠿⠉⠉⠉⠉⠉⠉⠉⠉⠡⠢⠤⠤`)).toStrictEqual([0, 4, 0, 0])
})

test('dec r2', () => {
    expect(chickenfoot(`⠿⠋⠋⠣`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`⠿⠋⠋⠥`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`⠿⠋⠋⠦`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`⠿⠋⠋⠋⠋⠋⠋⠋⠋⠋⠋⠋⠋⠣⠣⠥⠥⠦⠦`)).toStrictEqual([0, 0, 6, 0])
})

test('dec r3', () => {
    expect(chickenfoot(`⠿⠏⠏⠧`)).toStrictEqual([0, 0, 0, 1])
    expect(chickenfoot(`⠿⠏⠏⠏⠏⠏⠏⠧⠧⠧`)).toStrictEqual([0, 0, 0, 3])
})

test('cond up, true', () => {
    expect(chickenfoot(`
      ⠎
    ⠿⠘⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠘⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠙⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠚⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠜⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠛⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠝⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠞⠉`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠟⠉`)).toStrictEqual([0, 0, 1, 0])
})

test('cond up, false', () => {
    expect(chickenfoot(`
      ⠎
    ⠿⠘⠉`, 1)).toStrictEqual([1, 1, 0, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠘⠉`, 1)).toStrictEqual([1, 1, 0, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠙⠉`, 0, 1)).toStrictEqual([0, 2, 0, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠚⠉`, 0, 1)).toStrictEqual([0, 2, 0, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠜⠉`, 0, 1)).toStrictEqual([0, 2, 0, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠛⠉`, 0, 0, 1)).toStrictEqual([0, 1, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠝⠉`, 0, 0, 1)).toStrictEqual([0, 1, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠞⠉`, 0, 0, 1)).toStrictEqual([0, 1, 1, 0])
    expect(chickenfoot(`
      ⠎
    ⠿⠟⠉`, 0, 0, 0, 1)).toStrictEqual([0, 1, 0, 1])
})

test('cond down true', () => {
    expect(chickenfoot(`
    ⠿⠰⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
    ⠿⠱⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
    ⠿⠲⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
    ⠿⠴⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
    ⠿⠳⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
    ⠿⠵⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
    ⠿⠶⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
    expect(chickenfoot(`
    ⠿⠷⠉
      ⠎`)).toStrictEqual([0, 0, 1, 0])
})

test('cond down false', () => {
    expect(chickenfoot(`
    ⠿⠰⠉
      ⠎`, 1)).toStrictEqual([1, 1, 0, 0])
    expect(chickenfoot(`
    ⠿⠱⠉
      ⠎`, 0, 1)).toStrictEqual([0, 2, 0, 0])
    expect(chickenfoot(`
    ⠿⠲⠉
      ⠎`, 0, 1)).toStrictEqual([0, 2, 0, 0])
    expect(chickenfoot(`
    ⠿⠴⠉
      ⠎`, 0, 1)).toStrictEqual([0, 2, 0, 0])
    expect(chickenfoot(`
    ⠿⠳⠉
      ⠎`, 0, 0, 1)).toStrictEqual([0, 1, 1, 0])
    expect(chickenfoot(`
    ⠿⠵⠉
      ⠎`, 0, 0, 1)).toStrictEqual([0, 1, 1, 0])
    expect(chickenfoot(`
    ⠿⠶⠉
      ⠎`, 0, 0, 1)).toStrictEqual([0, 1, 1, 0])
    expect(chickenfoot(`
    ⠿⠷⠉
      ⠎`, 0, 0, 0, 1)).toStrictEqual([0, 1, 0, 1])
})

test('nn', () => {
    expect(chickenfoot(`
     ⠉
    ⠿⠩`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`
     ⠉
     ⠩
    ⠿⠩`)).toStrictEqual([0, 1, 0, 0])
})

test('ne', () => {
    expect(chickenfoot(`
      ⠉
    ⠿⠹`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`
       ⠉
      ⠹
    ⠿⠹`)).toStrictEqual([0, 1, 0, 0])
})

test('ee', () => {
    expect(chickenfoot(`⠿⠽⠉`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`⠿⠽⠽⠉`)).toStrictEqual([0, 1, 0, 0])
})

test('se', () => {
    expect(chickenfoot(`
    ⠿⠼
      ⠉`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`
    ⠿⠼
      ⠼
       ⠉`)).toStrictEqual([0, 1, 0, 0])
})

test('ss', () => {
    expect(chickenfoot(`
    ⠿⠬
     ⠉`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`
    ⠿⠬
     ⠬
     ⠉`)).toStrictEqual([0, 1, 0, 0])
})

test('sw', () => {
    expect(chickenfoot(`
    ⠿⠬
     ⠮
    ⠉`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`
     ⠿⠬
      ⠮
     ⠮
    ⠉`)).toStrictEqual([0, 1, 0, 0])
})

test('ww', () => {
    expect(chickenfoot(`
    ⠿⠬
     ⠬
    ⠬⠯    
    ⠉`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`
     ⠿⠬
      ⠬
    ⠬⠯⠯    
    ⠉`)).toStrictEqual([0, 1, 0, 0])
})

test('nw', () => {
    expect(chickenfoot(`
     ⠿⠬
    ⠉ ⠬
     ⠫⠯`)).toStrictEqual([0, 1, 0, 0])
    expect(chickenfoot(`
    ⠉ ⠿⠬
     ⠫ ⠬
      ⠫⠬
       ⠫`)).toStrictEqual([0, 1, 0, 0])
})

test('chickenfoot', () => {
    expect(chickenfoot(`
           ⠽⠈
          ⠹
         ⠹
    ⠿⠽⠽⠽⠘⠼
          ⠼
           ⠼
            ⠽⠠`, 0)).toStrictEqual([1, 0, 0, 0])
    expect(chickenfoot(`
           ⠽⠈
          ⠹
         ⠹
    ⠿⠽⠽⠽⠘⠼
          ⠼
           ⠼
            ⠽⠠`, 1)).toStrictEqual([0, 0, 0, 0])
})

test('infinite loop', () => {
  //chickenfoot(`⠿⠯`)
})

test('truth-machine', () => {
  expect(chickenfoot(`⠿⠰⠊`, 0)).toStrictEqual([0, 0, 0, 0])
  expect(chickenfoot(`⠿⠰⠊`, 1)).toStrictEqual([1, 1, 0, 0])
})

test('r2 greater than three => set r3', () => {
  const greater = `⠿⠣⠣⠣⠳⠏`
  expect(chickenfoot(greater, 0, 0, 0, 0)[3]).toBe(0)
  expect(chickenfoot(greater, 0, 0, 1, 0)[3]).toBe(0)
  expect(chickenfoot(greater, 0, 0, 2, 0)[3]).toBe(0)
  expect(chickenfoot(greater, 0, 0, 3, 0)[3]).toBe(0)
  expect(chickenfoot(greater, 0, 0, 4, 0)[3]).toBe(1)
  expect(chickenfoot(greater, 0, 0, 5, 0)[3]).toBe(1)
})

test('copier', () => {
  expect(chickenfoot(`
  ⠮⠯⠯⠯ 
⠿⠰⠊⠍⠠⠩ 
  ⠼ ⠮⠯⠯
   ⠵⠈⠣⠩ `, 42)).toStrictEqual([42, 42, 0, 0])
})

test('fibonacci', () => {
  const fib = `
        ⠮        
       ⠮ ⠫       
⠿⠰⠋⠠⠘⠠⠳⠣⠌⠏⠫      
     ⠫ ⠼         
      ⠫ ⠼ ⠮⠯     
       ⠫ ⠲⠢⠎⠫    
        ⠫ ⠼      
         ⠫ ⠼ ⠮⠯  
          ⠫ ⠷⠧⠌⠫ 
           ⠫⠯⠯   `
  expect(chickenfoot(fib, 0)).toStrictEqual([0, 0, 0, 0])
  expect(chickenfoot(fib, 1)).toStrictEqual([0, 0, 1, 0])
  expect(chickenfoot(fib, 5)).toStrictEqual([0, 3, 5, 0])
  expect(chickenfoot(fib, 8)).toStrictEqual([0, 13, 21, 0])
})

test('addition #1', () => {
    expect(chickenfoot(`                     
             ⠟⠉⠧⠬   
            ⠹   ⠮   
           ⠹ ⠫⠯⠯    
          ⠹         
         ⠚⠋⠏⠢⠬      
        ⠹    ⠮      
       ⠹ ⠫⠯⠯⠯       
      ⠹             
     ⠟⠈⠧⠬           
    ⠹   ⠮           
   ⠹ ⠫⠯⠯            
  ⠹                 
⠿⠘⠎⠏⠠⠬              
  ⠫  ⠮              
   ⠫⠯               
`, 2, 3)).toStrictEqual([2, 3, 5, 0])
})

test('addition #2', () => {
    expect(chickenfoot(`
Add two numbers: 
          ⠮       ⠮   
         ⠮ ⠫     ⠮ ⠫  
        ⠷⠈⠧⠩    ⠷⠌⠧⠩  
       ⠹ ⠼     ⠹      
      ⠹   ⠼   ⠹       
     ⠹     ⠼ ⠹        
⠿⠽⠽⠽⠘⠋⠏⠠⠬   ⠚⠋⠏⠢⠬     
     ⠫  ⠮    ⠫  ⠮     
      ⠫⠯      ⠫⠯      `, 13, 42)).toStrictEqual([13, 42, 55, 0])
})

test('Hello World', () => {
  const result = []
  chickenfoot(`
      ⠮
⠿⠈⠈⠈⠈⠠⠮⠫
     ⠰⠹   ⠮
      ⠈⠈⠈⠠⠮⠫
         ⠰⠹     ⠮
          ⠈⠈⠈⠈⠈⠠⠮⠫
               ⠰⠹     ⠮
                ⠈⠈⠈⠈⠈⠠⠮⠫
                     ⠰⠹      ⠮
                      ⠈⠈⠈⠈⠈⠈⠠⠮⠫
                            ⠰⠹ ⠮
                             ⠈⠠⠮⠫
                              ⠰⠹⠮
 ⠮⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯⠯
⠬        ⠮
⠈⠈⠈⠈⠈⠈⠈⠈⠠⠮⠫
        ⠰⠹      ⠮
         ⠈⠈⠈⠈⠈⠈⠠⠮⠫
               ⠰⠹       ⠮
                ⠈⠈⠈⠈⠈⠈⠈⠠⠮⠫
                       ⠰⠹     ⠮
                        ⠈⠈⠈⠈⠈⠠⠮⠫
                             ⠰⠹
                              ⠈⠈⠠⠮⠫
                                ⠰⠹`, 0, 0, 0, 0, collectChanges(result))

  const alphabet = []
  alphabet[1] = ' '
  alphabet[2] = 'd'
  alphabet[3] = 'e'
  alphabet[4] = 'H'
  alphabet[5] = 'l'
  alphabet[6] = 'o'
  alphabet[7] = 'r'
  alphabet[8] = 'W'

  let msg = ''
  for (let i = 0; i < result.length; i++) {
      msg += alphabet[result[i]]
  }

  expect(msg).toStrictEqual('Hello World')  
})

function collectChanges(result) {
  let last = 0, zero = true
  return  r => {
    if (r[0] < last && zero) {  // value change
      result.push(last)
      zero = false
    }
    last = r[0]
    if (last === 0) zero = true
  }
}