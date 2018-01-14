<template>
  <v-container
  	fluid
    style="min-height: 0;"
    grid-list-lg
  >
    <v-slide-y-transition mode="out-in">
      <v-layout column>
      	<v-flex xs12 sm10 offset-sm1 v-for="(book, i) in checkedOutBooks" :key="i">
      		<v-card>
			  <v-container fluid grid-list-lg>
				<v-slide-y-transition mode="out-in">
				  <v-layout row>
					<v-card-title>
					  <div>
						<div class="headline"><strong>{{ book.title }}</strong></div>
						<div>{{ book.author }}</div>
					  </div>
					</v-card-title>
					<v-spacer></v-spacer>
					<v-card-title>
					  <div>
						<div class="headline">{{ "Filed: "+months[book.date[0]]+" "+book.date[1]+", "+book.date[2] }}</div>
						<div v-if="overdue(book.date)" style="color:#FF5252">Overdue</div>
					  </div>
					</v-card-title>
				  </v-layout>
				</v-slide-y-transition>
			  </v-container>
			</v-card>
      	</v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: "ReservedItems",
  props: ["firebase", "accountDetails"],
  data() {
    return {
    	checkedOutBooks:[],
    	months:[
    		"Jan.",
    		"Feb.",
    		"Mar.",
    		"Apr.",
    		"May",
    		"Jun.",
    		"Jul.",
    		"Aug.",
    		"Sep.",
    		"Oct.",
    		"Nov.",
    		"Dec."
    	]
    };
  },
  methods:{
  	overdue(date){
  		return Math.round(((new Date().getTime())-(new Date(date[2], date[0], date[1]).getTime()))/(1000*60*60*24))>21
  	}
  },
  mounted: function() {
  	const component=this;
  	this.firebase
        .database()
        .ref("/reserved/")
        .once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().uid === component.accountDetails.uid)
            	component.checkedOutBooks.push({
            		title: childSnapshot.val().title,
            		author: childSnapshot.val().author,
            		date: childSnapshot.val().date.split("/")
            	})
          });
        });
  }
};
</script>