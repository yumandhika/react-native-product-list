import React, {useEffect, useMemo, useState} from 'react';
import {Card, Header} from '../../../Components';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {observer} from 'mobx-react';
import productStore from '../../../Stores/ProductsStore';
import {useNavigation} from '@react-navigation/native';

const ProductList = observer(() => {
  const navigation = useNavigation<any>();
  const [productList, setProductList] = useState([]);

  const debounce = (func, delay) => {
    let timeoutId: any;

    return (...args: any) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = search => {
    productStore.setProducts();
    debounce(productStore.searchProduct(search), 500);
    setProductList(prev => {
      return [...productStore.products];
    });
  };

  useEffect(() => {
    productStore.setProducts();
    productStore.setParams(1, 6);
    productStore.fetchProducts();
    setProductList(prev => {
      return [...productStore.products];
    });
  }, []);

  const onRefresh = () => {
    if (productStore.loading) {
      return;
    }
    productStore.setProducts();
    productStore.setParams(1, 6);
    productStore.fetchProducts();
    setProductList(prev => {
      return [...productStore.products];
    });
  };

  const fetchProduct = () => {
    if (productStore.loading) {
      return;
    }
    productStore.setParams(productStore.page + 1, 6);
    productStore.fetchProducts();
    setProductList(prev => {
      return [...prev, ...productStore.products];
    });
  };

  return (
    <SafeAreaView style={{}}>
      <View>
        <FlatList
          ListHeaderComponent={
            <>
              <Header />
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <TextInput
                  onChangeText={(search: string) => debouncedSearch(search)}
                  style={styles.searchBar}
                  placeholder="search product"
                />
              </View>
            </>
          }
          ListFooterComponent={() =>
            productStore.loading && <ActivityIndicator />
          }
          data={productList}
          onEndReached={fetchProduct}
          numColumns={2}
          refreshing={productStore.loading}
          onRefresh={onRefresh}
          renderItem={({item}: any) => (
            <Card
              isVertical={true}
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              onClick={() => {
                productStore.setId(item.id);
                navigation.navigate('ProductDetail');
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    height: '100%',
  },
  searchBar: {
    fontSize: 18,
    margin: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 1,
  },
  itemText: {
    margin: 10,
    color: 'white',
    fontSize: 24,
    backgroundColor: 'blue',
    width: '100%',
    height: 50,
  },
});

export default ProductList;
