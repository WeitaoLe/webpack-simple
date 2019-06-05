import $ from 'jquery';
import io from 'js/common/request';
import Event from 'js/common/event';
import message from 'js/common/message/index';

let getLicense = () => {
  io.get('/fangzhou/usercenter/ark/enterprise/license/status', (data) => {
    let entry = $("#licenseEntry")
    let datas = data.datas
    datas.isManager === 0 ? entry.hide() : entry.show()
    Event.emit('license', datas)
  }, (data) => {
    message.error('获取license失败')
  })
}

export default getLicense
