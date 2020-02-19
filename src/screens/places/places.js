import React, {Component} from 'react';
//import {WebView} from 'react-native';
import { WebView } from 'react-native-webview';
const WEBVIEW_REF = "WEBVIEW_REF";

// import {connect} from 'react-redux';
// import {DrawerActions} from 'react-navigation-drawer';

import {ScrollView, View, Dimensions, Text, StyleSheet,TouchableOpacity} from 'react-native';

import {ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';

import {
    dataConfigSelector,
    toggleSidebarSelector,
} from 'src/modules/common/selectors';



class Places extends Component {
  constructor(props) {
    super(props);
    this.state = { canGoBack: false };
  }

    render() {
      return (
        <View style={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.onBack.bind(this)}
            >
            <Text style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}>Regresar</Text>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          style={{flex: 1}}
          onNavigationStateChange=
            {this.onNavigationStateChange.bind(this)}
          source={{uri: 'https://me-incluyo.org/places/'}}
          /> 
      </View>
      );
    }
    onBack() {
      this.refs[WEBVIEW_REF].goBack();
    }
  
    onNavigationStateChange(navState) {
      this.setState({
        canGoBack: navState.canGoBack
      });
    }
     

  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    topbar: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topbarTextDisabled: {
      color: 'gray'
    }
  });
  


export default Places;
