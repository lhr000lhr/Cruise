import ResourceCard from './resource-card';

export default class ResourcePanel {

  constructor(name) {
    this.el = document.getElementById(name);
  }

  getResourceList (url) {
    fetch(url, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => {
      if (!data || !data.length) return;
      const len = data.length;
      for (let i = 0; i < len; i ++) {
        const curdata = data[i];
        this.addResourceCard(curdata);
      }
    })
    .catch(error => console.log('Error: ' + error))
  }

  addResourceCard(options) {
    const resourceCard = new ResourceCard(options);
    const resourceCardEl = resourceCard.init();
    this.el.appendChild(resourceCardEl);
  }

  init() {
    this.getResourceList('api/agents');
  }
}