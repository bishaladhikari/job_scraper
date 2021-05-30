<template>
  <v-sheet rounded="lg">
    <v-card class="header-card">
      <v-card-title>Create your search query</v-card-title>
    </v-card>
    <v-card-text>
      <div class="col-md-12 col-sm-12">
        <label class="form__label">
          <div class="form_label-title">Job Title</div>
        </label>
        <div class="form__input">
          <input
              v-model="form.title"
              placeholder="Enter Job Title"
              autocomplete="off"
              name="title"
              class="form__input-box"
          />
          <div class="form__input-indicator"></div>
        </div>
      </div>
      <div class="col-md-12 col-sm-12">
        <label class="form__label">
          <div class="form_label-title">Location</div>
        </label>
        <div class="form__input">
          <input
              type="text"
              v-model="form.loc"
              placeholder="Eg: uae,dubai"
              autocomplete="off"
              name="location"
              class="form__input-box"
          />
          <div class="form__input-indicator"></div>
        </div>
      </div>
      <div class="col-md-12 col-sm-12">
        <label class="form__label">
          <div class="form_label-title">Include Keywords</div>
        </label>
        <div class="form__input">
          <input
              v-model="form.keywords"
              placeholder="Enter keywords or leave blank"
              autocomplete="off"
              name="keywords"
              class="form__input-box"
          />
          <div class="form__input-indicator"></div>
        </div>
      </div>
      <v-btn block color="primary" @click.prevent="search">Search</v-btn>
    </v-card-text>
  </v-sheet>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      form: {
        domain: '',
        title: '',
        loc: '',
        keywords: '',
      },
    }
  },
  methods: {
    search() {
      if (this.form.title !== this.$route.query.title ||
          this.form.loc !== this.$route.query.loc ||
          this.form.keywords !== this.$route.query.keywords) {
        this.$router.push({
          query: {
            ...this.$route.query,
            'title': this.form.title,
            'loc': this.form.loc,
            'keywords': this.form.keywords,
            'search': true
          }
        });
      }
      this.$router.push({name: 'search', query: {...this.$route.query}});
    },
  },
  mounted() {
    if (this.$route.query) {
      this.form.title = this.$route.query.title ? this.$route.query.title : '';
      this.form.loc = this.$route.query.loc ? this.$route.query.loc : '';
      this.form.keywords = this.$route.query.keywords ? this.$route.query.keywords : '';
    }
  }
}
</script>