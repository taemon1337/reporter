<template>
  <v-card :class="color">
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
</template>

<script>
  export default {
    name: 'AboutSchema',
    props: ['color'],
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
