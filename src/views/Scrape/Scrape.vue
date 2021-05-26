<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
            class="mr-10"
            color="grey darken-1"
            size="32"
        ></v-avatar>
        <v-spacer></v-spacer>
        <v-responsive max-width="260">
          <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3 px-0 py-0">
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-sheet rounded="lg">
              <v-card class="header-card">
                <v-card-title>Create your search query</v-card-title>
              </v-card>
              <v-card-text>
                <div class="col-md-12">
                  <label class="form__label">
                    <div class="form_label-title">Domains</div>
                  </label>
                  <div class="form__input">
                    <select v-model="form.domain" class="form__input-box">
                      <option value="" selected disabled>-- Select Domain --</option>
                      <option v-for="(domain,domainIndex) in domains" :key="domainIndex" :value="domain.url">
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
                <v-btn block color="primary" @click.prevent="addOnRoute">Search</v-btn>
              </v-card-text>
            </v-sheet>
          </v-col>
          <v-col cols="8">
            <v-card
                min-height="70vh"
                rounded="lg"
            >
              <v-card-title>
                Job Results
                <v-spacer></v-spacer>
                <v-btn
                    @click.prevent="downloadExcel"
                    rounded
                    color="success"
                    dark
                    :disabled="!excelData.length"
                >
                  Download Excel
                </v-btn>
              </v-card-title>
              <v-card-text style="position: relative">
                <v-progress-linear
                    v-if="showLoading"
                    color="primary accent-4"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
                <v-data-table
                    :headers="headers"
                    :items="excelData"
                    hide-default-header
                    hide-default-footer
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    @page-count="pageCount = $event"
                    item-key="id"
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                    <v-list-item
                        v-for="(job, index) in items"
                        :key="index"
                        :href="job.JobUrl"
                        target="_blank"
                        style="background: #FAF9F9; margin-bottom: 8px"
                    >
                      <v-list-item-content>
                        {{ job.JobTitle }} <span>{{ job.PostDate }}</span>
                        <v-list-item-subtitle class="cut-text">
                          <div class="company">{{ job.Company }}</div>
                          <div class="location">{{ job.Location }}</div>
                          <div class="location">{{ job.salaray }}</div>
                          <div class="summary">{{ job.Summary }}</div>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    </tbody>
                  </template>
                </v-data-table>
                <template v-if="excelData.length">
                  <div class="text-center">
                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                        :total-visible="7"
                    ></v-pagination>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as XLSX from "xlsx";

const axios = require('axios').default;

export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    domains: [
      {label: 'indeed UAE', url: 'ae.indeed.com'},
      {label: 'linkedin', url: 'linkedin.com'},
      {label: 'indeed UK', url: 'uk.indeed.com'},
    ],
    form: {
      domain: '',
      title: '',
      loc: '',
      keywords: '',
    },
    exportLink: '',
    excelData: [],
    headers: [
      {
        text: 'Job Title',
        align: 'start',
        sortable: false,
        value: 'JobTitle',
      },
      {text: 'Company', value: 'Company'},
      {text: 'Location', value: 'Location'},
      {text: 'PostDate', value: 'PostDate'},
      {text: 'JobUrl', value: 'JobUrl'},
      {text: 'Salary', value: 'Salary'},
      {text: 'Summary', value: 'Summary'},
    ],
    showLoading: false,
  }),
  methods: {
    addOnRoute() {
      if (this.form.title !== this.$route.query.title ||
          this.form.loc !== this.$route.query.loc ||
          this.form.keywords !== this.$route.query.keywords ||
          this.form.domain !== this.$route.query.domain) {
        this.$router.push({
          query: {
            ...this.$route.query,
            'title': this.form.title,
            'loc': this.form.loc,
            'keywords': this.form.keywords,
            'domain': this.form.domain
          }
        });
      }
      this.getJobListing();
    },
    getJobListing() {
      this.showLoading = true;
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        },
        params: {...this.form},
        responseType: 'arraybuffer'
      }
      this.excelData = [];
      this.exportLink = '';
      // axios.get(`https://scrapejobs.herokuapp.com/`, config)
      axios.get(`https://jobscraper.azurewebsites.net/`, config)
          .then(response => {
                let blobn = new Blob([response.data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
                this.excelExport(blobn);
                let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                this.exportLink = fileURL;
              }
          ).finally(() => {
        this.showLoading = false;
      })
    },
    excelExport(file) {
      let input = file;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type: 'binary'});
        wb.SheetNames.forEach((sheetName) => {
          let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          this.excelData = rowObj
        })
      };
      reader.readAsBinaryString(input);
    },
    downloadExcel() {
      let fileLink = document.createElement('a');
      fileLink.href = this.exportLink;
      fileLink.setAttribute('download', 'job.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    }
  },
  mounted() {
    if (this.$route.query) {
      this.form.title = this.$route.query.title ? this.$route.query.title : '';
      this.form.loc = this.$route.query.loc ? this.$route.query.loc : '';
      this.form.keywords = this.$route.query.keywords ? this.$route.query.keywords : '';
      this.form.domain = this.$route.query.domain ? this.$route.query.domain : '';
    }
  }
}
</script>
<style scoped>
.header-card {
  box-shadow: 0 0px 1px -2px rgba(0,0,17,21.2),0 0px 0px 0 rgba(0,0,0,-13.86),0 1px 3px 0 rgba(0,0,0,.12)!important
}
</style>