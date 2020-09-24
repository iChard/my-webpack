const babylon = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

const code = `
    var a ='hello world'
    function foo() {
        console.log(a)
    }
    foo()
`
const ast = babylon.parse(code)
console.log(ast)
// babel.parse(code, {}, function(a, b){
//     // console.log('a:', a)
//     // console.log('b:', b)
// })