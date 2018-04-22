// TODO: 错误信息有问题
module.exports = function(css){
  let lineno = 1
  let column = 1
  function updatePosition(str){
    let lines = str.match(/\n/g)
    if(lines) lineno += lines.length
    let i = str.lastIndexOf('\n')
    column = ~i ? str.length - i : column + str.length
  }

  function Position(start){
    return {
      start,
      end: {
        line: lineno,
        column: column
      }
    }
  }

  function position(){
    let start = { line: lineno, column: column }
    return function(node){
      node.position = new Position(start)
      whitespace()
      return node
    }
  }

  function exec(reg){
    let result = reg.exec(css)
    if(!result) return
    let str = result[0]
    updatePosition(str)
    css = css.slice(str.length)
    return result
  }
  function whitespace(){
    exec(/^\s*/)
  }
  function selector(){
    let selectors = exec(/[^{]+/g)[0]
    selectors = selectors.split(/\s+/)
    return selectors
  }

  function open(){
    return exec(/^{\s*/)
  }

  function comment(){
    if(css.charAt(0) !== '/' || css.charAt(1) !== '*') return
    let pos = position()
    let i = 2
    while(css.charAt(i) !== '' && css.charAt(i) !== '*' && css.charAt(i + 1) !== '/') ++i
    i = i + 2
    let str = css.slice(2, i - 2)
    column += 2
    updatePosition(str)
    css = css.slice(i)
    column += 2

    return pos({
      type: 'comment',
      comment: str
    })
  }

  // 方法间处理留下的空格是怎么处理的
  function comments(rules){
    let c;
    rules = rules || []
    while(c = comment()){
      rules.push(c)
    }
    return rules
  }
  // 怎么处理位置?
  function declarations(){
    let decls = []
    if(!open()) throw new Error('missing "{"')
    let decl;
    while(decl = declaration()){
      if(decl !== false){
        decls.push(decl)
        comments(decls)
      }
    }
    return decls
  }

  function declaration(){
    let pos = position()
    let property = exec(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if(!property) return
    property = property[0]
    if(!exec(/^:\s*/)) return new Error("property missing ':'")
    let value = exec(/([^;]+)/)
    value = value[0]

    let ret = pos({
      type: 'declaration',
      property: property,
      value: value && value.trim()
    })
    exec(/^[;\s]*/);
    return ret
  }
  
  function resolveRule(){
    whitespace()
    let pos = position()
    let selectors = selector()
    let decls = declarations()
    exec(/\s*}/)
    return pos({
      type: 'rule',
      selectors: selectors,
      declarations: decls
    })  
  }

  function resolveRules(){
    let rules = []
    while(css.length > 0){
      rules.push(resolveRule())
    }
    return rules
  }


  const rules = resolveRules()
  return {
    type: 'stylesheet',
    stylesheet: {
      rules: rules
    }
  }
}