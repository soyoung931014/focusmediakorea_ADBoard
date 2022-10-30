import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
const Layout = () => {
  return (
    <Container>
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: #ccc;
`;
const LayoutWrapper = styled.div`
  width: ${({ theme }) => theme.deviceSizes.minSize};
  height: 100vh;
  background-color: white;
  border: 1px solid #ccc;
  margin: 0 auto;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
