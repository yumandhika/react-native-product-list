import * as React from 'react';
import {StyleSheet, Text as TextReact} from 'react-native';

const Label = ({name, style}: {name: string; style: {}}) => {
  return <TextReact style={style ? style : styleText.header}>{name}</TextReact>;
};

const styleText = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});

export default Label;
