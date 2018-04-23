const base = require('./Base')

class Compiler{

  compile = (node) => {
    return this.stylesheet(node)
  }

  stylesheet = () => {
    this.mapVisit(node.rules)
  }

  rules = (node) => {
    this.mapVisit(node.rules)
  }

  rule = (node) => {
    const indent = this.indent(1)
    return this.emit(node.selectors.map(selector => indent + selector).join(',\n'), node.position) 
      + this.emit(' {\n')
      + this.emit(this.indent(1))
      + this.mapVisit(node.declarations)
      + this.emit('}')
  }

  indent = (level) => {
    return Array(level).join(` `)
  }

  declaration = () => {

  }
}

Object.assign(Compiler.prototype, base)

module.exports = Compiler