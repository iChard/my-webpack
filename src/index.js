import utils from './utils'
import './style.css'
import bg from './bg.png'
function component() {
    console.log(1)
    var ele = document.createElement('div')
    ele.classList.add('hello')
    ele.innerHTML = utils.connectArr(['hello', 'webpack']);

    var img = new Image(200, 200)
    img.src = bg;
    ele.appendChild(img)
    return ele;

}
document.body.appendChild(component())