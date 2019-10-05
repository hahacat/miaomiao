<template>
  <div class="cinema_body">
    <Scroller>
      <ul>
        <li v-for="item in cinemaLists" :key="item.id">
          <div>
            <span>{{item.nm}}</span>
            <span class="q">
              &nbsp;&nbsp;
              <span class="price">{{item.sellPrice}}</span> 元起
            </span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div class="card">
            <div v-for="(ind, card) of item.tag" :key="card" v-if="ind === 1" :class="card | classFilter">{{card | cardFilter}}</div>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "cinemalist",
  data() {
    return {
      cinemaLists: [],
      prevId: -1
    };
  },
  filters: {
    cardFilter(value) {
      const obj = {
        'sell': '折扣卡',
        'snack': '小吃',
        'allowRefund': '改',
        'endorse': '退'
      }
      for(let key in obj) {
        if (value === key) {
          return obj[key]
        }
      }
    },
    classFilter (value) {
      const obj = {
        'sell': 'or',
        'snack': 'or',
        'allowRefund': 'bl',
        'endorse': 'bl'
      }
      for(let key in obj) {
        if (value === key) {
          return obj[key]
        }
      }
    }
  },
  activated() {
    let cityId = this.$store.state.city.id;
    if (cityId === this.prevId) {
      return;
    }
    this.axios
      .get("/api/cinemaList", {
        params: {
          cityId
        }
      })
      .then(res => {
        let msg = res.data.msg;
        if (msg === "ok") {
          this.cinemaLists = res.data.data.cinemas;
          this.prevId = cityId;
        }
      });
  }
  // http://39.97.33.178/api/cinemaList?cityId=10
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
  display: flex;
}
.cinema_body .address span:nth-of-type(2) {
  margin-left: 10px;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>