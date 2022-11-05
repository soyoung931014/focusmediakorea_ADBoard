import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Advertisement from '../components/Advertisement';
import QrCode from '../components/QrCode';
import useInterval from '../hooks/useInterval';
import { format, getHours } from 'date-fns';

import { useQuery } from 'react-query';
import { fetchAd } from '../api/adApi';

import { adInfo } from '../types/type';

const AdBoard = () => {
  const [status, setStatus] = useState<boolean>(false);
  const [dataIndex, setDataIndex] = useState<number>(0);

  useEffect(() => {
    setStatus(!status);
  }, []);

  useInterval(
    () => {
      if (data) {
        setDataIndex(prev => prev + 1);
        if (dataIndex === allLimit) {
          setStatus(false);
          setDataIndex(-1);
        }
      }
    },
    status ? 30000 : null,
  );

  const today = format(new Date(), 'yyyy-MM-dd');

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

  const { isLoading, data } = useQuery<adInfo[]>(
    ['adList', today, currentTime],
    () => fetchAd(today, currentTime),
  );

  const allLimit = data?.reduce((acc: number, cur: any) => acc + cur.limit, 0);

  const index = data && dataIndex !== -1 ? dataIndex % data.length : dataIndex;

  return (
    <Container>
      {!isLoading ? (
        <>
          <Advertisement data={data} index={index} />
          <QrCode data={data} index={index} />
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </Container>
  );
};

export default AdBoard;

const Container = styled.div``;
