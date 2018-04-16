module.exports = function(css){
  let lineno = 1
  let column = 1
  function updatePosition(str){
    let lines = str.match(/\n/g)
    if(lines.length > 0) lineno += lines.length
    column += column - lines.length
    let i = str.lastIndexOf('\n')
    column = ~i ? str.length - i : column + str.length
  }
  function exec(reg){
    let result = reg.exec(css)
    if(!result) return
    let str = result[0]
    updatePosition(str)
    css = css.slice(str.length)
    return str
  }
  function whitespace(){
    exec(/^\s*/)
  }
  function selector(){
    let selectors = exec(/[^{]+/)
    selectors = selectors.split('/\s+/')
    return selectors
  }

  function declaration(){
    
    return {
      type: 'declaration',
      property,
      value,
      position:{

      }
    }
  }
  
  function resolveRule(){
    whitespace()
    let start = {
      line: lineno,
      column: column
    }
    let selectors = selector()
    return {
      type: 'rule',
      selectors: selectors,
      declarations,
      position: {
        start,
        end: {

        }
      }
    }
  }

  function resolveRules(){
    let rules = []
    while(css.length > 0){
      rules.push(resolveRule())
    }
  }



  const rules = resolveRules()
  return {
    type: 'stylesheet',
    stylesheet: {
      rules: rules
    }
  }
}