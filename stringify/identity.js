const base = require('./Base')

class Compiler{

  compile(node){
    return this.stylesheet(node)
  }

  stylesheet(node) {
    return this.mapVisit(node.stylesheet.rules)
  }

  // rules(node) {
  //   this.mapVisit(node.rules)
  // }

  rule(node){
    const indent = this.indent(1)
    return this.emit(node.selectors.map(selector => indent + selector).join(',\n'), node.position) 
      + this.emit(' {\n')
      + this.mapVisit(node.declarations)
      + this.emit('}')
  }

  indent(level){
    level = level || 1
    return Array(level).join(` `)
  }
  // declaration既有属性，又有值，怎么传递位置信息
  declaration(node){
    return this.emit(this.indent(1))
      + this.emit(node.property + ': ' + node.value)
      + this.emit(';\n')
  }
}

Object.assign(Compiler.prototype, base)

module.exports = Compiler