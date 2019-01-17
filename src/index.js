import './index.less';
require("expose-loader?$!jquery");

$('#requestBtn').click(() => {
  $.ajax({
    type: 'get',
    url: '/api/agents/1',
    success: function(data) {
      console.log(data);
    }
  })
})