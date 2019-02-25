<template>
  <router-link :to="{ name: 'shipcard', params: { shipId: extractId(ship.url) }}"class="item">
    <h2>{{ship.name}}</h2>
    <div>
      <div class="param">
        <span>Cost:</span>
        <span>{{ship.cost_in_credits | simplifyCost}}<img v-if="ship.cost_in_credits != 'unknown'" src="../assets/coin.svg"></span>
      </div>
      <div class="param">
        <span>Length:</span>
        <span>{{ship.length}} m</span>
      </div>
      <div class="param">
        <span>Crew:</span>
        <span>{{ship.crew}}<img src="../assets/network.svg"></span>
      </div>
      <div class="param long">
        <span>Class:</span>
        <span>{{ship.starship_class | capitalize}}</span>
      </div>
    </div>
    <div class="button">Show</div>
  </router-link>
</template>

<script>
export default {
  name: 'ShipItem',
  props: ['ship'],
  methods:{
    extractId: function(url){
      var matchUrl = url.match(/(?!https:\/\/swapi.co\/api\/starships\/)\d+(?=\/)/ig)[0];
      return matchUrl;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  .item{
    width: 225px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
    color: #212121;
    padding: 20px 16px;
    margin-bottom: 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2{
      margin-top: 0;
      line-height: 29px;
      min-height: 58px;
    }
  }
  .param{
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    &.long{
      display: block;
      min-height: 75px;
      margin-top: 20px;
      span{
        display: block;
      }
    }
    &:last-of-type{
      margin-bottom: 0;
    }
    img{
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
      margin-top: -4px;
    }
  }
  .button{
    background: #ffed52;
    line-height: 38px;
    font-size:  18px;
    font-weight: bold;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
  }
</style>
