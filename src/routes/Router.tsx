import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';

const Layout = React.lazy(() => import('../layout/Layout'));
const AdBoard = React.lazy(() => import('../pages/AdBoard'));
const InfoRegister = React.lazy(() => import('../pages/InfoRegister'));

const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AdBoard />} />
          <Route path="/infoRegister/:adId" element={<InfoRegister />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
