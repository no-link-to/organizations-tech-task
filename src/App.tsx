import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { MainPage } from 'pages/MainPage';
import { routes } from 'routes';
import { authUser } from 'slices/authSlice';
import { AppDispatch } from 'store';

const App = () => {

  const dispatch: AppDispatch = useDispatch();

  // ToDo: create popup for authentification
  useEffect(() => {
    dispatch(authUser("no_link_to"));
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-left">
          <Routes>
            <Route 
              path={routes.home} 
              element={<MainPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export { App };