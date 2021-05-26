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

        <v-btn
            v-for="link in links"
            :key="link"
            text
        >
          {{ link }}
        </v-btn>

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

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-sheet rounded="lg">
              <v-card>
                <v-card-title>Create your search query</v-card-title>
              </v-card>
              <v-card-text>
                <div class="col-md-12">
                  <label class="form__label">
                    <div class="form_label-title">Domains</div>
                  </label>
                  <div class="form__input">
                    <select v-model="form.domainUrl" class="form__input-box">
                      <option value="" selected disabled>-- Select Domain --</option>
                      <option v-for="(domain,domainIndex) in domains" :key="domainIndex" :value="domain.label">
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
                        v-model="form.job_title"
                        placeholder="Enter Job Title"
                        autocomplete="off"
                        name="job_title"
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
                        v-model="form.location"
                        placeholder="Enter Location"
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
                <div class="col-md-12 col-sm-12">
                  <label class="form__label">
                    <div class="form_label-title">Copy Url</div>
                  </label>
                  <div class="form__input">
                    <input
                        placeholder="Enter keywords or leave blank"
                        autocomplete="off"
                        name="keywords"
                        class="form__input-box"
                    />
                    <div class="form__input-indicator"></div>
                  </div>
                </div>
              </v-card-text>
            </v-sheet>
          </v-col>
          <v-col cols="8">
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
              <div class="col-md-12">
                <div id="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">Drop Here</div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table class="table table-striped table-hover table-condensed table-responsive">
                    <thead>
                    <tr>
                      <th v-for="item in headers">{{ item }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in tickets">
                      <td v-for="key in item">
                        <label>{{ key }}</label>
                        <p>{{ item.key }}</p>
                      </td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const axios = require('axios').default;
export default {
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
    domains: [
      {label: 'indeed', url: 'ae.indeed.com'},
      {label: 'linkedin', url: 'linkedin.com'},
    ],
    form: {
      domainUrl: '',
      job_title: '',
      location: '',
      keywords: '',
      url: ''
    },
    tickets:[{name:"test"}],
    headers:["Test header"]
  }),
  methods: {
    addOnRoute() {
      this.$router.push({
        query: {
          ...this.$route.query,
          'job_title': this.form.job_title,
          'location': this.form.location,
          'keywords': this.form.keywords,
          'domainUrl': this.form.domainUrl
        }
      });
      this.getJobListing();
    },
    getJobListing() {
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        }
      }
      axios.get(`https://scrapejobs.herokuapp.com/?type=${this.form.domainUrl}&title=${this.form.job_title}&loc=${this.form.location}`, config)
          .then(response => {
            console.log(response);
          })
    },
    get_header_row(sheet) {
      var headers = [],
          range = XLSX.utils.decode_range(sheet["!ref"]);
      var C,
          R = range.s.r; /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        var cell =
            sheet[
                XLSX.utils.encode_cell({c: C, r: R})
                ]; /* find the cell in the first row */
        var hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    fixData(data) {
      var o = "",
          l = 0,
          w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
            null,
            new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    workbook_to_json(workbook) {
      var result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      return result;
    },
    handleDrop(e) {
      e.stopPropagation();
      let files = e.dataTransfer.files, i, f;
      for (i = 0, f = files[i]; i != files.length; ++i) {
        let reader = new FileReader(),
            name = f.name;
        reader.onload = function (e) {
          let results,
              data = e.target.result,
              fixedData = this.fixData(data),
              workbook = XLSX.read(btoa(fixedData), {type: "base64"}),
              firstSheetName = workbook.SheetNames[0],
              worksheet = workbook.Sheets[firstSheetName];
          this.headers = this.get_header_row(worksheet);
          results = XLSX.utils.sheet_to_json(worksheet);
          this.tickets = results;
        };
        reader.readAsArrayBuffer(f);
      }
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    }
  },
  mounted() {
    if (this.$route.query) {
      this.form.job_title = this.$route.query.job_title ? this.$route.query.job_title : null;
      this.form.location = this.$route.query.location ? this.$route.query.location : null;
      this.form.keywords = this.$route.query.keywords ? this.$route.query.keywords : null;
      this.form.domainUrl = this.$route.query.domainUrl ? this.$route.query.domainUrl : null;
    }
  }
}
</script>