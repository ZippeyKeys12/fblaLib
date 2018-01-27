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
          <div class="headline text-xs-center">Log In</div>
        </v-flex>
      </v-card-title>
      <form @submit.prevent="userSignIn">
        <v-layout column>
          <v-flex xs10 offset-xs1>
            <v-text-field
              name="email"
              label="Email"
              id="email"
              type="email"
              v-model="email"></v-text-field>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn color="primary" type="submit">Log In</v-btn>
          </v-flex>
        </v-layout>
	  </form>
      <div class="text-xs-center">
        <v-btn dark color="primary" @click="firebase.auth().sendPasswordResetEmail(accountDetails.email); instructions=true">Reset Password</v-btn>
      </div>
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
      instructions: false,
      email: '',
      password: '',
    };
  },
  methods: {
    userSignIn () {
      const component=this;
      this.firebase.auth().signInWithEmailAndPassword(component.email, component.password)
	  .then(firebaseUser => {
	  	component.$emit("loginner", {
		  displayName: firebaseUser.displayName,
		  email: firebaseUser.email,
		  emailVerified: firebaseUser.emailVerified,
		  uid: firebaseUser.uid,
		  accessToken: firebaseUser.accessToken,
		  providerData: firebaseUser.providerData
		});
	  });
    }
  }
};
</script>
