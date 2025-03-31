import * as React from 'react';

export const navigationRef = React.createRef();

export const paymentModalRef = React.createRef();
export const toastRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate &&
    navigationRef.current.navigate(name, params);
}

export function push(name, params) {
  navigationRef.current?.push && navigationRef.current.push(name, params);
}

export function goBack() {
  navigationRef.current?.goBack && navigationRef.current.goBack();
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export function dispatch(params) {
  navigationRef.current?.dispatch(params);
}

const RootNavigation = {
  navigate,
  goBack,
  getCurrentRoute,
  dispatch,
};

export default RootNavigation;
