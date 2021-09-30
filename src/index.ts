import sum from './utils/sum'

interface IModal {
  container: HTMLElement
  body: string
  index: number
}

class Modal implements IModal {
  container: HTMLElement
  body: string
  index: number
  constructor(container: HTMLElement, body: string, indexs: number[]) {
    this.container = container
    this.body = body
    this.index = sum(...indexs)
  }

  static create(container: HTMLElement, body: string, indexs: number[]): Modal {
    return new Modal(container, body, indexs)
  }

  setBody = (body: string): Modal => {
    this.body = body
    return this
  }
}

export default Modal
