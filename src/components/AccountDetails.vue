<template>
<v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
  >
  <v-flex xs10 offset-xs1>
    <v-card>
      <v-card-title primary-title>
        <v-flex xs6 offset-xs3>
          <div class="headline text-xs-center">Account Details</div>
          <v-divider></v-divider>
          <div class="text-xs-center">Display Name: {{accountDetails.displayName}}</div>
          <div class="text-xs-center">Email: {{accountDetails.email}}</div>
        </v-flex>
      </v-card-title>
      <div class="text-xs-center">
        <v-btn dark color="primary" @click="firebase.auth().sendPasswordResetEmail(accountDetails.email); instructions=true">Reset Password</v-btn>
      </div>
      <v-flex xs2 offset-xs5 v-if="instructions">
        <v-alert color="info" icon="info" value="true">
          Check your email for a link and further instructions
        </v-alert>
      </v-flex>
    </v-card>
  </v-flex>
</v-container>
</template>

<script>
export default {
  name: "aboutPage",
  props: ["firebase", "accountDetails"],
  data() {
    return {
      instructions: false
    };
  }
};
</script>
