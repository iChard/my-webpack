const fs = require('fs')
const path = require('path')
const babylon = require('@babel/parser')// 用于将代码字符串解析成AST
const traverse = require('@babel/traverse').default//
const babel = require('@babel/core')

// 模块id
let ID = 0

// 根据提供的文件地址，读取文件内容，生成文件的抽象语法树AST，然后分析AST，提供更具体的代码、文件名称、文件依赖等信息
function createAsset(filename) {
    // 读取指定文件，返回字符串形式的代码
    const content = fs.readFileSync(filename, 'utf-8')

    // 生成代码的抽象语法树，语法树中包含一段程序详细的信息
    const AST = babylon.parse(content, {
        sourceType: 'module'
    })

    // 当前文件的依赖，存储到一个数组，即当前代码import 'a',则会将a存起来
    const dependencies = []

    // traverse用于遍历AST，并返回AST节点的详细信息，这里将节点的依赖信息存储到dependencies
    traverse(AST, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value)
        }
    })

    // 模块的id，每读取一个ast时依次将id+1
    const id = ID++

    // 依据babel的规则将ES6转成ES5
    const { code } = babel.transformFromAstSync(AST, null, {
        presets: ['@babel/preset-env']
    })

    // 
    return {
        id,
        filename,
        dependencies,
        code
    }
}

// 从入口开始分析所有文件的依赖关系，形成依赖图，使用广度优先算法遍历
function createGraph(entry) {
    const mainAsset = createAsset(entry)

    // 将读取的块存储到队列中，方便后续广度遍历
    const queue = [mainAsset]

    for (const asset of queue) {
        const dirname = path.dirname(asset.filename)

        // 新建一个map表用于保存每个文件的依赖关系，返回结构如：{"./message.js" : 1}，其中'./message.js'是模块依赖文件相对路径，1是依赖的模块id
        asset.mapping = {}

        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath)

            const child = createAsset(absolutePath)

            asset.mapping[relativePath] = child.id

            queue.push(child)
        })
    }

    return queue
}

// 用于读取依赖度并生成最终代码
function bundle(graph) {
    let modules = ''
    // 读取上面的依赖图，将其中的模块id、代码、依赖关系表保存到最终代码里面
    graph.forEach(mod => {
        modules += `${mod.id}:[
            function(require, module, exports) {
                ${mod.code}
            },
            ${JSON.stringify(mod.mapping)},
        ],`
    });

    //require, module, exports 是 cjs的标准不能再浏览器中直接使用，所以这里模拟cjs模块加载，执行，导出操作。
    const result = `
        (function(modules){
            //创建require函数， 它接受一个模块ID（这个模块id是数字0，1，2） ，它会在我们上面定义 modules 中找到对应是模块.
            function require(id) {
                const [fn, mapping] = modules[id]
                function localRequire(relativePath) {
                    // 根据模块路径在mapping中找到对应的模块id
                    return require(mapping[relativePath]);
                }
                const module = {exports: {}}
                // 执行每个模块的代码
                fn(localRequire, module, module.exports);
                return module.exports;
            }
            // 执行入口文件
            require(0);
        })({${modules}})
    `
    return result
}

const graph = createGraph('./example/entry.js')
const ret = bundle(graph)

// 将bundle代码打包到打包文件中
fs.writeFileSync('./bundle.js', ret)