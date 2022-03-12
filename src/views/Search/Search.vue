<template>
  <v-sheet rounded="lg">
    <v-card class="header-card" style="margin:auto">
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
            <option v-for="domain in domains" :value="domain.value" :key="domain.label">
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
          <div class="form_label-title">Date Posted</div>
        </label>
        <div class="form__input">
          <select
            v-model="form.date_posted"
            autocomplete="off"
            name="date_posted"
            class="form__input-box"
          >
            <option value="" selected disabled>-- Select Date Posted --</option>
            <option v-for="date in dateOptions" :value="date.value" :key="date.label">
              {{ date.label }}
            </option>
          </select>
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
        domain: "",
        title: "",
        loc: "",
        date_posted:""
      },
      domains: [
        { label: "Indeed", value: "indeed" },
        { label: "Gulf Talent", value: "gulftalent" },
        { label: "LinkedIn", value: "linkedin" },
        // { label: "Monster Gulf", value: "monstergulf" },
        // { label: "Carret Jet", value: "careerjet" },
      ],
      dateOptions: [
        { label: "All Time", value: null },
        { label: "Past 30 Days", value: "30" },
        { label: "Past 60 Days", value: "60" },
        { label: "Past 90 Days", value: "90" },
      ],
    };
  },
  methods: {
    search() {
      if (
        this.form.title !== this.$route.query.title ||
        this.form.loc !== this.$route.query.loc ||
        this.form.domain !== this.$route.query.domain ||
        this.form.date_posted !== this.$route.query.date_posted
      ) {
        this.$router.push({
          query: {
            ...this.$route.query,
            title: this.form.title,
            loc: this.form.loc,
            domain: this.form.domain,
            date_posted: this.form.date_posted,
          },
        });
      }
      this.$route.query.search = true;
      this.$router.push({ name: "search", query: { ...this.$route.query } });
    },
  },
  mounted() {
    if (this.$route.query) {
      this.form.title = this.$route.query.title ? this.$route.query.title : "";
      this.form.loc = this.$route.query.loc ? this.$route.query.loc : "";
      this.form.domain = this.$route.query.domain
        ? this.$route.query.domain
        : "linkedin";
      this.form.date_posted = this.$route.query.date_posted
        ? this.$route.query.date_posted
        : null;
    }

    if (this.$route.query.search) {
      this.$router.push({ name: "search", query: { ...this.$route.query } });
    }
  },
};
</script>
<style scoped>
.header-card {
  box-shadow: 0 0px 1px -2px rgba(0, 0, 17, 21.2),
    0 0px 0px 0 rgba(0, 0, 0, -13.86), 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
}
</style>