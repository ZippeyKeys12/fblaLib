# Serendipitous HS eLib
###### Created by Zain Aamer

## Setup
- Click Clone or Download and then Download ZIP
- Run in the directory:
```
yarn install
cordova prepare
```
- Drag the "manifestWriter.js" in the root to "plugins/cordova-universal-links-plugin/hooks/lib/android/" and replace the "manifestWriter.js" there

## Compiling
- Make sure you've gone through the steps in Setup above

### Browser
```
cordova run browser 
```
For live-reload:
```
cordova run browser -- --lr
```

### Android
```
cordova build android --debug|release
```
- Apk file will be located in platform/android/app/build/outputs/apk/debug|release
- Load this onto the device and run to install the app

## Known Issues

### Android
- Content Security Policy is weak
  
## To Do

### General
- Removing unused code and dependencies
- Display book cover, and synopsis
- Browse page
- Eventually & Hopefully:
  - Overdrive support
  - Follett support


### Android
- Native notifications

### iOS
- Add support

## Template
[Vuetify - Webpack Cordova Template](https://github.com/kevinqqnj/cordova-template-vuetify-webpack)

## Technology Used
- [Cordova](https://cordova.apache.org/)
- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Firebase](https://firebase.google.com/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)
- [Yarn](https://yarnpkg.com/)
