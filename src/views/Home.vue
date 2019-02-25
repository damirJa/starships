<template>
    <div class="home">
        <div class="nav">
            <span>Home</span>
        </div>
        <img alt="Vue logo" src="../assets/rocket.svg">
        <h1>StarWars ships</h1>
        <div class="center">
            <div class="bar">
                <div class="search">
                    <input type="text" v-on:keyup.enter="searchResults" v-model="searchText" placeholder="Search">
                    <div class="button" @click="searchResults">Search</div>
                </div>
                <div class="spacer"></div>
                <div class="pagination">
                    <div>Pages: {{currentPage}} of {{Math.ceil(shipsList.count/10)}}</div>
                    <div v-if="shipsList.previous" @click="loadPage(shipsList.previous)" class="prev">Prev</div>
                    <div v-if="shipsList.next" @click="loadPage(shipsList.next)" class="next">Next</div>
                </div>
            </div>

            <div class="items_cover">
                <ShipItem v-for="ship in shipsList.results" v-bind:ship="ship"/>
                <div class="item pseudo"></div>
                <div class="item pseudo"></div>
            </div>
            <div v-if="shipsList.results.length == 0" class="notfound">
                <h2>Not found any results</h2>
                <img src="../assets/r2d2.svg">
            </div>

            <div class="bar">
                <div class="spacer"></div>
                <div class="pagination">
                    <div>Pages: {{currentPage}} of {{Math.ceil(shipsList.count/10)}}</div>
                    <div v-if="shipsList.previous" @click="loadPage(shipsList.previous)" class="prev">Prev</div>
                    <div v-if="shipsList.next" @click="loadPage(shipsList.next)" class="next">Next</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import ShipItem from '@/components/ShipItem.vue'

    export default {
        name: 'home',
        data: function () {
            return {
                shipsList: {
                    count: null,
                    next: "",
                    previous: "",
                    results: []
                },
                searchText: ""
            }
        },
        components: {
            ShipItem
        },
        methods: {
            loadPage: function (url) {
                var vm = this;
                this.$http.get(url).then(function (res) {
                    vm.shipsList = res.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            searchResults: function () {
                var vm = this;
                if(this.searchText != ""){
                    this.$http.get("https://swapi.co/api/starships/?search=" + this.searchText).then(function (res) {
                        vm.shipsList = res.data;
                    }).catch(function (error) {
                        console.log(error);
                    });
                    this.$router.push({ path: '/', query: { search: this.searchText } });
                }else{
                    this.$http.get("https://swapi.co/api/starships/").then(function (res) {
                        vm.shipsList = res.data;
                    }).catch(function (error) {
                        console.log(error);
                    });
                    this.$router.push({ path: '/'});
                }
            }
        },
        computed: {
          currentPage: function () {
              if (this.shipsList.next == null || this.shipsList.next == "") return Math.ceil(this.shipsList.count/10);
              var extNextPage = this.shipsList.next.match(/(?!https:\/\/swapi.co\/api\/starships\/\?page=)\d+/ig)[0];
              return extNextPage-1;
          }
        },
        created() {
            var searching = this.$route.query.search;
            var vm = this;
            if(searching != undefined && searching != ""){
                this.searchText = searching;
                this.$http.get("https://swapi.co/api/starships/?search=" + searching).then(function (res) {
                    vm.shipsList = res.data;
                }).catch(function (error) {
                    console.log(error);
                });
            }else{
                this.$http.get("https://swapi.co/api/starships/").then(function (res) {
                    vm.shipsList = res.data;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    .center {
        max-width: 1000px;
        margin: 0 auto;
        padding-bottom: 80px;
    }
    .bar{
        display: flex;
        vertical-align: middle;
        .spacer{
            flex-grow: 1;
        }
    }
    .search{
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
        input, .button{
            font-size: 18px;
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            display: inline-block;
            box-sizing: border-box;
            padding: 5px 8px;
            padding-bottom: 4px;
        }
        input{
            border: none;
        }
        .button{
            cursor: pointer;
            border-left: 1px solid #ccc;
            background: #ccc;
            color: #fff;
            font-weight: bold;
            user-select: none;
        }
    }
    .pagination {
        text-align: right;
        >div{
            display: inline-block;
            margin-right: 10px;
            &:last-of-type{
                margin-right: 0;
            }
        }
        .prev, .next {
            box-sizing: border-box;
            padding: 6px 8px;
            padding-bottom: 4px;
            border: 1px solid #ccc;
            border-radius: 4px;
            user-select: none;
            cursor: pointer;
        }
    }

    .items_cover {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .notfound{
        img{
            height: 50px;
        }
    }

    .item.pseudo {
        width: 225px;
        height: 1px;
    }
</style>