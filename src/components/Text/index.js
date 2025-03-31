import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import {normalize, normalizeOptions, normalizeFont} from '../../utils';

const STYLES = {
  deviceWidth: width,
  deviceHeight: height,
  black: '#000000',
  white: '#FFFFFF',
  gray: '#F0F0F0',
  lightGrey: '#FAFAFA',
  borderColor: '#EFEFEF',
  errorColor: '#D3003B',
  titleSize: normalizeFont(18),
  sectionTitleSize: normalizeFont(16),
  fontSize: normalizeFont(13),
  fontColor: '#5F5F5F',
  primaryColor: '#D3003B',
  secondaryColor: '#8F4DFF',
  descColor: '#9B9B9B',
  disableColor: '#CFCFCF',
  buttonFontSize: normalizeFont(16),
  buttonHeight: 44,
  bottomSpace: Platform.select({
    ios: getBottomSpace() + 16,
    android: 16,
  }),
  bottomSpaceConfig: ({value, addValueToIos}) => {
    return Platform.select({
      ios: getBottomSpace() + (addValueToIos ? value : 0),
      android: value,
    });
  },
  light: light,
  paddingBottom: 100,
  backgroundPage: '#FFF',
  lineฺBtween: '#FAFAFA',
};
const Text = ({style, children, margin, padding, type, ...rest}) => {
  const combinedStyle = [
    'size',
    'color',
    'lineHeight',
    'fontSize',
    'fontFamily',
    'fontWeight',
    'underline',
    'textAlign',
    'letterSpacing',
  ]
    .map(e => {
      if (!rest[e]) {
        return;
      }
      return styles[e](rest[e]);
    })
    .filter(e => e);

  return (
    <RNText
      style={StyleSheet.flatten([
        styles.default,
        margin && styles.margin(normalizeOptions(margin)),
        padding && styles.padding(normalizeOptions(padding)),
        type && styles.type(type),
        combinedStyle,
        style,
      ])}
      allowFontScaling={false}
      {...rest}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Prompt-Regular',
    color: STYLES.black,
  },
  type: type => {
    if (type === 'error') {
      return {
        color: STYLES.errorColor,
        // fontWeight: '300',
        fontSize: normalizeFont(10),
      };
    }
    if (type === 'link') {
      return {
        fontSize: normalizeFont(11),
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
      };
    }
    if (type === 'text') {
      return {
        fontSize: STYLES.fontSize,
        color: STYLES.fontColor,
        fontWeight: 'normal',
      };
    }
    if (type === 'title') {
      return {
        fontSize: STYLES.titleSize,
        fontFamily: 'Prompt-SemiBold',
      };
    }
    if (type === 'semi_title') {
      return {
        fontSize: STYLES.sectionTitleSize,
        fontFamily: 'Prompt-SemiBold',
      };
    }
    if (type === 'subject') {
      return {
        fontFamily: 'Prompt-SemiBold',
      };
    }

    return {};
  },
  color: color => ({color}),
  fontSize: size => ({fontSize: normalizeFont(size)}),
  fontFamily: fontFamily => ({fontFamily}),
  fontWeight: fontWeight => ({fontWeight: `${fontWeight}`}),
  margin: ([top, left, bottom, right]) => ({
    marginTop: top,
    marginBottom: bottom,
    marginLeft: normalize(left),
    marginRight: normalize(right),
  }),
  padding: ([top, left, bottom, right]) => ({
    paddingTop: top,
    paddingBottom: bottom,
    paddingLeft: normalize(left),
    paddingRight: normalize(right),
  }),
  underline: () => ({
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  }),
  textAlign: textAlign => ({textAlign}),
  lineHeight: lineHeight => ({lineHeight: normalizeFont(lineHeight)}),
  letterSpacing: letterSpacing => ({
    letterSpacing: letterSpacing,
  }),
  size: size => {
    switch (`${size}`) {
      case '5':
        return {
          fontSize: 5,
          lineHeight: 8,
        };
      case '6':
        return {
          fontSize: 6,
          lineHeight: 9,
        };
      case '7':
        return {
          fontSize: 7,
          lineHeight: 11,
        };
      case '8':
        return {
          fontSize: 8,
          lineHeight: 12,
        };
      case '9':
        return {
          fontSize: normalizeFont(9),
          lineHeight: normalizeFont(13),
        };
      case '10':
        return {
          fontSize: normalizeFont(10),
          lineHeight: normalizeFont(15),
        };
      case '12':
        return {
          lineHeight: normalizeFont(18),
          fontSize: normalizeFont(12),
        };
      case '13':
        return {
          fontSize: normalizeFont(13),
          lineHeight: normalizeFont(19),
        };
      case '14':
        return {
          fontSize: normalizeFont(14),
          lineHeight: normalizeFont(21),
        };
      case '16':
        return {
          fontSize: normalizeFont(16),
          lineHeight: normalizeFont(24),
        };
      case '20':
        return {
          fontSize: normalizeFont(20),
          lineHeight: normalizeFont(30),
        };
      case '22':
        return {
          fontSize: normalizeFont(22),
          lineHeight: normalizeFont(33),
        };
      default:
        return {
          fontSize: normalizeFont(size),
        };
    }
  },
});
