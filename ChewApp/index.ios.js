'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  View,
} = React;

var Drawer = require('react-native-drawer');

var HomeView = require('./js/components/HomeView');
var DrawerView = require('./js/components/DrawerView');
var SigninView = require('./js/components/SigninView');
var FavouritesView = require('./js/components/FavouritesView');
var ProfileView = require('./js/components/ProfileView');

var { width, height } = Dimensions.get('window');

var ChewApp = React.createClass({
  getInitialState() {
    return {};
  },
  hideMenuSlider: function () {
    this.refs.drawer.close();
  },
  showMenuSlider: function () {
    this.refs.drawer.open();
  },
  onMenuButtonPress: function (menuString) {
    console.log('Selected', menuString);
    if( menuString === 'Login' ) {
      this.refs.drawer.close();
      this.refs.nav.push({
        title: 'Signin',
        component: SigninView
      });
    }
    if( menuString === 'Profile') {
      this.refs.drawer.close();
      this.refs.nav.push({
        title: 'Profile',
        component: ProfileView
      });
    }
    if( menuString === 'Favourites') {
      this.refs.drawer.close();
      this.refs.nav.push({
        title: 'Favourites',
        component: FavouritesView
      });
    }
    if( menuString === 'SignInSignOut') {
      this.refs.drawer.close();
      this.refs.nav.popToTop();
    }
  },
  render: function() {
    var navigationView = (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        barTintColor="red"
        titleTextColor="white"
        tintColor="white"
        initialRoute={{
          title: 'Home',
          component: HomeView,
          leftButtonTitle: 'Menu',
          // leftButtonIcon: require('image!back_button'),
          onLeftButtonPress: () => this.showMenuSlider(),
        }}
      />
    );

    return (
      <Drawer
        type="overlay"
        openDrawerOffset={100}
        panCloseMask={1}
        ref="drawer"
        tweenHandler={(ratio) => {
          this.refs.shadowOverlay.setNativeProps({
             opacity: ((ratio * 1.5) / 2),
          });
          return {
            drawer: { shadowRadius: Math.min(ratio * 5 * 5, 5) },
          };
        }}
        content={<DrawerView onMenuButtonPress={this.onMenuButtonPress} />}
      >
        {navigationView}
        <View ref="shadowOverlay" style={styles.overlay} />
      </Drawer>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    opacity: 0,
    backgroundColor: 'black',
  },
});

AppRegistry.registerComponent('ChewApp', () => ChewApp);
