import React from 'react';

// import {connect} from 'react-redux';
// import {DrawerActions} from 'react-navigation-drawer';

import {
  ScrollView,
  View,
  Dimensions,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import {ThemedView, Header} from 'src/components';
import {
  TextHeader,
  IconHeader,
  Logo,
  CartIcon,
} from 'src/containers/HeaderComponent';

import {
  dataConfigSelector,
  toggleSidebarSelector,
} from 'src/modules/common/selectors';

import Container from 'src/containers/Container';
import ContainerSpecialists from './containers/ContainerSpecialists';

import Search from 'src/containers/Search';

import {margin} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';

// // Containers
// import Slideshow from './home/containers/Slideshow';
// import CategoryList from './home/containers/CategoryList';
// import ProductList from './home/containers/ProductList';
// import ProductCategory from './home/containers/ProductCategory';
// import Banners from './home/containers/Banners';
// import TextInfo from './home/containers/TextInfo';
// import CountDown from './home/containers/CountDown';
// import BlogList from './home/containers/BlogList';
// import Testimonials from './home/containers/Testimonials';
// import Button from './home/containers/Button';

// const {width}= Dimensions.get('window');

// const containers = {
//     slideshow: Slideshow,
//     categories: CategoryList,
//     products: ProductList,
//     productcategory: ProductCategory,
//     banners: Banners,
//     text: TextInfo,
//     countdown: CountDown,
//     blogs: BlogList,
//     testimonials: Testimonials,
//     button: Button,
// };

// const widthComponent = (spacing) => {
//     if (!spacing) {return width;}
//     const marginLeft = spacing.marginLeft && parseInt(spacing.marginLeft) ? parseInt(spacing.marginLeft) : 0;
//     const marginRight = spacing.marginRight && parseInt(spacing.marginRight) ? parseInt(spacing.marginRight) : 0;
//     const paddingLeft = spacing.paddingLeft && parseInt(spacing.paddingLeft) ? parseInt(spacing.paddingLeft) : 0;
//     const paddingRight = spacing.paddingRight && parseInt(spacing.paddingRight) ? parseInt(spacing.paddingRight) : 0;
//     return width - marginLeft - marginRight - paddingLeft - paddingRight;
// };

class Specialists extends React.Component {
  // renderContainer(config) {
  //     const Container = containers[config.type];
  //     if (!Container) {
  //         return null;
  //     }
  //     return (
  //         <View key={config.id} style={config.spacing && config.spacing}>
  //             <Container
  //               {...config}
  //               widthComponent={widthComponent(config.spacing)}
  //             />
  //         </View>
  //     );
  // }

  render() {
    // return(
    //     <Text>Próximamente</Text>
    // )

    // // const { category, product } = this.props;
    const {
      config,
      toggleSidebar,
      navigation,
      screenProps: {t},
    } = this.props;

    return (
      <ThemedView isFullView>
        <Header
          centerComponent={<TextHeader title={t('common:text_specialists')} />}
          rightComponent={<CartIcon />}
        />
        {/* <Header
                    leftComponent={
                        toggleSidebar ? (
                            <IconHeader
                                name="align-left"
                                size={22}
                                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                            />
                        ) : null
                    }
                    centerComponent={<Logo />}
                    rightComponent={<CartIcon />}
                /> */}
        {/* <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {config.map(config => this.renderContainer(config))}
                </ScrollView> */}
        {/* <ScrollView>
                    <Text>Próximamente aquí estará el catálogo de especialistas...</Text>
                </ScrollView> */}
        <Search placeholder={t('specialists:text_specialists_search')} />

        <ContainerSpecialists />
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: margin.big,
  },
  titleList: {
    marginBottom: margin.base + 4,
  },
  description: {
    marginBottom: 50,
    lineHeight: lineHeights.h4,
  },
  item: {
    paddingTop: 10,
    marginHorizontal: margin.large,
  },
});

// const mapStateToProps = state => {
//     return {
//         config: dataConfigSelector(state),
//         toggleSidebar: toggleSidebarSelector(state),
//     };
// };

// export default connect(mapStateToProps)(Forum);

export default Specialists;
