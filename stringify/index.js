// css中的sourcemap怎么验证是可用的？
const Identity = require('./identity')

module.exports = function(node, options){
  options = options || {};

  const compiler = new Identity()

  let code = compiler.compile(node)
  return code;
}