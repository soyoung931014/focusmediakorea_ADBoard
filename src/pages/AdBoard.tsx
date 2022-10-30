import React from 'react';
import styled from 'styled-components';

const AdBoard = () => {
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
        <div>qr코드</div>
      </CodeWrapper>
    </Container>
  );
};

export default AdBoard;

const Container = styled.div`
  height: 100vh;
`;
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
  width: 44.9rem;
  height: 90vh;
  border: solid red 2px;
`;
const CodeWrapper = styled.div`
  z-index: 10;
  position: sticky;

  left: 0;
  font-size: 50px;
`;
