exports.visit = function(node){
  return this[node.type](node)
}

exports.mapVisit = function(nodes, delim){
  let buf = ''
  for(let i = 0; i < nodes.length; i++){
    buf += this.visit(nodes[i])
  }
  return buf
}