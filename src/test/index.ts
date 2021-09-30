import Modal from '../index'

const stage = document.getElementById('stage')

if (!stage) {
  throw new Error('Error!')
}

console.log(Modal.prototype)

const modal = Modal.create(stage, 'asdfasf', [1, 2, 34234, 2])

console.log(modal)
