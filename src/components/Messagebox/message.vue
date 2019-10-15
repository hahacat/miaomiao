<template>
  <div class="message-box">
    <div class="message">
      <h2 class="title">{{opt.title}}</h2>
      <div class="content">{{opt.content}}</div>
      <div class="btn-box">
        <span class="ok" @touchstart="bindOk">{{opt.ok}}</span>
        <span class="cancel" @touchstart="bindCancel">{{opt.cancel}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox'
};
</script>

<style scoped>
.message-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  width: 200px;
  height: 200px;
  background: #bbb;
}
.title {
  text-align: center;
  font-size: 20px;
  line-height: 40px;
}
.content {
  padding: 10px 10px;
  font: 16px/24px 'microsoft yahei';
  border: 1px solid #aaa;
  border-left: none;
  border-right: none;
}
.btn-box {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
.btn-box span {
  width: 50px;
  line-height: 30px;
  background: #ccc;
  text-align: center;
}
</style>
