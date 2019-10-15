import Vue from 'vue';
import Message from './message.vue';

export let MessageBox = (function () {
  // let options = {}
  return function (options) {
    let opt = options || {
      title: '',
      content: '',
      ok: '',
      cancel: '',
      bindCancel: null,
      bindOk: null
    }

    let Vm = Vue.extend(Message)
    let vm = new Vm({
      el: document.createElement('div'),
      data() {
        return {
          opt
        }
      },
      methods: {
        bindOk() {
          this.opt.bindOk()
          document.body.removeChild(vm.$el);
        },
        bindCancel() {
          document.body.removeChild(vm.$el);
        }
      },
      comments: {
        Message
      }
    })

    document.body.appendChild(vm.$el);
  }
})()
