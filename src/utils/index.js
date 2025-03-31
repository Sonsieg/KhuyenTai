/* eslint-disable react/react-in-jsx-scope */
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Dimensions, PixelRatio, Platform} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from 'react-native-iphone-x-helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getBottomInset, hasDynamicIsland} from 'rn-iphone-helper';
import Colors from '../assets/Colors';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const scale = SCREEN_WIDTH / 360;
const heightBaseScale = SCREEN_HEIGHT / 896;

const {width} = Dimensions.get('window');

const RFValueHorizontal = (
  fontSize,
  customWidth,
  standardScreenWidth = 360,
) => {
  const heightPercent = Math.round(
    (fontSize * (customWidth || width)) / standardScreenWidth,
  );
  return heightPercent > fontSize + 2 ? fontSize + 2 : heightPercent;
};

export const normalizeFont = size => {
  return RFValueHorizontal(size);
};

export const normalize = (size, based) => {
  switch (based) {
    case 'height':
      const newSizeH = size * heightBaseScale;
      if (!newSizeH) {
        return size;
      }
      return Math.round(PixelRatio.roundToNearestPixel(newSizeH));
    default:
      const newSize = size * scale;
      if (!newSize) {
        return size;
      }
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};

export const normalizeOptions = options => {
  if (!Array.isArray(options) && typeof options !== 'object') {
    return normalizeOptions([options]);
  }

  if (options.length === 1) {
    const value = options[0];
    return [value, value, value, value];
  }

  if (options.length === 2) {
    const value1 = options[0],
      value2 = options[1];
    return [value1, value2, value1, value2];
  }

  return options;
};

export const DefaultHeaderHeightWithInset = () => {
  const insets = useSafeAreaInsets();

  let headerHeight;
  if (Platform.OS === 'ios') {
    if (Platform.isPad) {
      headerHeight = 50;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }
  return headerHeight + insets.top;
};

export const getDefaultHeaderHeight = (modalPresentation, statusBarHeight) => {
  let headerHeight;
  if (Platform.OS === 'ios') {
    if (Platform.isPad) {
      if (modalPresentation) {
        headerHeight = 56;
      } else {
        headerHeight = 50;
      }
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }
  return headerHeight + statusBarHeight;
};

export const heighNavBar = () => {
  const statusBarHeight = getStatusBarHeight();
  return normalize(20) + statusBarHeight;
};

export const HEIGH_BOTTOM_TAB = 55 + getBottomInset();
const MARGIN_ANDROID = getStatusBarHeight();
const MARGIN_IOS = getStatusBarHeight() + normalize(30);
export const MARGIN_TOP = Platform.OS === 'ios' ? MARGIN_IOS : MARGIN_ANDROID;

const BOTTOM_ANDROID = getBottomSpace() + 10;
const BOTTOM_IOS = hasDynamicIsland()
  ? getBottomInset()
  : isIphoneX()
  ? getBottomSpace()
  : normalize(15);
export const BOTTOM = Platform.OS === 'ios' ? BOTTOM_IOS : BOTTOM_ANDROID;

export const headerOptions = ({route, navigation}) => {
  const fromRegister = route?.params?.fromRegister || false;
  return {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitleAlign: 'center',
    headerTintColor: Colors.WHITE,
    headerStyle: {
      backgroundColor: Colors.GREEN,
    },
    headerTitleStyle: {
      fontSize: normalizeFont(14),
      lineHeight: normalizeFont(21),
      paddingHorizontal: normalize(15),
    },
    headerLeft: props => {
      if (!props.canGoBack) {
        return null;
      }
      return null;
    },
  };
};
