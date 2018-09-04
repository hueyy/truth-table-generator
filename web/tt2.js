const keywords = ["not", "and", "or"]
// const and = (x, y) => x && y
// const or = (x, y) => x || y
// const not = x => !x

const parseInput = ({ input }) => {
  let output = []
  //input is split into arrays
  const chars = input.replace(/ and /g, "&").replace(/ or /g, "|").replace(/ not /g, "!").split('')

  
  let curIndex = 0
  while(curIndex <= input.length){
    const char = input[curIndex]
    if(char === '('){
      const nextInput = chars.slice(curIndex + 1).join('')
      output.push(
        parseInput({
          input: nextInput
        })
      )
      curIndex = (curIndex + 1) + nextInput.indexOf(')')
    } else if (char === ')') {
      return output
    } else {
      output.push(char)
    }
    curIndex++
  }
  return output
}

const generatePermutations = (variables = ['a', 'b', 'c']) => {
  let output = []
  for(let rows = 0; rows < Math.pow(2, variables.length); rows++){
    const combination = {}
    for(let i = 0; i < variables.length; i++){
      combination[variables[i]] = (rows * i) % 2 === 0
    }
    output.push(combination)
  }
  return output
}

const input = '(a and b) and not (c and (d or e))'

console.log(JSON.stringify(parseInput({ input }), null, 2))
console.log(generatePermutations())

/*

  [ { a: false, b: false, c: false },
  { a: true, b: false, c: false },
  { a: false, b: true, c: false },
  { a: true, b: true, c: false },
  { a: false, b: false, c: true },
  { a: true, b: false, c: true },
  { a: false, b: true, c: true },
  { a: true, b: true, c: true } ]

*/
const eval  = (statement) => {
  if (statement.length === 1) {
    return statement[0]
  }
  for (let i = 0; i < statement.length; i++) {
    const prev = Array.isArray(statement[i-1]) ? statement[i-1] : [statement[i-1]]
    const next = Array.isArray(statement[i-1]) ? statement[i+1] : [statement[i+1]]
    if (statement[i] === '&') {
      let p = eval(prev) 
      let q = eval(next)
      return p && q
    } else if (statement[i] === '|') {
      let p = eval(prev)
      let q = eval(next)
      return p || q
    }
  }
  for (let i = 0; i < statement.length; i++) {
    if (statement[i] === '&') {
      return !eval(next)
    }
  }
}
const input = '(a and b) and (c and (d or e))'

// console.log(JSON.stringify(parseInput({ input }), null, 2))
// test eval:
const STATEMENT = [[true, '&', false], '&', [false, '&', [true, '|', false]]]
console.log(eval(STATEMENT))
