import './index.less';
import ResourcePanel from './components/resource/resource-panel'

window.onload = () => {
  const resource = new ResourcePanel('resource-panel');
  resource.init();
}

