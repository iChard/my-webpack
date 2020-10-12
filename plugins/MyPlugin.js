const PLUGINNAME = 'myplugin'
function MyPlugin(options) {

}

MyPlugin.prototype.apply = function(compiler) {
    compiler.hooks.done.tap(PLUGINNAME, function(compilation) {
        console.log('this is an example plugin!')
    })
}

module.exports = MyPlugin