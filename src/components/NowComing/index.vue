<template>
  <div class="movie_body">
    <Loading v-if="ifLoadingShow" />
    <Scroller v-else>
      <ul>
        <li v-for="item in movieLists" :key="item.id">
          <div class="pic_show">
            <img :src="item.img | setWH('128.180')" @tap="goToDetail(item.id)" />
          </div>
          <div class="info_list">
            <h2>{{item.nm}}</h2>
            <img src="@/assets/img/maxs.png" v-show="item.version.includes('v3d')" />
            <p>
              <span class="person">{{item.wish}}</span> 人想看
            </p>
            <p>主演：{{item.star}}</p>
            <p>{{item.rt}}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  name: "nowcoming",
  data() {
    return {
      movieLists: [],
      prevId: -1,
      ifLoadingShow: true
    };
  },
  // http://39.97.33.178/api/movieComingList?cityId=10
  activated() {
    let cityId = this.$store.state.city.id;
    if (cityId === this.prevId) {
      return;
    }
    this.getMovieLists();
  },
  methods: {
    getMovieLists() {
      let cityId = this.$store.state.city.id;
      this.axios
        .get("/api/movieComingList", {
          params: {
            cityId
          }
        })
        .then(res => {
          let data = res.data;
          if (data.status === 0) {
            this.movieLists = data.data.comingList;
            this.ifLoadingShow = false;
          }
        });
    },
    goToDetail(id) {
      this.$router.push({ path: `detail/nowcoming/${id}` });
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
