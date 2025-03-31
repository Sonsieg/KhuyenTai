import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {normalize, normalizeOptions} from '../../utils';
import {
  SHADOW_HEIGHT_MAP,
  SHADOW_OPACITY_MAP,
  SHADOW_RADIUS_MAP,
} from './constants';

const Box = ({
  style,
  children,
  margin,
  padding,
  extraTouchArea,
  pressable,
  pressableComponent,
  ...rest
}) => {
  const combinedStyle = [
    'flexDirection',
    'justify',
    'align',
    'alignSelf',
    'flex',
    'background',
    'square',
    'circle',
    'shadowDepth',
    'height',
    'width',
    'minWidth',
  ]
    .map(e => {
      if (!rest[e]) {
        return;
      }

      return styles[e](rest[e]);
    })
    .filter(e => e);

  if (pressable) {
    const TouchAble = pressableComponent
      ? pressableComponent
      : TouchableOpacity;
    return (
      <TouchAble
        style={StyleSheet.flatten([
          combinedStyle,
          margin && styles.margin(normalizeOptions(margin)),
          padding && styles.padding(normalizeOptions(padding)),
          style,
        ])}
        activeOpacity={0.7}
        hitSlop={
          extraTouchArea
            ? styles.extraTouchArea(normalizeOptions(extraTouchArea))
            : undefined
        }
        {...rest}>
        {children}
      </TouchAble>
    );
  }

  return (
    <View
      style={StyleSheet.flatten([
        combinedStyle,
        margin && styles.margin(normalizeOptions(margin)),
        padding && styles.padding(normalizeOptions(padding)),
        style,
      ])}
      {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  minWidth: minWidth => {
    return {minWidth};
  },
  background: color => {
    return {backgroundColor: color};
  },
  width: width => {
    return {width: normalize(width)};
  },
  height: height => {
    return {height: normalize(height)};
  },
  flex: number => {
    return {flex: number};
  },
  flexDirection: direction => {
    return {
      flexDirection: direction,
    };
  },
  justify: alignment => {
    return {
      justifyContent: alignment,
    };
  },
  align: alignment => {
    return {
      alignItems: alignment,
    };
  },
  alignSelf: alignment => {
    return {
      alignSelf: alignment,
    };
  },
  square: number => {
    return {
      height: number,
      width: number,
    };
  },
  circle: number => {
    return {
      height: normalize(number),
      width: normalize(number),
      borderRadius: normalize(number / 2),
    };
  },
  shadowDepth: depth => {
    let realDepth = 0;
    if (depth > 24) {
      realDepth = 24;
    } else {
      realDepth = depth;
    }

    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: SHADOW_HEIGHT_MAP[realDepth],
      },
      shadowOpacity: SHADOW_OPACITY_MAP[realDepth],
      shadowRadius: SHADOW_RADIUS_MAP[realDepth],
      elevation: realDepth,
    };
  },
  margin: ([top, left, bottom, right]) => {
    return {
      marginTop: top,
      marginBottom: bottom,
      marginLeft: normalize(left),
      marginRight: normalize(right),
    };
  },
  padding: ([top, left, bottom, right]) => {
    return {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: normalize(left),
      paddingRight: normalize(right),
    };
  },
  extraTouchArea: ([top, left, bottom, right]) => {
    return {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
    };
  },
});

export default Box;
