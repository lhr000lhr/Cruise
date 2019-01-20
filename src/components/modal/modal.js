/** 
 * Modal 
 * 
 * fn:        function
 * top:       number | string
 * left:      number | string
 * 
 * */

export default class Modal {

  constructor(options) {
    this.defoptions = {};
    this.options = Object.assign(this.defoptions, options);

  }

  createElement() {
    this.el = document.createElement('div');
    this.el.className = 'modal';
    this.el.style.top = `${this.options.top + 26}px`;
    this.el.style.left = `${this.options.left - 20}px`;
    this.el.innerHTML = this.createTemplate();
    return this.el;
  }

  createTemplate() {
    return `
    <div class="modal-content">
      <p class="modal-title">
        Sepatate multiple resource name with commas
      </p>
      <div class="modal-input">
        <input type="text">
      </div>
      <div class="modal-operation">
        <button class="button-pramry modal-confirm">
          Add Resource
        </button>
        <button class="modal-cancel">
          Cancel
        </button>
      </div>
    </div>
    <i class="cruise icon-close modal-close"></i>
    `
  }

  confirm() {
    const inputEl = this.el.querySelector('.modal-input input');
    const value = inputEl.value;
    if (value) {
      this.options.fn(value);
    }
    this.destory();
  }

  cancel() {
    this.destory();
  }

  close() {
    this.destory();
  }

  destory() {
    const bodyEl = document.getElementById('app-root');
    window.onmousewheel = document.onmousewheel = null;
    document.removeEventListener('DOMMouseScroll', this.scrollFunc);
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

  createCancelListener() {
    const cancelBtn = this.el.querySelector('.modal-cancel');
    cancelBtn.addEventListener('click', this.cancel.bind(this), false);
  }

  createCloseListener() {
    const closeBtn = this.el.querySelector('.modal-close');
    closeBtn.addEventListener('click', this.close.bind(this), false);
  }

  createConfirmListener() {
    const confirmBtn = this.el.querySelector('.modal-confirm');
    confirmBtn.addEventListener('click', this.confirm.bind(this), false);
  }

  createSrollListener() {
    if (document.addEventListener) { // firefox  
      document.addEventListener('DOMMouseScroll', this.scrollFunc.bind(this), false);
    }
    // ie chrome 
    window.onmousewheel = document.onmousewheel = this.scrollFunc.bind(this);
  }

  scrollFunc (e) {
    e = e || window.event;
    if (e.wheelDelta) { // ie chrome           
      this.destory();
    } else if (e.detail) { // firefox
      this.destory();
    }
  }


  init() {
    this.clear();
    const curModal = this.createElement();
    const bodyEl = document.getElementById('app-root');
    bodyEl.appendChild(curModal);
    this.createConfirmListener();
    this.createCancelListener();
    this.createCloseListener();
    this.createSrollListener();
  }
}
