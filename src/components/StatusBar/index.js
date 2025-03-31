import { useFocusEffect } from '@react-navigation/native';
import { Platform, StatusBar as SB } from 'react-native';

const StatusBar = ({ barStyle, bgColor }) => {
  useFocusEffect(() => {
    if (bgColor && Platform.OS === 'android') {
      SB.setBackgroundColor(bgColor);
    }
    SB.setBarStyle(barStyle);
  });
  return null;
};

export default StatusBar;
