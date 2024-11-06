import { createRef } from 'react';

export const navigationRef = createRef();

export const navigate = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
};

export const reset = (state) => {
  if (navigationRef.current) {
    navigationRef.current.reset(state);
  }
};

export const getCurrentRoute = () => {
  if (navigationRef.current) {
    return navigationRef.current.getCurrentRoute();
  }
  return null;
};
