<template>
  <div>
    <v-card>
      <v-card-title>What does this app do?</v-card-title>
      <v-card-text>
        <div>This application allows automated report definition and creation, as well as export to PDF.</div>
      </v-card-text>
    </v-card>

    <v-layout row>
      <v-flex xs12 md4>
        <v-card class="blue darken-1 white--text mt-3">
          <v-card-title>
            <v-chip class="primary white--text">1</v-chip>
            define JSON Schema
          </v-card-title>
          <v-card-text>
            <div>
              A JSON schema defines the requirements that a given data document must adhere to.
              <br/><br/>
              For example a person's contact information may be defined like so:
            </div>
            <v-card class="indigo darken-1 white--text mt-3">
              <v-card-title>Contact Information</v-card-title>
              <v-card-text>
                <dl>
                  <dt>Person's Name:</dt>
                  <dd>
                    <v-chip small>Required</v-chip>
                    <v-chip small>Unique</v-chip>
                  </dd>
                  <dt>Person's Age</dt>
                  <dd>
                    <v-chip small>Number</v-chip>
                    <v-chip small>Not Required</v-chip>
                  </dd>
                  <dt>Email Address</dt>
                  <dd>
                    <v-chip small>Validity</v-chip>
                    <v-chip small>Required</v-chip>
                  </dd>
                  <dt>Phone Number</dt>
                  <dd>
                    <v-chip small>ddd-ddd-dddd</v-chip>
                  </dd>
                </dl>
              </v-card-text>
            </v-card>
            You get the idea.
            <br><br>
            Written as JSON schema it looks like this
            <v-card class="indigo lighten-1 white--text mt-3">
              <v-card-text>
                <pre style='font-size:12px;'>{{ contact_info }}</pre>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="lime darken-1 dark--text mt-3">
          <v-card-title>
            <v-chip class="primary white--text">2</v-chip>
            build Layout
          </v-card-title>
          <v-card-text>
            <div>
              To build a layout, start by creating small partial layouts, like one just for Contact Information.
              <br><br>
              Combine many partial layouts into a full layout and save for reuse.
              <br><br>
              *HINT: Never duplicate layouts, just create a partial and use it twice!
            </div>
            <v-card class='lime darken-3 dark--text mt-3'>
              <v-card-title>Contact Info Partial</v-card-title>
              <v-card-text>
                <v-chip small>{ person.name }</v-chip> is
                <v-chip small>{ person.age }</v-chip> years old and can be reached
                at <v-chip small>{ person.phone }</v-chip> or email at
                <v-chip small>{ person.email }</v-chip>, thanks!
              </v-card-text>
            </v-card>
            <br>
            Notice that we embed data fields from the JSON schema into a partial layout.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="green darken-3 white--text mt-3">
          <v-card-title>
            <v-chip class="primary white--text">3</v-chip>
            create Report
          </v-card-title>
          <v-card-text>
            <div>
              To create a report, follow these easy steps:
              <br><br>
              <v-chip class='green white--text'>1</v-chip>
              Select Schema
              <br>
              <v-chip class='green lighten-1 white--text'>2</v-chip>
              Select and Customize Layout
              <br>
              <v-chip class='green lighten-2 white--text'>3</v-chip>
              Fill out data fields
              <br>
              <v-chip class='green lighten-3 white--text'>4</v-chip>
              Generate PDF
              <br>
              <br>
              *HINT: After finalizing a layout, make sure to then save it
              as a standard layout for reuse.
              <br>
              **HINT: Also be sure to use proper versioning to differentiate betweeen subtle differences in layouts.
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'AboutPage',
    data () {
      return {
        contact_info: {
          title: 'Contact Schema',
          properties: {
            name: {
              type: 'string'
            },
            age: {
              type: 'number',
              minimum: 0,
              maximum: 120
            },
            email: {
              type: 'string',
              pattern: '(.+)@(.+){2,}\\.(.+){2,}'
            },
            phone: {
              type: 'string',
              pattern: '^\\d{3}-\\d{3}-\\d{4}$'
            }
          },
          required: ['name']
        }
      }
    }
  }
</script>
