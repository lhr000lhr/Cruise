/** 
 * Resource card options 
 * 
 * id:        number
 * name:      string
 * os:        string
 * status:    'building' | 'idle'
 * type:      string
 * ip:        string
 * locations: string
 * resources: string[]
 * 
 * */

 import Modal from '../modal/modal';


export default class ResourceCard {

  constructor(options) {
    this.options = options;
    this.browerWrapEl = null;
  }

  /** create resource dom */
  createElement() {
    this.el = document.createElement('div');
    this.el.className = 'resource-card';
    this.el.innerHTML = this.createTemplate();
    this.refreshBrowerWrapElement(this.options.resources);
    return this.el;
  }

  createTemplate() {
    const imgUrl = require(`../../assets/os-icons/${this.options.os}.png`);
    return `
  
  <div class="resource-card-icon-wrap">
  <img src="${imgUrl}" alt="">
</div>
<div class="resource-card-article">
  <div class="row resource-card-description">
    <div class="col-5 resource-name text-overflow">
      <i class="cruise icon-desktop"></i>
      <span>${this.options.name}</span>
    </div>
    <div class="col-1 resource-status resource-status-building">
    <span>${this.options.status}</span>
    </div>
    <div class="col-3 resource-ip text-overflow">
    <span>${this.options.ip}</span>
    </div>
    <div class="col-3 resource-location text-overflow">
    <span>${this.options.location}</span>
    </div>
  </div>
  <div class="row resource-card-operation">
    <div class="col-10">
      <div class="resource-browser clearfix">
        <span class="icon-plus-wrap float-left">
          <i class="cruise icon-plus"></i>
        </span>
        <p class="float-left resource-browser-list brower-wrap"></p>
      </div>
    </div>
    <div class="col-2 deny-button clearfix">
    ${this.options.status === 'building' ? 
            `
            <button type="button">
            <i class="cruise icon-deny"></i>
            Deny
          </button>
            ` :
            ''
          }
      
    </div>
  </div>
</div>
    `
  }

  refreshBrowerWrapElement(list) {
    if (!list || !list.length) list = [];
    this.browerWrapEl = this.el.querySelector('.brower-wrap');
    this.browerWrapEl.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
      const browerLabelEl = this.createBrowerLabelElement(list[i]);
      this.browerWrapEl.appendChild(browerLabelEl);
    }
    this.addListenerToBrowerLabel();
    this.addListenerToAddBtn();
  }

  createBrowerLabelElement(name) {
    const browerLabelEl = document.createElement('span');
    browerLabelEl.className = 'resource-browser-label';
    browerLabelEl.innerHTML = `
      ${name} <i class="cruise icon-trash"></i>
    `;
    return browerLabelEl;
  }

  removeBrowser(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == 'i') {
      const grandparent = target.parentNode.parentNode;
      const parent = target.parentNode;
      grandparent.removeChild(parent);
    }
  }

  createModal(ev) {
    const addBtn = this.el.querySelector('.icon-plus');
    const oRect = addBtn.getBoundingClientRect();
    const top = oRect.top;
    const left = oRect.left;
    const options = {
      fn: (name) => {
        this.options.resources = this.options.resources || [];
        const browerLabelEl = this.createBrowerLabelElement(name);
        this.browerWrapEl.appendChild(browerLabelEl);
      },
      top,
      left
    }
    const modalRef = new Modal(options);
    modalRef.init();
  }

  addListenerToBrowerLabel() {
    this.browerWrapEl.addEventListener('click', this.removeBrowser.bind(this))
  }

  addListenerToAddBtn() {
    const addBtn = this.el.querySelector('.icon-plus');
    addBtn.addEventListener('click', this.createModal.bind(this));
    
  }

  init() {
    return this.createElement();
  }

}
