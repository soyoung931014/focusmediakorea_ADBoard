import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../layout/Layout';
import AdBoard from '../pages/AdBoard';
const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AdBoard />} />
      </Route>
    </Routes>
  );
};

export default Router;
