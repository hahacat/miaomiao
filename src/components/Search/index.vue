<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="keyWords" />
      </div>
    </div>
    <Loading v-if="ifLoadingShow" />
    <Scroller v-else>
      <div class="search_result">
        <h3>电影/电视剧/综艺</h3>
        <ul>
          <li v-for="item in movieLists" :key="item.id">
            <div class="img">
              <img :src="item.img | setWH('128.180')" />
            </div>
            <div class="info">
              <p>
                <span>{{item.nm}}</span>
                <span>8.5</span>
              </p>
              <p>A Cool Fish</p>
              <p>{{item.cat}}</p>
              <p>{{item.rt}}</p>
            </div>
          </li>
        </ul>
      </div>
    </Scroller>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  name: "Search",
  data() {
    return {
      keyWords: "",
      movieLists: [],
      ifLoadingShow: false
    };
  },
  // http://39.97.33.178/api/searchList?cityId=10&kw=a
  created() {},
  methods: {
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求!");
      }
    }
  },
  watch: {
    keyWords(newValue) {
      this.ifLoadingShow = true;
      this.cancelRequest();
      let that = this;
      let cityId = this.$store.state.city.id;
      let kw = newValue;
      this.axios
        .get(`/api/searchList?cityId=${cityId}&kw=${kw}`, {
          cancelToken: new this.axios.CancelToken(function executor(c) {
            that.source = c;
          })
        })
        .then(res => {
          let msg = res.data.msg;
          if (msg === "ok") {
            this.movieLists = res.data.data.movies.list;
            this.ifLoadingShow = false;
          }
        }).catch(err => {
         if (err) {
            if (this.axios.isCancel(err)) {
               // 终止多次请求 请求取消 返回取消后的信息
               console.log('请求取消', err.message)
            } else {
               // 服务端数据异常
               console.log('没有搜索到数据哦')
               this.movieLists = []
            }
         }
      });
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped>
#content .search_body {
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}
.search_body .search_result {
}
.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result ul {
}
.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
  /* max-width: 240px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; */
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
</style>>
