<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroller',
  mounted () {
    const options = {
      scrollY: true, // 因为scrollY默认为true，其实可以省略
      tap: true,
      probeType: 1
    }
    // setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, options)
    // }, 200)
  },
  methods: {
    toScrollTop(y){
        this.scroll.scrollTo(0,y);
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
