<template>
  <div class="city_body">
    <div class="city_list">
      <Scroller ref="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotLists"
                :key="item.id"
                @tap="changeCityInfo(item.nm, item.id)"
              >{{item.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="(item, ind) in cityLists" :key="ind">
              <h2>{{item.index}}</h2>
              <ul>
                <li
                  v-for="city in item.list"
                  :key="city.id"
                  @tap="changeCityInfo(city.name, city.id)"
                >{{city.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, ind) in cityLists"
          :key="ind"
          @touchstart="scrollToCityList(ind)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      hotLists: [],
      cityLists: []
    };
  },
  created() {
    this.getCityLists();
  },
  methods: {
    getCityLists() {
      let cityLists = [];
      let that = this;
      this.axios.get("/api/cityList").then(res => {
        let msg = res.data.msg;
        if (msg === "ok") {
          cityLists = res.data.data.cities;
          // console.log(cityLists);
          // 生成hotLists
          // cityLists 格式 [{index: 'A', lists: [{}, {}]}]
          cityLists.forEach((el, ind) => {
            if (el.isHot === 1) {
              this.hotLists.push(el);
            }
          });

          for (var i = 0; i < cityLists.length; i++) {
            let firstLetter = cityLists[i].py.substring(0, 1).toUpperCase();
            if (formatCityList(firstLetter)) {
              // 有
              this.cityLists.forEach((v, j) => {
                if (v.index === firstLetter) {
                  v.list.push({ name: cityLists[i].nm, id: cityLists[i].id });
                }
              });
            } else {
              // 没有
              this.cityLists.push({
                index: firstLetter,
                list: [{ name: cityLists[i].nm, id: cityLists[i].id }]
              });
            }
          }

          this.cityLists.sort((a, b) => {
            if (a.index > b.index) {
              return 1;
            } else {
              return -1;
            }
          });

          function formatCityList(firstLetter) {
            for (let i = 0; i < that.cityLists.length; i++) {
              if (firstLetter === that.cityLists[i].index) {
                return true;
              }
            }
            return false;
          }
        }
      });
    },
    scrollToCityList(ind) {
      let currentElement = this.$refs.city_sort.children[ind];
      this.$refs.city_list.toScrollTop(-currentElement.offsetTop);
    },
    changeCityInfo(nm, id) {
      this.$store.commit("city/changeCityInfo", { nm, id });
      window.localStorage.setItem("id", id);
      window.localStorage.setItem("nm", nm);
      this.$router.push("/movie/nowplaying");
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
