export default class Modal {

  constructor(options) {
    this.options = options;
    
  }

  createElement() {
    this.el = document.createElement('div');
    this.el.className = 'modal';
    this.el.innerHTML = this.createTemplate();
    return this.el;
  }

  createTemplate() {
    return `
      
    `
  }

  confirm() {
    this.options.fn();
    this.destory();
  }

  cancel() {
    this.destory();
  }

  destory() {
    const bodyEl = document.getElementById('app-root');
    bodyEl.removeChild(this.el);
  }

  clear() {
    const preModals = document.getElementsByClassName('modal');
    if (!preModals || !preModals.length) return;
    const bodyEl = document.getElementById('app-root');
    for (let i = 0; i < preModals.length; i++) {
      bodyEl.removeChild(preModals[i]);
    }
  }

  init() {
    this.clear();
    const curModal = this.createElement();
    const bodyEl = document.getElementById('app-root');
    bodyEl.appendChild(curModal);
  }
}