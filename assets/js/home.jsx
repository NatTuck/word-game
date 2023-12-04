
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import $ from 'cash-dom';

import { select, selectDefaults } from './selectors';
import store from './store';
import Login from './login';
import Play from './play';

function Home() {
  const user = useSelector(select("user"));

  if (user) {
    return <Play />;
  }
  else {
    return <Login />;
  }
}

function setup() {
  let root = createRoot(document.getElementById('react-root'));
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <Home />
      </React.StrictMode>
    </Provider>
  );
}

$(setup);
