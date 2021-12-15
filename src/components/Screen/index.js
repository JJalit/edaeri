import React from 'react';

import StyledSafeAreaView from './StyledSafeAreaView';

function Screen(props) {
  const { children } = props;
  return <StyledSafeAreaView>{children}</StyledSafeAreaView>;
}

export default Screen;
