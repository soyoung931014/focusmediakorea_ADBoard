import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import QRCode from 'react-qr-code';
import { adInfo } from '../types/type';

interface QrCodeProps {
  data?: adInfo[];
  index: number;
}

const QrCode = ({ data, index }: QrCodeProps) => {
  const scanTime = new Date();
  return (
    <>
      {!data || index === -1 ? null : (
        <CodeWrapper>
          <Link
            to={`/infoRegister/${data[index]?.ad_id}`}
            state={{ scanTime: scanTime.toISOString() }}
          >
            <QRCode value="qr_code" size={100} />
          </Link>
        </CodeWrapper>
      )}
    </>
  );
};

export default QrCode;

const CodeWrapper = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 0px;
  margin-left: 15px;
  margin-bottom: 10px;
  cursor: pointer;
`;
