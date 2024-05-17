import * as React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Label} from '../../Components';
import {bell, shoppingCart} from '../../Assets';
import {useNavigation} from '@react-navigation/native';
import Card from '../../Components/Molecules/Card';
import productStore from '../../Stores/ProductsStore';
import {observer} from 'mobx-react';
import {useState} from 'react';

const HomeScreen = observer(() => {
  const navigation = useNavigation<any>();
  const [specialForU, setSpecialForU] = useState();

  React.useEffect(() => {
    productStore.setParams(1, 5);
    productStore.fetchProducts();
    setSpecialForU(productStore.products);
  }, []);

  if (productStore.loading) {
    return (
      <View style={{}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.header}>
          <View style={{flex: 1}}>
            <Label name={'Find Luxury Products Now'} style={style.fontRed} />
          </View>
          <View style={style.headerRight}>
            <Pressable
              onPress={() => {
                navigation.navigate('ProductDetail');
              }}>
              <Image source={bell} style={style.icon} />
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('ShoppingCart');
              }}>
              <Image source={shoppingCart} style={style.icon} />
            </Pressable>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 14}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Label
              name={'Special For You'}
              style={{fontSize: 20, fontWeight: '600'}}
            />
            <Pressable
              onPress={() => {
                navigation.navigate('ProductList');
              }}>
              <Label
                name={'View All'}
                style={{fontSize: 15, fontWeight: '600'}}
              />
            </Pressable>
          </View>
        </View>
        <FlatList
          horizontal
          data={productStore.products}
          renderItem={({item}: any) => (
            <Card
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              onClick={() => {
                productStore.setId(item.id);
                navigation.navigate('ProductDetail');
              }}
            />
          )}
          keyExtractor={(item: any) => item.id}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 14}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Label
              name={'Special For You'}
              style={{fontSize: 20, fontWeight: '600'}}
            />
          </View>
        </View>
        <FlatList
          horizontal
          data={productStore.products}
          renderItem={({item}: any) => (
            <Card
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              onClick={() => {
                productStore.setId(item.id);
                navigation.navigate('ProductDetail');
              }}
            />
          )}
          keyExtractor={(item: any) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
});

const style = StyleSheet.create({
  header: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  fontRed: {
    fontSize: 35,
    fontWeight: '600',
    color: 'black',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  icon: {width: 35, height: 35, objectFit: 'contain'},
});

export default HomeScreen;
