import Vue from 'vue';
import Message from './message.vue';

export let MessageBox = (function () {
  // let options = {}
  return function (options) {
    let opt = options || {
      title: '位置信息',
      content: '定位城市与所选城市不一致，是否切换到定位城市',
      ok: '确定',
      cancel: '取消',
      bindCancel: null,
      bindOk: null
    }

    let Vm = Vue.extend(Message)
    let vm = new Vm({
      el: document.createElement('div'),
      data () {
        return {
          opt
        }
      },
      methods: {
        bindOk () {
          console.log('b')
        },
        bindCancel() {
          console.log('a')
        }
      },
      comments: {
        Message
      }
    })

    document.body.appendChild( vm.$el );
  }
})()