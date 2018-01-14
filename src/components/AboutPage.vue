<template>
<v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
>
  <v-flex xs12>
    <v-card>
      <v-card-title primary-title>
        <v-flex xs6 offset-xs3>
          <div class="headline text-xs-center">Open Source Technology Used</div>
          <div class="text-xs-center">This app is not endorsed or sponsored by any of the groups listed</div>
        </v-flex>
      </v-card-title>
    </v-card>
  </v-flex>
  <v-layout row wrap>
    <v-flex xs12 sm6 v-for="(tool, i) in toolsUsed" :key="i">
      <v-card>
        <v-container fluid grid-list-lg>
          <v-slide-y-transition mode="out-in">
            <v-layout row>
              <v-flex xs7 >
                <v-card-title>
                  <div>
                    <div class="headline">{{tool.name}}</div>
                    <div>{{tool.creator}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn dark color="primary" :href="tool.siteLink">Visit Site</v-btn>
                  <v-btn dark color="primary" :href="tool.licenseLink">{{tool.licenseName}}</v-btn>
                </v-card-actions>
              </v-flex>
              <v-flex xs5>
                <v-card-media
                  :src="tool.imagePath"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-flex xs10 offset-xs1 sm8 offset-sm2 lg6 offset-lg3>
          <v-card-title>
            <div>
              <div class="headline text-xs-center">{{templateUsed.name}}</div>
              <div class="text-xs-center">{{templateUsed.creator}}</div>
            </div>
          </v-card-title>
          <div class="text-xs-center">
            <v-btn dark color="primary" :href="templateUsed.siteLink">Visit Site</v-btn>
            <v-btn dark color="primary" :href="templateUsed.licenseLink">{{templateUsed.licenseName}}</v-btn>
          </div>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: "aboutPage",
  data() {
    return {
      lastBigWidth: 972,
      lastSmallWidth: 0,
      templateUsed: {
        name: "Vuetify - Webpack Cordova Template",
        creator: "Kevin Zhang Qing",
        siteLink:
          "https://github.com/kevinqqnj/cordova-template-vuetify-webpack",
        licenseName: "Apache-2.0",
        licenseLink: "https://opensource.org/licenses/Apache-2.0"
      },
      toolsUsed: [
        {
          name: "Cordova",
          imagePath: require("../static/cordova.png"),
          creator: "The Apache Software Foundation",
          siteLink: "https://cordova.apache.org/",
          licenseName: "Apache-2.0",
          licenseLink: "https://opensource.org/licenses/Apache-2.0"
        },
        {
          name: "Vue.js",
          imagePath: require("../static/vuejs.png"),
          creator: "Evan You",
          siteLink: "https://vuejs.org/",
          licenseName: "MIT",
          licenseLink: "https://opensource.org/licenses/MIT"
        },
        {
          name: "Vuetify",
          imagePath: require("../static/vuetify.png"),
          creator: "Vuetify LLC",
          siteLink: "https://vuetifyjs.com/",
          licenseName: "MIT",
          licenseLink: "https://opensource.org/licenses/MIT"
        },
        {
          name: "Firebase",
          imagePath: require("../static/firebase.png"),
          creator: "Google",
          siteLink: "https://firebase.google.com/",
          licenseName: "Apache-2.0",
          licenseLink: "https://opensource.org/licenses/Apache-2.0"
        },
        {
          name: "Stylus",
          imagePath: require("../static/stylus.png"),
          creator: "TJ Holowaychuk",
          siteLink: "http://stylus-lang.com/",
          licenseName: "MIT",
          licenseLink: "https://opensource.org/licenses/MIT"
        },
        {
          name: "Sass",
          imagePath: require("../static/sass.png"),
          creator: "Numerous Contributors",
          siteLink: "http://sass-lang.com/",
          licenseName: "MIT",
          licenseLink: "https://opensource.org/licenses/MIT"
        },
        {
          name: "Babel",
          imagePath: require("../static/babel.png"),
          creator: "Numerous Contributors",
          siteLink: "https://babeljs.io/",
          licenseName: "MIT",
          licenseLink: "https://opensource.org/licenses/MIT"
        },
        {
          name: "Webpack",
          imagePath: require("../static/webpack.png"),
          creator: "Numerous Contributors",
          siteLink: "https://webpack.js.org/",
          licenseName: "MIT",
          licenseLink: "https://opensource.org/licenses/MIT"
        },
        {
          name: "Yarn",
          imagePath: require("../static/yarn.png"),
          creator: "Numerous Contributors",
          siteLink: "https://yarnpkg.com/",
          licenseName: "FreeBSD",
          licenseLink:
            "https://raw.githubusercontent.com/yarnpkg/yarn/master/LICENSE"
        },
        {
          name: "Node.js",
          imagePath: require("../static/nodejs.png"),
          creator: "Node.js Foundation",
          siteLink: "https://nodejs.org/",
          licenseName: "Node.js",
          licenseLink:
            "https://raw.githubusercontent.com/nodejs/node/master/LICENSE"
        }
      ]
    };
  },
  mounted: function() {
    const component = this;
    function stuff() {
      if (
        !(window.innerWidth > 973 == component.lastBigWidth) &&
        !(610 == component.lastSmallWidth > window.innerWidth) &&
        (component.lastBigWidth >= window.innerWidth ||
          window.innerWidth >= component.lastSmallWidth)
      ) {
        component.lastBigWidth = 0;
        component.lastSmallWidth = 600;
        component.toolsUsed[0].creator = "The Apache Software Foundation";
        component.toolsUsed[4].creator = "TJ Holowaychuk";
        for (var i = 5; i < 9; i++)
          component.toolsUsed[i].creator = "Numerous Contributors";
        component.toolsUsed[9].creator = "Node.js Foundation";

        if (window.innerWidth > 600) {
          component.lastBigWidth = 601;
          component.lastSmallWidth = 610;
          component.toolsUsed[0].creator = "ASF";
          component.toolsUsed[4].creator = "Holowaychuk";
          for (var i = 5; i < 9; i++)
            component.toolsUsed[i].creator = "Contributors";
          component.toolsUsed[9].creator = "Node.js Fdn.";
        }
        if (window.innerWidth > 610) {
          component.lastBigWidth = 611;
          component.lastSmallWidth = 677;
          component.toolsUsed[4].creator = "TJ Holowaychuk";
        }
        if (window.innerWidth > 677) {
          component.lastBigWidth = 678;
          component.lastSmallWidth = 761;
          component.toolsUsed[9].creator = "Node.js Foundation";
        }
        if (window.innerWidth > 761) {
          component.lastBigWidth = 762;
          component.lastSmallWidth = 878;
          component.toolsUsed[0].creator = "Apache Software Fdn.";
          for (var i = 5; i < 9; i++)
            component.toolsUsed[i].creator = "Numerous Contributors";
        }
        if (window.innerWidth > 878) {
          component.lastBigWidth = 879;
          component.lastSmallWidth = 972;
          component.toolsUsed[0].creator = "Apache Software Foundation";
        }
        if (window.innerWidth > 972) {
          component.lastBigWidth = 973;
          component.lastSmallWidth = Number.MAX_SAFE_INTEGER;
          component.toolsUsed[0].creator = "The Apache Software Foundation";
        }
      }
    }
    window.addEventListener("resize", () => stuff(), false);
    stuff();
  }
};
</script>