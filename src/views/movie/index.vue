<template>
  <div class="movie" id="main">
    <Header title="喵喵电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" class="city_name" to="/movie/city">
          <span>{{$store.state.city.nm}}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/nowcoming" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" class="search_entry" to="/movie/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <Footer />
    <router-view name="detail" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageBox } from "@/components/Messagebox/index.js";
export default {
  name: "movie",
  components: {
    Header,
    Footer
  },
  created() {
    let that = this;
    this.axios.get("/api/getLocation").then(res => {
      if (res.data.msg === "ok") {
        let data = res.data.data;
        if (data.nm !== this.$store.state.city.nm) {
          MessageBox({
            title: "位置信息",
            content: `定位城市${data.nm}与所选城市不一致，是否切换到定位城市`,
            ok: "确定",
            cancel: "取消",
            nm: data.nm,
            id: data.id,
            bindOk() {
              window.localStorage.setItem("nm", data.nm);
              window.localStorage.setItem("id", data.id);
              that.$store.commit("city/changeCityInfo", {
                nm: data.nm,
                id: data.id
              });
              that.$router.go(0);
            }
          });
        }
      }
    });
  }
};
</script>

<style scoped>
#content {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
}
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}

.movie_menu .router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>>
