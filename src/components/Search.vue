<template>
<v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
>
  <ais-index
    app-id="6N5W0EMUH2"
    api-key="448474449073fb4f64854c87739eddb0"
    index-name="books"
    :query="searchString"
  >
    <v-flex xs12 sm6 offset-sm3 class="pt-2 pb" v-observe-visibility="searchGone">
      <v-card>
        <v-flex xs10 offset-xs1>
            <v-layout row>
              <v-text-field
                autofocus
                name="searchBar"
                label="Search"
                hint="By Title or Author"
                type="search"
                v-model="searchString"
              ></v-text-field>
              <!---->
              <v-btn @click="clearSearch"><v-icon>cancel</v-icon></v-btn>
          </v-layout>
        </v-flex>
      </v-card>
      <v-flex xs5 sm4 lg3 xl2 offset-xs7 offset-sm8 offset-lg9 offset-xl10>
        <v-card class="pt-1 pb-1 mr-1">
          <v-card-media
            :src="require('../static/algolia.svg')"
            height="15px"
            contain
          ></v-card-media>
        </v-card>
      </v-flex>
    </v-flex>
    <ais-results>
      <slot result></slot>
      <v-flex xs12 sm10 offset-sm1 class="mt-3" slot-scope="{ result }">
        <v-card>
          <v-container fluid grid-list-lg>
            <v-slide-y-transition mode="out-in">
              <v-layout :row="notTooSmall" :column="!notTooSmall">
                <v-card-title>
                  <div color="grey">
                  	<div v-if="notTooSmall">
						<div class="headline"><strong>{{result.title}}</strong></div>
						<div>{{result.author}}</div>
                    </div>
                    <div v-else>
						<div class="headline text-xs-center"><strong>{{result.title}}</strong></div>
						<div class="text-xs-center">{{result.author}}</div>
                    </div>
                  </div><slot results ></slot>
                </v-card-title>
                <v-spacer v-if="loggedIn"></v-spacer>
                <v-card-actions v-if="loggedIn">
                  <v-btn dark color="primary" @click="checkOut(result.title, result.author, result.copies)">Check Out</v-btn>
                  <v-btn dark color="primary" @click="reserve(result.title, result.author)">Reserve</v-btn>
                </v-card-actions>
              </v-layout>
            </v-slide-y-transition>
          </v-container>
        </v-card>
      </v-flex>
    </ais-results>
    <ais-no-results class="mt-3">
      <v-flex xs12 slot-scope="search">
        <v-card>
          <v-flex xs10 offset-xs1>
            <v-card-title class="text-xs-center">
              <div color="grey">
                <div class="headline text-xs-center"><strong>No books found for <i>{{ search.query }}</i>.</strong></div>
              </div>
            </v-card-title>
          </v-flex>
        </v-card>
      </v-flex>
    </ais-no-results>
    <ais-stats v-if="searchString.length>0" class="mt-3">
      <v-flex xs4 lg2 xl2 slot-scope="{ totalResults, processingTime, query }">
        <v-card>
          <v-card-title>
            <div>{{ totalResults }} matching: <i>{{ query }}</i> ({{ processingTime }} ms)</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </ais-stats>
  </ais-index>
</v-container>
</template>
<script>
export default {
  name: "search",
  props: ["firebase", "loggedIn"],
  data() {
    return {
      searchString: ""
    };
  },
  computed:{
  	notTooSmall: {
  		get: function () {
  			return window.innerWidth>400;
  		},
  		set: function (newValue) {
  			return window.innerWidth>400;
  		}
  	}
  },
  methods: {
    searchGone(isVisible, entry) {
      this.$emit("visibility", isVisible);
    },
    checkOut(title, author, copies) {
      const component = this;
      this.firebase
        .database()
        .ref("/checkedOut/")
        .once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().title === title) copies--;
          });
          if (copies > 0) component.$emit("checkOut", title, author, "checkedOut");
        });
    },
    reserve(title, author) {
      this.$emit("reserve", title, author, "reserved");
    },
    clearSearch() {
      this.searchString = "";
    }
  },
  created: function(){
  	const component=this;
  	window.addEventListener("resize", () => {
  		component.notTooSmall=false;
  	}, false);
  }
};
</script>
