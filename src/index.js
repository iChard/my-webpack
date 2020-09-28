import utils from './utils'
import './style.css'
import bg from './bg.png'
function component() {
    console.log('index.js loaded')
    var ele = document.createElement('div')
    ele.classList.add('hello')
    ele.innerHTML = utils.connectArr(['hello', 'webpack1234']);

    var img = new Image(200, 200)
    img.src = bg;
    ele.appendChild(img)
    return ele;

}
document.body.appendChild(component())