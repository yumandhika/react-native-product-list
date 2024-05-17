import React, {useEffect, useState} from 'react';
import {Header} from '../../../Components';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import productStore from '../../../Stores/ProductsStore';

const ProductDetail = observer(() => {
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    productStore.getDetailProduct(productStore.id);
    if (productStore.detail) {
      setMainImage(productStore.detail.thumbnail);
    }
  }, []);

  if (productStore.loading) {
    return (
      <View style={{}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Header />
      <View
        style={{display: 'flex', paddingHorizontal: 15, paddingVertical: 10}}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <View style={{borderWidth: 1, borderRadius: 5, flex: 3}}>
            <Image
              source={{
                uri: mainImage ? mainImage : '',
              }}
              style={{height: 250}}
            />
          </View>
          <View style={{display: 'flex', gap: 5, flex: 1}}>
            {productStore.detail?.images &&
              productStore.detail?.images.map((data: string) => (
                <Pressable
                  style={{flex: 1}}
                  onPress={() => {
                    setMainImage(data);
                  }}>
                  <View style={{borderWidth: 1, borderRadius: 5, flex: 1}}>
                    <Image
                      source={{
                        uri: data ? data : '',
                      }}
                      style={{flex: 1}}
                    />
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
        <View style={{display: 'flex', gap: 5}}>
          <Text style={{fontSize: 28}}>{productStore.detail?.title}</Text>
          <Text style={{fontSize: 15}}>
            Rating {productStore.detail?.rating} (stock{' '}
            {productStore.detail?.stock})
          </Text>
          <Text style={{fontSize: 18}}>{productStore.detail?.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
});

export default ProductDetail;
