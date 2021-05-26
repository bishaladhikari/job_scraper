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
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="12"
                >
                  <v-select
                      :items="domains"
                      label="Domains"
                      outlined
                      dense
                  ></v-select>
                </v-col>
                <div class="col-md-12 col-sm-12">
                  <label class="form__label">
                    <div class="form_label-title">Job Title</div>
                  </label>
                  <div class="form__input">
                    <input
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
                        placeholder="Enter keywords or leave blank"
                        autocomplete="off"
                        name="keywords"
                        class="form__input-box"
                    />
                    <div class="form__input-indicator"></div>
                  </div>
                </div>
                <v-btn block color="primary">Search</v-btn>
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
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
    domains: [
      {label: 'Indeed', url: ''},
      {label: 'Linkedin', url: ''},
      {label: 'Glassdoor', url: ''},
    ],
    form: {
      domainUrl: '',
      job_title: '',
      location: '',
      keywords: '',
      url: ''
    }
  }),
}
</script>