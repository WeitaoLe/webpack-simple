import Event from 'js/common/event';
import Vue from 'vue';
import io from 'js/common/request';
import $message from 'js/common/message/index.js';

const reg = {
  name: /^[\s\S]{1,49}$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
  phone: /^1[3|4|5|7|8]\d{9}$/,
  entName: /^[\s\S]{1,49}$/,
  companySize: /^[\s\S]{1,}$/,
  department: /^[\s\S]{1,}$/,
  remarks: /^[\s\S]{1,200}$/
},
errText = {
  name: '请输入联系人(最多50个字)',
  email: '请输入正确的工作邮箱',
  phone: '请输入正确的手机号',
  entName: '请输入公司名称(最多50个字)'
},
text = {
  name: '联系人',
  email: '邮箱',
  phone: '手机号',
  entName: '公司名称'
};

let app = new Vue({
  el: '#order',
  data: {
    scaleList: ['10以下','10-50人','50-100人','100-200人','200-500人','500-1000人','1000人以上'],
    departmentList: ['产品', '技术', '运营', '市场', '战略', '其他'],
    params: {
      name: '',
      email: '',
      phone: '',
      entName: '',
      companySize: '',
      department: '',
      remarks: ''
    },
    showScaleList: false,
    showDepartmentList: false,
    show: {
      companySize: false,
      department: false
    },
    disabled: { name: false, email:false, phone: false, entName: false, companySize: false, department:false, remarks: false },
    orderError: false,
    height: 0
  },
  methods: {
    display() {
      this.params = {
        name: '',
        email: '',
        phone: '',
        entName: '',
        companySize: '',
        department: '',
        remarks: ''
      }
      let $target = $('.m-order-demo')
      $target.addClass('show')
      this.height = $(window).scrollTop()
      $(window).scrollTop(0)
      $('body').addClass('overflow-y-hidden')
      $target.find('[node-type="form"]').fadeIn()
      this.getInitData()
    },
    showDropDown(name) {
      if (this.disabled[name]) {
        return
      } else {
        this.show[name] = !this.show[name]
      }
    },
    getInitData() {
      io.post('/fangzhou/usercenter/demon/getDemoInfo', (res) => {
        let data = res.datas
        // let data = {
        //   name: '12324',
        //   email: '123@qq.com',
        //   phone: '13211111111',
        //   entName: 'sad',
        //   companySize: '10以下',
        //   department: '产品',
        //   remarks: 'sdaf',
        //   id: 1234
        // }
        if (data) {
          for(let v in this.params){
            this.params[v] = data[v]
          }
          for(let v in data) {
            if (data[v]) {
              this.disabled[v] = true
            }
          }
        }

      })
    },
    closeOrder() {
      let $target = $('.m-order-demo')
      for(let name in this.params) {
        $(`[node-type=${name}]`).attr('err-type', false)
      }
      $target.find('[node-type="form"]').fadeOut(200, () => {
        $target.removeClass('show')
      })
      $('body').removeClass('overflow-y-hidden')
      $(window).scrollTop(this.height)
    },
    chooseItem (v, name) {
      this.params[name] = v
      this.show[name] = false
      $(`[node-type=${name}]`).attr('err-type', false)
    },
    userInfoCheck(name) {
      if (this.orderError && reg[name].test(this.params[name]) ) {
        let $target = $(`[node-type=${name}]`)
        $target.attr('err-type', false)
        if (text.hasOwnProperty(name)) {
          $target.find('span').html(text[name])
        }
      }
    },
    submitOrder() {
      this.orderError = false
      for(let v in this.params) {
        if (!reg[v].test(this.params[v])) {
          this.orderError = true
          let $target = $(`[node-type=${v}]`)
          $target.attr('err-type', true)
          if (errText.hasOwnProperty(v) ) {
            $target.find('span').html(errText[v])
          }
        } else {
          if (v === 'email' && !this.disabled.email ) {
            let reg = /(163|126|qq|sina|edu|tom|21cn|139|189|foxmail|sohu|icloud|hotmail|yahoo|gmail|yeah)\.(net|com|cn|com\.cn)$/
            if (reg.test(this.params[v])) {
              this.orderError = true
              let $target = $(`[node-type=${v}]`)
              $target.attr('err-type', true)
              if (errText.hasOwnProperty(v) ) {
                $target.find('span').html(errText[v])
              }
            }
          }
        }
      }
      if (!this.orderError) {
        io.post('/fangzhou/usercenter/demon/oprDemon', this.params, (res)=> {
          _hmt.push(['_trackEvent', window.location.href, '预约成功']);
          var profiles = {
            "company": this.params.entName,
            "companyScale": this.params.companySize,
            "department": this.params.department,
            "isSchedule": true,
          }
          AnalysysAgent.profileSet(profiles);
          $message.success(res.msg,1000 ,()=> {
            this.closeOrder()
          })
        }, (e) => {
          $message.error(e.msg, 1000, () => {
            this.closeOrder()
          })
        })
      }
    }
  },
  mounted() {
    Event.on('order/demo', () => {
      this.display();
    })
    this.$nextTick(() => {
      $('body').on('click', (e) => {
        let $size = $(e.target).closest('[node-type="companySize"]')
        let $department = $(e.target).closest('[node-type="department"]')
        if(!$size.length) this.show.companySize = false
        if(!$department.length) this.show.department = false
      })
    })
  }
})
