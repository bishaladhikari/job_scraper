<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
@font-face {
  font-family: "Lato";
  src: local("Lato"),
  url(./assets/fonts/Lato/Lato-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Quicksand";
  src: local("Quicksand"),
  url(./assets/fonts/Quicksand/static/Quicksand-Regular.ttf) format("truetype");
}

#app {
  font-family: Quicksand;
}
</style>