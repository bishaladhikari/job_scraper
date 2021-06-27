<template>
  <v-card
      min-height="100vh"
      rounded="lg"
  >
    <v-card-title>
      <v-btn depressed @click.prevent="backToSearch">
        Back
      </v-btn>
      <v-spacer></v-spacer>
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
      axios.get(`https://scrapejobs.herokuapp.com/`, config)
      // axios.get(`https://jobscraper.azurewebsites.net/`, config)
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
      fileLink.setAttribute('download', this.$route.query.title + '.xlsx');
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
</style>