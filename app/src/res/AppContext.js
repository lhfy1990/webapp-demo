import React from 'react';

import locale from './locale';
import Request from './Request';

let context = {
  locale: locale.en,
  request: new Request(),
  profile: undefined,
  setProfile: () => {}
};

let AppContext = React.createContext(context);

export default AppContext;
