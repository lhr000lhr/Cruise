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
          <div class="col-5">
            <i class="cruise icon-desktop"></i>
            <span>${this.options.name}</span>
          </div>
          <div class="col-1">
            <span>${this.options.status}</span>
          </div>
          <div class="col-3">
              <span>${this.options.ip}</span>
          </div>
          <div class="col-3">
              <span>${this.options.location}</span>
          </div>
        </div>
        <div class="row resource-card-operation">
          
          <div class="col-10">
              <span class="">
                <i class="cruise icon-plus"></i>
              </span>
              <p class="brower-wrap"></p>
          </div>
          ${this.options.status === 'building' ? 
            `
              <div class="col-2">
                <button type="button float-right">
                  Deny
                </button>
              </div>
            ` :
            ''
          }
          
        </div>
      </div>
    `
  }

  refreshBrowerWrapElement(list) {
    if (!list || !list.length) return;
    this.browerWrapEl = this.el.querySelector('.brower-wrap');
    for (let i = 0; i < list.length; i++) {
      const browerLabelEl = this.createBrowerLabelElement(list[i]);
      this.browerWrapEl.appendChild(browerLabelEl);
    }
    this.addListenerToBrowerLabel();
  }

  createBrowerLabelElement(name) {
    const browerLabelEl = document.createElement('span');
    browerLabelEl.className = 'brower-label';
    browerLabelEl.innerHTML = `
      <span>${name} <i class="cruise icon-trash"></i></span>
    `;
    return browerLabelEl;
  }

  addBrowserTrigger(name) {
    this.options.resources = this.options.resources || [];
    this.options.resources.push(name);

  }

  removeBrowser(target) {
    if (!this.options.resources || !this.options.resources.length) return;
    const grandparent = target.parentNode.parentNode;
    const parent = target.parentNode;
    grandparent.removeChild(parent);
  }

  addListenerToBrowerLabel() {
    this.browerWrapEl.addEventListener('click', (ev) => {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      if (target.nodeName.toLowerCase() == 'i') {
        this.removeBrowser(target);
      }
    }) 
  }

  init() {
    return this.createElement();
  }

}
