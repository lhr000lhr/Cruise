import './index.less';
(() => {
  const requestBtn = document.getElementById('requestBtn');

  const fetchList = (url, data) => {
    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(resp => console.log(resp))
    .catch(error => console.log('Error: ' + error))
    // fetch(`api/agents/${id}`)
    // .then((resp) => {
    //   return resp.json();
    // })
    // .then((data) => {
    //   console.log(data);
    // })
  }

  // requestBtn.addEventListener('click', () => {
  //   fetchList('api/agents', {
  //     "name": "bjstdmngbdr01.thoughtworks.comsdsdsdsd",
  //     "os": "windows",
  //     "status": "idle",
  //     "type": "physical",
  //     "ip": "192.168.1.102",
  //     "location": "/var/lib/cruise-agent",
  //     "resources": [
  //       "Firefox",
  //       "Safari",
  //       "Ubuntu",
  //       "Chrome"
  //     ]
  //   });
  // })


})();
