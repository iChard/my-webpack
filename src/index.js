import utils from './utils'
function component() {
    var ele = document.createElement('div')

    ele.innerHTML = utils.connectArr(['hello', 'webpack']);
    return ele;

}
document.body.appendChild(component())