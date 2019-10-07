<template>
  <div id="detail-container" class="slide">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="goBack"></i>
    </Header>
    <Loading v-if="ifLoadingShow" />
    <div id="content" class="contentDetail" v-else>
      <div class="detail_list">
        <div
          class="detail_list_bg"
          v-bind:style="{ backgroundImage : `url( ${movieDetail.albumImg})` }"
        ></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="movieDetail.img | setWH('148.208')" alt />
          </div>
          <div class="detail_list_info">
            <h2>{{movieDetail.nm}}</h2>
            <p>{{movieDetail.enm}}</p>
            <p>{{movieDetail.sc}}</p>
            <p>{{movieDetail.cat}}</p>
            <p>{{ movieDetail.src }} / {{ movieDetail.dur }}分钟</p>
            <p>{{ movieDetail.pubDesc }}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{ movieDetail.dra }}</p>
      </div>
      <div class="detail_player">
        <swiper class="ul" ref="detail_player" :options="swiperOption">
          <swiper-slide
            class="swiper-slide li"
            v-for="(item,index) in movieDetail.photos"
            :key="index"
          >
            <div>
              <img :src="item | setWH('140.127')" alt />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Loading from "@/components/Loading";
export default {
  name: "detail",
  props: ["id"],
  data() {
    return {
      movieDetail: {},
      ifLoadingShow: true,
      swiperOption: {
        spaceBetween: 20,
        slidesPerView: "auto",
        freeMode: true,
        freeModeSticky: true,
        prevId: -1
      }
    };
  },
  computed: {
    // swiper() {
    //   return this.$refs.detail_player;
    // }
  },
  components: {
    Header,
    swiper,
    swiperSlide,
    Loading
  },
  created() {
    this.getMovieDetail();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getMovieDetail() {
      // http://39.97.33.178/api/detailmovie?movieId=345808
      if (this.prevId === this.id) {
        // 同一个电影
        this.movieDetail = window.localStorage.getItem("movieDetail");
        this.ifLoadingShow = false;
      } else {
        // 不同的电影
        this.axios.get(`/api/detailmovie?movieId=${this.id}`).then(res => {
          let msg = res.data.msg;
          if (msg === "ok") {
            this.movieDetail = res.data.data.detailMovie;
            this.ifLoadingShow = false;
            window.localStorage.setItem("movieDetail", this.movieDetail);
            this.prevId = this.id;
          }
        });
      }
    }
  }
};
</script>

<style scoped>
#detail-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  z-index: 100;
  background: #fff;
}

@keyframes slide {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
.slide {
  animation: slide .5s ease;
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  /* background: url(../../assets/img/movie_1.jpg) 0 40%; */
  background-position: 0 40%;
  /* filter: blur(20px); */
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}

#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
  height: 140px;
  position: relative;
}

.detail_player .ul {
  position: absolute;
  top: 0;
  left: 0;
  height: 140px;
  width: 100%;
}
.detail_player .li {
  width: 70px;
  /* margin-right: 20px; */
  text-align: center;
  font-size: 14px;
}
.detail_player .li img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .li p:nth-of-type(2) {
  color: #999;
}
</style>
