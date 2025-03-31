import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Box from '../Box';
import resources from './resources';
import {normalize, normalizeOptions} from '../../utils';

const ImageIcon = ({
  name,
  style,
  pressable,
  margin,
  padding,
  boxProps,
  onPress,
  disabled,
  ...rest
}) => {
  const combinedStyle = ['size']
    .map(e => {
      if (rest[e]) {
        return styles[e](rest[e]);
      }
    })
    .filter(e => e);

  if (pressable) {
    return (
      <Box pressable {...boxProps} onPress={onPress} disabled={disabled}>
        <FastImage
          source={resources[name]}
          resizeMode="contain"
          style={StyleSheet.flatten([
            styles.defaultStyle,
            margin && styles.margin(normalizeOptions(margin)),
            padding && styles.padding(normalizeOptions(padding)),
            combinedStyle,
            style,
          ])}
          {...rest}
        />
      </Box>
    );
  }

  return (
    <FastImage
      source={resources[name]}
      resizeMode="contain"
      style={StyleSheet.flatten([
        styles.defaultStyle,
        margin && styles.margin(normalizeOptions(margin)),
        padding && styles.padding(normalizeOptions(padding)),
        combinedStyle,

        style,
      ])}
      {...rest}
    />
  );
};

export default ImageIcon;

const styles = StyleSheet.create({
  defaultStyle: {height: normalize(24), width: normalize(24)},
  size: number => {
    return {
      height: normalize(number),
      width: normalize(number),
    };
  },
  margin: ([top, left, bottom, right]) => {
    return {
      marginTop: normalize(top),
      marginBottom: normalize(bottom),
      marginLeft: normalize(left),
      marginRight: normalize(right),
    };
  },
  padding: ([top, left, bottom, right]) => {
    return {
      paddingTop: normalize(top),
      paddingBottom: normalize(bottom),
      paddingLeft: normalize(left),
      paddingRight: normalize(right),
    };
  },
});
