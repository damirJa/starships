<template>
  <div class="about">
    <div class="nav">
      <a @click="$router.go(-1)">Back</a> |
      <span>Ship Card</span>
    </div>
    <h1>This is ship {{ship.name}}</h1>
    <div class="center">
      <table>
        <tr>
          <td>Model:</td>
          <td>{{ship.model}}</td>
        </tr>
        <tr>
          <td>Class:</td>
          <td>{{ship.starship_class}}</td>
        </tr>
        <tr>
          <td>Manufacturer:</td>
          <td>{{ship.manufacturer}}</td>
        </tr>
        <tr>
          <td>Cost:</td>
          <td>{{ship.cost_in_credits}}</td>
        </tr>
        <tr>
          <td>Length:</td>
          <td>{{ship.length}}</td>
        </tr>
        <tr>
          <td>Crew:</td>
          <td>{{ship.crew}}</td>
        </tr>
        <tr>
          <td>Passengers:</td>
          <td>{{ship.passengers}}</td>
        </tr>
        <tr>
          <td>Max atmo. speed:</td>
          <td>{{ship.max_atmosphering_speed}}</td>
        </tr>
        <tr>
          <td>Hyperdrive rating</td>
          <td>{{ship.hyperdrive_rating}}</td>
        </tr>
        <tr>
          <td>Megalights/hour</td>
          <td>{{ship.MGLT}}</td>
        </tr>
        <tr>
          <td>Cargo</td>
          <td>{{ship.cargo_capacity}}</td>
        </tr>
        <tr>
          <td>Consumables</td>
          <td>{{ship.consumables}}</td>
        </tr>
        <tr>
          <td>Films</td>
          <td>
            <span v-for="(film, index) in films">{{index == 0 ? film : ", " + film}}</span>
            <span v-if="films.length == 0">n/a</span>
          </td>
        </tr>
        <tr>
          <td>Pilots</td>
          <td>
            <span v-for="(pilot, index) in pilots">{{index == 0 ? pilot : ", " + pilot}}</span>
            <span v-if="pilots.length == 0">n/a</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shipcard',
    data: function () {
      return {
        films: [],
        pilots: [],
        ship: {
          MGLT: "",
          cargo_capacity: "",
          consumables: "",
          cost_in_credits: "",
          created: "",
          crew: "",
          edited: "",
          films: [],
          hyperdrive_rating: "",
          length: "",
          manufacturer: "",
          max_atmosphering_speed: "",
          model: "",
          name: "",
          passengers: "",
          pilots: [],
          starship_class: "",
          url: ""
        }
      }
    },
    methods: {
      filmName: function (url, index) {
        var vm = this;
        this.$http.get(url).then(function (res) {
          vm.films.push(res.data.title);
        }).catch(function (error) {
          console.log(error);
        });
      },
      pilotsName: function (url, index) {
        var vm = this;
        this.$http.get(url).then(function (res) {
          vm.pilots.push(res.data.name);
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    created() {
      var vm = this;
      this.$http.get("https://swapi.co/api/starships/" + this.$route.params.shipId).then(function (res) {
        vm.ship = res.data;
        vm.ship.films.forEach(function (url, index) {
          vm.filmName(url, index)
        })
        vm.ship.pilots.forEach(function (url, index) {
          vm.pilotsName(url, index)
        })
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style scoped lang="less">
  .nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .center{
    max-width: 1000px;
    margin: 0 auto;
  }
  table{
    margin: 0 auto;
    text-align: left;
    td{
      padding: 5px;
    }
    td:first-of-type{
      padding-right: 15px;
    }
  }
</style>
