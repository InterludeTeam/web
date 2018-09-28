<template>
  <div id="app">
    <div class="hero-head">
      <nav class="navbar is-light">
        <div class="navbar-brand">
          <a>
          <router-link class="navbar-item" to="/" id="main-title">
            Interlude
          </router-link></a>
          <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-end">
            <router-link class="navbar-item" to="/menu">
              Продукция
            </router-link>
          </div>
        </div>
      </nav>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
    data(){
      return {
          showNav: false
      }
    }
}
</script>

<style>
  #main-title{
    color: #2962FF;
    font-weight: bold;
    font-size: 21pt;
  }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
