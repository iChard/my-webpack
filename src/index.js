import utils from './utils'
import './style.css'
import bg from './bg.png'
import _ from 'lodash'
import { cube } from './math.js'
// import dayjs from 'dayjs'

// console.log(dayjs())
function component() {
    console.log('index.js loaded  2 11 ')
    var ele = document.createElement('div')
    var btn = document.createElement('button')
    btn.innerHTML = '点击我查看日志'
    ele.classList.add('hello')
    // ele.innerHTML = utils.connectArr(['hello', 'webpack1234']);
    ele.innerHTML = _.concat(['hello', 'webpack', '12123214']) + '_' + cube(4)//utils.connectArr(['hello', 'webpack1234']);
    
    var img = new Image(200, 200)
    img.src = bg;
    ele.appendChild(img)
    ele.appendChild(btn)
    btn.onclick = e => import('./print').then(module => {
        var print = module.default
        print()
    })
    return ele;

}
document.body.appendChild(component())