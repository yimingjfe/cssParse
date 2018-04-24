const fs = require('fs')
const parse = require('postcss/lib/parse')
const tokenize = require('./tokenize')
const rework = require('rework')
const css = require('css')
const myParse = require('./parse')
const stringify = require('./stringify')

const exampleCss = fs.readFileSync('./example.css')


function testPostCss(){
  const result = parse(exampleCss)
}

function testReworkCss(){
  const ast = css.parse(exampleCss.toString(), {source: './example.css'})
  const result = css.stringify(ast, { sourcemap: true })
  console.log('result.code', result.code)
  console.log('end')
}

function testRework(){
  rework(exampleCss.toString(), {source: 'example.css'}).toString({ sourcemap: true })
}

function testMy(){
  let tokenizer = tokenize(exampleCss)
  tokenizer.nextToken()
}

function testMyParse(){
  const ast = myParse(exampleCss.toString())
  const result = stringify(ast)
  console.log('result', result)
}

// testRework()
// testReworkCss()
// testPostCss()
// testMy()
testMyParse()

// console.log(str2Char(exampleCss.toString()))

function str2Char(str){
  const SINGLE_QUOTE      = '\''.charCodeAt(0);
  const DOUBLE_QUOTE      =  '"'.charCodeAt(0);
  const BACKSLASH         = '\\'.charCodeAt(0);
  const SLASH             =  '/'.charCodeAt(0);
  const NEWLINE           = '\n'.charCodeAt(0);
  const SPACE             =  ' '.charCodeAt(0);
  const FEED              = '\f'.charCodeAt(0);
  const TAB               = '\t'.charCodeAt(0);
  const CR                = '\r'.charCodeAt(0);
  const OPEN_SQUARE       =  '['.charCodeAt(0);
  const CLOSE_SQUARE      =  ']'.charCodeAt(0);
  const OPEN_PARENTHESES  =  '('.charCodeAt(0);
  const CLOSE_PARENTHESES =  ')'.charCodeAt(0);
  const OPEN_CURLY        =  '{'.charCodeAt(0);
  const CLOSE_CURLY       =  '}'.charCodeAt(0);
  const SEMICOLON         =  ';'.charCodeAt(0);
  const ASTERISK          =  '*'.charCodeAt(0);
  const COLON             =  ':'.charCodeAt(0);
  const AT                =  '@'.charCodeAt(0);

  let newStr = ''
  for(let i = 0; i < str.length; i++){
    let code = str[i].charCodeAt(0)
    let token = ''
    switch(code){
      case SINGLE_QUOTE:
        token = '\''
        break;
      case DOUBLE_QUOTE:
        token = '"'
        break
      case BACKSLASH:
        token = '\\'
        break
      case SLASH:
        token = '/'
        break
      case NEWLINE:
        token = '\\n'
        break
      case SPACE:
        token = ' '
        break
      case FEED:
        token = '\\f'
        break
      case TAB:
        token = '\\t'
        break
      case CR:
        token = '\\r'
        break
      case OPEN_SQUARE:
        token = '['
        break
      case CLOSE_SQUARE:
        token = ']'
        break
      case OPEN_PARENTHESES:
        token = '('
        break
      case CLOSE_PARENTHESES:
        token = ')'
        break
      case OPEN_CURLY:
        token = '{'
        break
      case CLOSE_CURLY:
        token = '}'
        break
      case SEMICOLON:
        token = ';'
        break
      case ASTERISK:
        token = '*'
        break
      case COLON:
        token = ':'
        break
      case AT:
        token = '@'
        break
      default:
        token = str[i]
    }
    newStr += token
  }
  return newStr
}