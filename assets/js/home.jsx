
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import $ from 'cash-dom';

import { selectName, selectDefaults } from './selectors';
import store from './store';
import Login from './login';
import Play from './play';

function Home() {
  const name = useSelector(selectName);

  if (name) {
    return <Play />;
  }
  else {
    return <Login />;
  }
}

function setup() {
  let rootDiv = document.getElementById('react-root');
  if (!rootDiv) {
    return;
  }

  let root = createRoot(rootDiv);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <Home />
      </React.StrictMode>
    </Provider>
  );
}

$(setup);
