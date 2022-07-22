import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { MainPage } from 'pages/MainPage';
import { routes } from 'routes';
import { authUser } from 'slices/authSlice';
import { AppDispatch } from 'store';
import { CompanyPage } from 'pages/CompanyPage';
import { SideMenu } from "components/SideMenu";
import { CardMenu } from "components/CardMenu";

const App = () => {

  const dispatch: AppDispatch = useDispatch();

  // ToDo: create popup for authentification
  useEffect(() => {
    dispatch(authUser("no_link_to"));
  }, [])

  return (
    <div className="app">
      <SideMenu/>
      <CardMenu/>
      <BrowserRouter>
          <Routes>
            <Route 
              path={routes.home} 
              element={<MainPage/>}/>
            <Route 
              path={routes.company()} 
              element={<CompanyPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App };