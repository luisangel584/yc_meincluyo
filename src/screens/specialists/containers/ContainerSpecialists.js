import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, FlatList, View, SafeAreaView} from 'react-native';
import {Text} from 'src/components';
import Container from 'src/containers/Container';
import {margin, padding} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config';

const ContainerSpecialists = () => {
  const {t} = useTranslation();

  const SPECILISTS = [
    {
      id: '1',
      name: 'Especialista 1',
      area: 'Área 1',
      tel: '987 800 3150',
    },
    {
      id: '2',
      name: 'Especialista 2',
      area: 'Área 2',
      tel: '800 3150 987',
    },
    {
      id: '3',
      name: 'Especialista 3',
      area: 'Área 3',
      tel: '3150 987 800',
    },
  ];

  function Item({title, area, tel}) {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.area}>
          {area} · {tel}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Container>
        <Text h2 medium style={styles.title}>
          {t('specialists:text_specialists')}
        </Text>
        <Text colorSecondary style={styles.description}>
          {t('specialists:text_specialists_subtitle')}
        </Text>
      </Container>
      <SafeAreaView style={styles.safearea}>
        <FlatList
          style={styles.flatlist}
          data={SPECILISTS}
          renderItem={({item}) => (
            <View>
              <Item
                title={item.name}
                area={item.area}
                tel={item.tel}
                style={[styles.item]}
              />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: margin.big,
    marginBottom: margin.big,
  },
  titleList: {
    marginBottom: margin.base + 4,
  },
  description: {
    marginBottom: 50,
    lineHeight: lineHeights.h4,
  },
  flatlist: {
    borderTopColor: '#eee',
    borderTopWidth: 2,
  },
  safearea: {
    flex: 1,
  },
  item: {
    padding: padding.large,
    borderRadius: 4,
    marginHorizontal: margin.large,
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
  },
  name: {
    fontSize: 16,
    marginBottom: margin.small,
  },
  area: {
    color: '#666',
    marginLeft: 6,
  },
});

export default ContainerSpecialists;
