import './index.less'

class VjsccXX {
  el: HTMLElement
  text: string
  show: boolean

  constructor(el: HTMLElement, text: string, show = true) {
    this.el = el
    this.text = text
    this.show = show

    this.el.classList.add('vjsscc-xx')

    if (!show) {
      this.el.style.display = 'none'
    }

    console.log('xx is ready')
  }
  hide() {
    this.el.style.display = 'none'
  }
  tex() {
    this.el.innerHTML = this.text
  }
}

export default VjsccXX
