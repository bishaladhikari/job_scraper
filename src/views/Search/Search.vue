<template>
  <v-sheet rounded="lg">
    <v-card class="header-card">
      <v-card-title>Create your search query</v-card-title>
    </v-card>
    <v-card-text>
      <div class="col-md-12 col-sm-12">
        <label class="form__label">
          <div class="form_label-title">Domain</div>
        </label>
        <div class="form__input">
          <select
              v-model="form.domain"
              autocomplete="off"
              name="domain"
              class="form__input-box"
          >
            <option value="" selected disabled>-- Select Domain --</option>
            <option v-for="domain in domains" :value="domain.value">
              {{ domain.label }}
            </option>
          </select>
        </div>
      </div>
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
      domains: [
        {label: 'Indeed', value: 'indeed'},
        {label: 'Gulf Talent', value: 'gulftalent'},
        {label: 'LinkedIn', value: 'linkedin'},
      ]
    }
  },
  methods: {
    search() {
      if (this.form.title !== this.$route.query.title ||
          this.form.loc !== this.$route.query.loc ||
          this.form.domain !== this.$route.query.domain ||
          this.form.keywords !== this.$route.query.keywords) {
        this.$router.push({
          query: {
            ...this.$route.query,
            'title': this.form.title,
            'loc': this.form.loc,
            'keywords': this.form.keywords,
            'domain': this.form.domain,
          }
        });
      }
      this.$route.query.search = true;
      this.$router.push({name: 'search', query: {...this.$route.query}});
    },
  },
  mounted() {
    if (this.$route.query) {
      this.form.title = this.$route.query.title ? this.$route.query.title : '';
      this.form.loc = this.$route.query.loc ? this.$route.query.loc : '';
      this.form.keywords = this.$route.query.keywords ? this.$route.query.keywords : '';
      this.form.domain = this.$route.query.domain ? this.$route.query.domain : 'ae.indeed.com';
    }

    if (this.$route.query.search) {
      this.$router.push({name: 'search', query: {...this.$route.query}})
    }
  }
}
</script>
<style scoped>
.header-card {
  box-shadow: 0 0px 1px -2px rgba(0, 0, 17, 21.2), 0 0px 0px 0 rgba(0, 0, 0, -13.86), 0 1px 3px 0 rgba(0, 0, 0, .12) !important
}
</style>