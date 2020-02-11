import React, {Component} from 'react';
//import {WebView} from 'react-native';
import { WebView } from 'react-native-webview';


// import {connect} from 'react-redux';
// import {DrawerActions} from 'react-navigation-drawer';

import {ScrollView, View, Dimensions, Text} from 'react-native';

import {ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';

import {
    dataConfigSelector,
    toggleSidebarSelector,
} from 'src/modules/common/selectors';



class Places extends Component {
    render() {
      return (
        <WebView source={{ uri: 'https://me-incluyo.org/places/' }} 
         style={{marginTop: 20}}
         />
        
         
    
      );
    }
  }


export default Places;
