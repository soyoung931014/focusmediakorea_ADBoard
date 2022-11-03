import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../layout/Layout';
import AdBoard from '../pages/AdBoard';
import InfoRegister from '../pages/InfoRegister';
const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AdBoard />} />
        <Route path="/infoRegister/:adId" element={<InfoRegister />} />
      </Route>
    </Routes>
  );
};

export default Router;
