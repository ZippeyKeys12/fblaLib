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
                  <v-list-tile value="true" @click="linkto(overdueInfo.linkpath)">
                      <v-list-tile-action>
                          <v-badge color="red" v-model="overdue">
							<span slot="badge">!</span>
							<v-icon v-html="overdueInfo.icon"></v-icon>
						  </v-badge>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{ overdueInfo.title }}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile value="true" @click="toggleMap">
                      <v-list-tile-action>
                          <v-icon v-html="mapInfo.icon"></v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{ mapInfo.title }}</v-list-tile-title>
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
            :firebase="firebase" :accountDetails="accountDetails" :loggedIn="loggedIn"
            @checkOut="manageBooks" @reserve="manageBooks" @loginner="loggingInMethod"
            @visibility="floaterCheck" @overdue="setOverdue"></router-view>
        </v-content>
        <v-footer app v-if="!loggingIn && !aboutPage" color="primary">
            <v-spacer></v-spacer>
            <span><font color="white">Site Created By Zain Aamer</font></span>
            <v-spacer></v-spacer>
        </v-footer>
        <v-dialog v-model="map" fullscreen transition="dialog-bottom-transition" :overlay=false>
          <v-card>
			<v-card-actions>
			  <v-btn flat color="primary" @click="toggleMap">Close</v-btn>
			</v-card-actions>
			<v-card-media :src="mapInfo.image" height="500px" contain>
			</v-card-media>
		  </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
//////////////
// Firebase //
//////////////
import firebase from "firebase";
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig);

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
        { icon: "account_circle", title: "Account Details", linkpath: "/accountDetails" },
        { icon: "star", title: "Reserved Items", linkpath: "/reserved" }
      ],
      overdueInfo: { icon: "library_books", title: "Checked Out Items", linkpath: "/checkedOut" },
      mapInfo: { icon: "map", title: "Library Map", image: require("./static/map.png") },
      licenses:{ icon: "info", title: "Licenses", linkpath: "/aboutSHSeLib" },
      title: "Serendipitous HS eLib",
      search: { icon: "search", title: "Search", linkpath: "/search" },
      accountDetails: {},
      tosPage: false,
      aboutPage: false,
      logInPage: false,
      searchPage: false,
      floater: false,
      overdue: false,
      map:false
    };
  },
  methods: {
  	toggleMap(){
  		this.map=!this.map
  	},
  	setOverdue(){
  		this.overdue=true;
  	},
    linkto(pathname) {
      this.$router.push({ path: pathname });
      this.tosPage = this.$route.fullPath === "/tos";
      this.searchPage = this.$route.fullPath === "/search";
      this.logInPage = this.$route.fullPath === "/logIn";
      this.aboutPage = this.$route.fullPath === "/aboutSHSeLib";
      this.floater = false;
    },
    logInMenu() {
      if (this.loggedIn){
      	firebase.auth().signOut();
      	this.linkto("/search");
      }else{
      	this.linkto("/logIn");
      }
    },
    loggingInMethod(payload){
    	this.accountDetails=payload;
    	this.linkto("/search");
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
  created: function() {
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
          firebase
			.database()
			.ref("/checkedOut/")
			.once("value", function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
				if (childSnapshot.val().uid === component.accountDetails.uid){
					function calcDate(date){
							date=new Date(date[2], date[0], date[1])
							date.setDate(date.getDate()+21)
							return date.getMonth()+"/"+ date.getDate()+"/"+ date.getFullYear();
						}
					var checkedOutBooks=[];
					checkedOutBooks.push({
						title: childSnapshot.val().title,
						author: childSnapshot.val().author,
						date: calcDate(childSnapshot.val().date.split("/")).split("/")
					});
					for(let i of checkedOutBooks)
						if(Math.round(((new Date().getTime())-(new Date(i.date[2], i.date[0], i.date[1]).getTime()))/(1000*60*60*24))>0)
							component.overdue=true;
				}
			  });
			});
          component.loggingIn = false;
        } else {
          // User is signed out.
          component.loggedIn = false;
          if (component.logInPage) {
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
