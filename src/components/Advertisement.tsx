import React from 'react';
import styled from 'styled-components';
import { adInfo } from '../types/type';

interface AdvertisementProps {
  data?: adInfo[];
  index: number;
}

const Advertisement = ({ data, index }: AdvertisementProps) => {
  return (
    <>
      <TitleWrpper>
        <Title>
          {!data || index === -1 ? <div>광고 없음</div> : data[index].ad_id}
        </Title>
      </TitleWrpper>
      <ImgWrapper>
        {!data || index === -1 ? (
          <Img
            alt="NO_DATA"
            src={`${process.env.PUBLIC_URL}/images/focusmedia.png`}
          ></Img>
        ) : (
          <Img
            alt="mockAdImg"
            src={`${process.env.PUBLIC_URL}/images/${data[index].ad}`}
          ></Img>
        )}
      </ImgWrapper>
    </>
  );
};

export default Advertisement;
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
