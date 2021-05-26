<template>
  <v-container fluid class="main-container">
    <v-layout>
      <v-flex class="details" :class="{'sm10':showSidebar}">
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      menu: [],
      showSidebar: true
    }
  },
  watch: {
    '$route.params.projectId': function () {
      this.showSidebar = false;
    }
  },
  mounted() {
    if (this.$route.params.projectId)
      this.showSidebar = false;
  }
};
</script>
