import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Label from '../../Atoms/Label';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={style.header}>
      <View style={{flex: 1}}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Label name="Back" style={{fontWeight: 'bold'}} />
        </Pressable>
      </View>
      <View style={{}}>
        <Pressable onPress={() => {}}>
          <Label name={`${route.name}`} style={{fontWeight: 'bold'}} />
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});

export default Header;
