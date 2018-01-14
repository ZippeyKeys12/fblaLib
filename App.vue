<template>
    <v-app>
      <template v-if="!tosPage">
          <v-navigation-drawer fixed v-model="drawer" app>
              <v-list>
                  <v-list-tile value="true" @click="linkto(home.linkpath)">
                      <v-list-tile-action>
                          <v-icon v-html="home.icon"></v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{ home.title }}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list v-if="loggedIn">
                  <v-list-tile value="true" v-for="(item, i) in items" :key="i" @click="linkto(item.linkpath)">
                      <v-list-tile-action>
                          <v-icon v-html="item.icon"></v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                  <v-list-tile value="true" @click="linkto(licenses.linkpath)">
                      <v-list-tile-action>
                          <v-icon v-html="licenses.icon"></v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{ licenses.title }}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-navigation-drawer>
          <v-toolbar fixed app color="primary" dark>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn v-if="!searchPage" icon @click="linkto(search.linkpath)"><v-icon>{{search.icon}}</v-icon></v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat dark @click="logInMenu" color="secondary"><v-icon>{{logIn.icon}}</v-icon>{{loggedIn?"Log Out":"Log In"}}</v-btn>
            <v-btn class="ml-3"
                  fab dark small absolute bottom left id="goUp"
                  color="accent" v-show="floater" data-target="#" data-mt-duration="300" data-mt-easing="easeOutQuad"
              ><v-icon>keyboard_arrow_up</v-icon></v-btn>
          </v-toolbar>
        </template>
        <v-content>
            <div id="firebaseui-auth-container" v-if="loggingIn"></div>
            <router-view v-else
            :firebase="firebase" :accountDetails="accountDetails"
            @checkOut="manageBooks" @reserve="manageBooks"
            @visibility="floaterCheck"></router-view>
        </v-content>
        <v-footer app v-if="!loggingIn && !aboutPage" color="primary">
            <v-spacer></v-spacer>
            <span><font color="white">Site Created By Zain Aamer</font></span>
            <v-spacer></v-spacer>
        </v-footer>
    </v-app>
</template>

<script>
//////////////
// Firebase //
//////////////
import firebase from "firebase";
import firebaseUI from "firebaseui";
import "../node_modules/firebaseui/dist/firebaseui.css";

firebase.initializeApp({
  apiKey: "AIzaSyBICuPle3pCxZDdtC3wuWjTrMamkj_4OqU",
  authDomain: "lib-fbla-zipp.firebaseapp.com",
  databaseURL: "https://lib-fbla-zipp.firebaseio.com",
  projectId: "lib-fbla-zipp",
  storageBucket: "lib-fbla-zipp.appspot.com",
  messagingSenderId: "814292317108"
});

// Initialize the firebaseUI Widget using firebase.
const ui = new firebaseUI.auth.AuthUI(firebase.auth());
//Initialize the database
const database = firebase.database();

////////////
// MoveTo //
////////////
import MoveTo from "moveto";
document.addEventListener("DOMContentLoaded", function() {
  const moveTo = new MoveTo(
    {
      ease: "easeInQuad"
    },
    {
      easeInQuad: function(t, b, c, d) {
        t /= d;
        return c * t * t + b;
      },
      easeOutQuad: function(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      }
    }
  );
  moveTo.registerTrigger(document.getElementById("goUp"));
});
////////////
// Vue.js //
////////////
export default {
  data: function() {
    return {
      width: 0,
      firebase: firebase,
      loggedIn: false,
      loggingIn: false,
      logIn: { icon: "account_circle", title: "Log In" },
      drawer: false,
      home: { icon: "search", title: "Search", linkpath: "/search" },
      items: [
        { icon: "star", title: "Reserved Items", linkpath: "/reserved" },
        { icon: "library_books", title: "Checked Out Items", linkpath: "/checkedOut" },
        { icon: "account_circle", title: "Account Details", linkpath: "/accountDetails" }
      ],
      licenses:{ icon: "info", title: "Licenses", linkpath: "/aboutSHSeLib" },
      title: "Serendipitous HS eLib",
      search: { icon: "search", title: "Search", linkpath: "/search" },
      accountDetails: {},
      tosPage: false,
      aboutPage: false,
      searchPage: false,
      floater: false
    };
  },
  methods: {
    linkto(pathname) {
      this.$router.push({ path: pathname });
      this.tosPage = this.$route.fullPath === "/tos";
      this.searchPage = this.$route.fullPath === "/search";
      this.aboutPage = this.$route.fullPath === "/aboutSHSeLib";
    },
    logInMenu() {
      if (this.loggedIn) firebase.auth().signOut();
      this.linkto("/search");
      this.floater = false;
      location.reload();
    },
    floaterCheck(searchVisibility) {
      this.floater = !searchVisibility;
    },
    manageBooks(title, author, type) {
      const date = new Date();
      database
        .ref("/"+type+"/")
        .push()
        .set({
          title: title,
          author: author,
          uid: this.accountDetails.uid,
          date:
            date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()
        });
    }
  },
  mounted: function() {
    const component = this;
    this.tosPage = this.$route.fullPath === "/tos";
    this.searchPage = this.$route.fullPath === "/search";
    this.aboutPage = this.$route.fullPath === "/aboutSHSeLib";
    window.addEventListener(
      "resize",
      function() {
        component.width = window.innerWidth;
      },
      false
    );
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var uid = user.uid;
          var phoneNumber = user.phoneNumber;
          var providerData = user.providerData;
          user.getIdToken().then(function(accessToken) {
            component.loggedIn = true;
            component.accountDetails = {
              displayName: displayName,
              email: email,
              emailVerified: emailVerified,
              phoneNumber: phoneNumber,
              photoURL: photoURL,
              uid: uid,
              accessToken: accessToken,
              providerData: providerData
            };
          });
          component.loggingIn = false;
        } else {
          // User is signed out.
          component.loggedIn = false;
          if (!component.tosPage) {
          	
            ui.start("#firebaseui-auth-container", {
              signInSuccessUrl: "/#/search",
              signInOptions: [
              	firebase.auth.EmailAuthProvider.PROVIDER_ID
              ],
              credentialHelper: firebaseui.auth.CredentialHelper.NONE,
              // Terms of service url.
              tosUrl: "/#/tos"
            });
            component.loggingIn = true;
          }
        }
      },
      function(error) {
        console.log(error);
      }
    );
  }
};
</script>
