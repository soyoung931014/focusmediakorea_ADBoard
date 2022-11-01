import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format, getHours } from 'date-fns';
import { useQuery } from 'react-query';
import { fetchAd } from '../api/adApi';
import useInterval from '../hooks/useInterval';
import { adInfo } from '../types/type';

export interface info {
  data: adInfo[];
  isLoading: boolean;
}

const AdBoard = () => {
  const navigateUserInfo = useNavigate();
  const [status, setStatus] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    setStatus(!status);
  }, []);

  const today: string = format(new Date(), 'yyyy-MM-dd');

  let currentTime: string | number = getHours(new Date());
  if (0 <= currentTime && currentTime < 6) {
    currentTime = '00';
  } else if (6 <= currentTime && currentTime < 12) {
    currentTime = '06';
  } else if (12 <= currentTime && currentTime < 18) {
    currentTime = '12';
  } else {
    currentTime = '18';
  }

  const info = useQuery(['adList', today, currentTime], () =>
    fetchAd(today, currentTime),
  );

  const { isLoading, data } = info;

  useInterval(
    () => {
      setDataIndex(prev => prev + 1);
    },
    status ? 1000 : null,
  );
  if (data) {
    if (dataIndex === data.length) {
      setStatus(false);
      setDataIndex(0);
    }
  }

  return (
    <>
      {!isLoading ? (
        <Container>
          <TitleWrpper>
            <Title>{data[dataIndex]?.ad_id}</Title>
            <div>{data[dataIndex]?.category}</div>
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
      ) : (
        <h1>isLoading</h1>
      )}
    </>
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
