import React from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AdBoard = () => {
  const navigateUserInfo = useNavigate();
  return (
    <Container>
      <TitleWrpper>
        <Title>title작성합니다.</Title>
      </TitleWrpper>
      <ImgWrapper>
        <Img
          alt="mockAdImg"
          src={`${process.env.PUBLIC_URL}/images/ad_image.png`}
        ></Img>
      </ImgWrapper>
      <CodeWrapper>
        <QRCode
          value="qr_code"
          size={100}
          onClick={() => navigateUserInfo('/userInfo')}
        />
      </CodeWrapper>
    </Container>
  );
};

export default AdBoard;

const Container = styled.div``;
const TitleWrpper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 20px;
`;
const ImgWrapper = styled.div``;
const Img = styled.img`
  width: ${({ theme }) => theme.deviceSizes.minSize};
  height: 90vh;
`;
const CodeWrapper = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 0px;
  margin-left: 15px;
  margin-bottom: 10px;
  cursor: pointer;
`;
