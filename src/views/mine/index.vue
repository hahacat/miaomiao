<template>
  <div class="mine">
    <Header title="我的"/>
    <Loading />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
export default {
  name: 'mine',
  components: {
    Header,
    Footer,
    Loading
  }
}
</script>

<style scoped>

</style>>
