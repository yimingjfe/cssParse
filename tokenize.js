const SPACE             =  ' '.charCodeAt(0);
const TAB               = '\t'.charCodeAt(0);
const NEWLINE           = '\n'.charCodeAt(0);
const OPEN_CURLY        =  '{'.charCodeAt(0);
const CLOSE_CURLY       =  '}'.charCodeAt(0);

module.exports = function tokenizer(input, options = {}) {
  let css = input.toString()
  let pos = 0
  let next = 0
  let offset = -1
  let line = 0
  let length = css.length
  let currentToken
  let RE_WORD_END = /[ \n\t\r\f\(\)\{\}:;@!'"\\\]\[#]|\/(?=\*)/g;

  // 匹配pos位置的符号，判断其类型，根据其类型拿到对应的数组
  function nextToken(){
    if(pos >= length) return;
    let code = css.charCodeAt(pos)  // 每次一个循环，不是挺消耗性能的？为什么不slice掉？
    switch (code){
      case NEWLINE:
      case SPACE:
      case TAB:
        next = pos
        do{
          next += 1 
          code = css.charCodeAt(next)
          if( code === NEWLINE ){
            line += 1
            offset = next
          }
        } while ( code === NEWLINE ||
                  code === SPACE   ||
                  code === TAB );

        currentToken = ['space', css.slice(pos, next)]
        pos = next
        break
      case OPEN_CURLY:
        next = pos + 1
        currentToken = [OPEN_CURLY, css.slice(pos, next), line, pos]
        break
      default:
        RE_WORD_END.lastIndex = pos + 1   // 第一个字符匹配过，就不再匹配了，从第二个开始匹配
        RE_WORD_END.test(css)
        next = RE_WORD_END.lastIndex - 1  // 拿到匹配不到字符的位置

        currentToken = ['word', css.slice(pos, next),
         line, pos - offset, 
         line, next - offset
        ]

        pos = next

        break
    }
  }

  return {
    nextToken
  }
}