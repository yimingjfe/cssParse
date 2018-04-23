const SourceMap = require('source-map').SourceMapGenerator;

function mixin(compiler){
  compiler.map = new SourceMap()
  compiler.position = { line: 1,  column: 1 }
}

function updatePosition(str){
  let lines = str.match(/\n/g)
  if(lines) this.position.line += line.length
  let lastIndex = str.lastIndexOf('\n')
  this.position.column = ~lastIndex ? str - lastIndex : this.position.column + str.length
}

exports.emit = function(str, pos){
  if(pos){
    const sourceFile = pos.source || 'source.css'
    this.map.addMapping({
      source: sourceFile,
      original: {
        line: this.position.line,
        column: Math.max(this.position.column - 1, 0)
      },
      generated: {
        line: pos.start.line,
        column: pos.start.column - 1
      }
    })
  }

  this.updatePosition(str)

  return str
}