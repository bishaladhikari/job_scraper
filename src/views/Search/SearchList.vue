<template>
  <v-card
      class="header-card"
      min-height="100vh"
      rounded="lg"
  >
    <v-card-title class="pa-0">
      <v-toolbar flat>
        <v-btn depressed @click.prevent="backToSearch">
          Back to search
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            @click.prevent="downloadExcel"
            color="success"
            dark
            :disabled="!excelData.length"
        >
          Download Excel
        </v-btn>
      </v-toolbar>

    </v-card-title>
    <v-card-subtitle>
      <h3 class="mt-5">{{ $route.query.title }} jobs in {{ $route.query.loc }}</h3>
      <span v-if="$route.query.date_posted">Past {{$route.query.date_posted}} days</span> <a href="javascript:" @click.prevent="backToSearch">change</a>
      <p v-if="!showLoading">Showing top {{ excelData.length }} results from {{$route.query.domain}}</p>
    </v-card-subtitle>

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
              <v-row>
                <v-col class="col-2">
                  <img height="40px" width="40px" v-if="job.JobUrl.includes('linkedin')"
                       src='https://ricardoreadingmouse.com.au/wp-content/uploads/2018/04/linkedin-logo-copy.png'/>
                  <img height="40px" width="40px" v-else-if="job.JobUrl.includes('indeed')"
                       src='https://i2.wp.com/iaccessibility.net/wp-content/uploads/2018/04/indeed-employer-logo.png?fit=300%2C300&ssl=1'/>
                  <img height="40px" width="40px" v-else
                       src='https://www.gulftalent.com/images1/gulftalent_logo.png?v2_149_1'/>
                </v-col>
                <v-col class="col-10">
                  <h3>{{ job.JobTitle }}</h3> <span>{{ job.PostDate }}</span>
                  <v-list-item-subtitle class="cut-text">
                    <div class="company">{{ job.Company }}</div>
                    <div class="location">{{ job.Location }}</div>
                    <div class="location">{{ job.salaray }}</div>
                    <div class="summary">{{ job.Summary }}</div>
                  </v-list-item-subtitle>
                </v-col>
              </v-row>

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
</template>

<script>
import * as XLSX from "xlsx";

const axios = require('axios').default;

export default {
  name: "SearchList",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
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
    }
  },
  methods: {
    getJobListing() {
      this.showLoading = true;
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        },
        params: {...this.$route.query},
        responseType: 'arraybuffer'
      }
      this.excelData = [];
      this.exportLink = '';
      // axios.get(`https://stunningcv.com/`, config)
      axios.get(`http://127.0.0.1:5000/`, config)
          // axios.get(`https://jobscraper.azurewebsites.net/`, config)
          .then(response => {
                let blobn = new Blob([response.data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
                this.excelExport(blobn);
                this.exportLink = window.URL.createObjectURL(new Blob([response.data]));
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
          this.excelData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        })
      };
      reader.readAsBinaryString(input);
    },
    downloadExcel() {
      let fileLink = document.createElement('a');
      fileLink.href = this.exportLink;
      fileLink.setAttribute('download', this.$route.query.title + '_' + this.$route.query.domain + '.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    },
    backToSearch() {
      this.$route.query.search = false;
      this.$router.push({name: 'welcome', query: {...this.$route.query,}})
    }
  },
  mounted() {
    if (this.$route.query.search) {
      this.getJobListing();
    }
  }
}
</script>


<style scoped>
.summary {
  white-space: break-spaces;
}

.header-card {
  box-shadow: 0 0px 1px -2px rgba(0, 0, 17, 21.2), 0 0px 0px 0 rgba(0, 0, 0, -13.86), 0 1px 3px 0 rgba(0, 0, 0, .12) !important
}

.v-card__title {
  position: sticky !important;
  top: 0 !important;
  z-index: 999 !important;
}
</style>