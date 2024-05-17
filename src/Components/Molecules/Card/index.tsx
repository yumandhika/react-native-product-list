import * as React from 'react';
import Label from '../../Atoms/Label';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const Card = ({title, price, thumbnail, onClick, isVertical = false}: any) => {
  return isVertical ? (
    <Pressable onPress={onClick} style={{flex:1, padding:10,}}>
      <View style={{flex:1}}>
        <View style={{borderWidth: 1, borderRadius: 5}}>
          <Image source={{uri: thumbnail}} style={{height:250}} />
        </View>
        <View style={{paddingTop: 10}}>
          <Label name={title} style={style.title} />
          <Label name={`$${price}`} style={style.title} />
          <View style={style.ratingContainer}>
            <Label name={'Rating'} style={style.rating} />
            <Label name={'4.4'} style={style.rating} />
            <View style={style.ratingContainer}>
              <Label name={'(500 Terjual)'} style={style.rating} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  ) : (
    <Pressable onPress={onClick}>
      <View style={style.item}>
        <View style={{borderWidth: 1, borderRadius: 5}}>
          <Image source={{uri: thumbnail}} style={style.image} />
        </View>
        <View style={{paddingTop: 10}}>
          <Label name={title} style={style.title} />
          <Label name={`$${price}`} style={style.title} />
          <View style={style.ratingContainer}>
            <Label name={'Rating'} style={style.rating} />
            <Label name={'4.4'} style={style.rating} />
            <View style={style.ratingContainer}>
              <Label name={'(500 Terjual)'} style={style.rating} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  rating: {
    fontSize: 10,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  image: {width: 250, height: 150, objectFit: 'cover', borderWidth: 1},
});

export default Card;
