import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dimensions,TouchableHighlight, Image , StyleSheet,View,Text} from 'react-native';
import { withNavigation } from 'react-navigation';

import {homeTabs} from 'src/config/navigator';
import { withTranslation } from 'react-i18next';
import { categorySelector } from 'src/modules/category/selectors';
import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';
import Gird from './Gird';
import Row from './Row';
import { languageSelector } from 'src/modules/common/selectors';
import { margin, padding } from 'src/components/config/spacing';
import {typeShowCategory } from 'src/config/category';
const initHeader = {
  style: {},
};
const DeviceWidth = Dimensions.get('window').width
const { width } = Dimensions.get('window');
class CategoryList extends Component {
  render() {
    const { category, navigation, fields, layout, widthComponent, language, t } = this.props;
    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;
    let widthImage = fields.width && parseInt(fields.width)? parseInt(fields.width) : 109;
    let heightImage = fields.height && parseInt(fields.height)? parseInt(fields.height) : 109;
    const dataParent = category.data.filter(item => item.parent === 0);
    const limit = fields.limit && parseInt(fields.limit) ? parseInt(fields.limit) : dataParent.length;
    const dataShow = dataParent.filter((_, index) => index < limit);
    const widthView = fields.boxed ? widthComponent - 2*padding.large: widthComponent;
    const headerDisable = !fields.boxed ? 'all' : 'none';
    const categoryDisable = fields.boxed ? typeShowCategory[layout] === 'grid' ? 'none': 'right' : 'all';
    const Component = typeShowCategory[layout] === 'grid' ? Gird : Row;
    return (
      <>
      {fields.disable_heading && (
          <Container disable={headerDisable}>
            <Heading
    
              style={heading.style && heading.style}
              containerStyle={{ paddingTop: 0 }}
    
          
            />
          </Container>
        )}
        <Container disable={categoryDisable} style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
        <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <View style={{
      flexDirection: 'row',
      backgroundColor: "transparent"}}>
      <View>
        <TouchableHighlight onPress={() => navigation.navigate(homeTabs.specialists)}><Image
        style={styles.button}
        source={require('../../../../assets/categorias/0testimonios.png')}
      /></TouchableHighlight><Text style={{textAlign:"center"}}>Testimonios</Text>
      </View>
      <View>
        <TouchableHighlight  onPress={() => navigation.navigate(homeTabs.blogs)}><Image
        style={styles.button}
        source={require('../../../../assets/categorias/0blogs.png')}
      /></TouchableHighlight><Text style={{textAlign:"center"}}>Blogs</Text>
      </View>
      <View>
        <TouchableHighlight onPress={() => navigation.navigate(homeTabs.places)}><Image
        style={styles.button}
        source={require('../../../../assets/categorias/0lugares.png')}
      /></TouchableHighlight><Text style={{textAlign:"center"}}>Lugares</Text>
      </View>
    </View>
  </View>
        </Container>
      </>
    );
  }
}
const mapStateToProps = state => ({
  category: categorySelector(state),
  language: languageSelector(state),
});
CategoryList.defaultProps = {
  widthComponent: width,
};
const styles = StyleSheet.create({
  container: {
      marginTop: 65,
      flexWrap: "wrap"
  },
  button: {
    width : 160,
    height: 160
  }
})
export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation()
)(CategoryList);