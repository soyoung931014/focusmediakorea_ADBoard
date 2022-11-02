import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { userInfo } from '../types/type';

const InfoRegister = () => {
  const { adId } = useParams();
  const { state } = useLocation();

  const [info, setInfo] = useState<userInfo>({
    elevator_id: 'EEL',
    ad_id: adId || '',
    scanTime: state?.scanTime,
    name: '',
    email: '',
    license: '',
  });
  const [emailvalidation, setEmailValidation] = useState('');

  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const handleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  console.log(info);

  const emailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInfo(e);
    if (emailRegExp.test(e.target.value) === false) {
      setEmailValidation('올바른 이메일을 입력해주세요.');
    } else setEmailValidation('');
  };

  return (
    <>
      {state?.scanTime ? (
        <Container>
          <div>
            <span>이름</span>
            <input
              type="text"
              placeholder="name"
              onChange={handleInfo}
              name="name"
            />
          </div>
          <div>
            <span>email</span>
            <input
              type="text"
              placeholder="email"
              onChange={emailValidation}
              name="email"
            />
            <div>{emailvalidation}</div>
          </div>

          <div>
            <input type="radio" id="YES" name="agreementStatus" value="true" />
            <label htmlFor="YES">예</label>
          </div>
          <div>
            <input type="radio" id="NO" name="agreementStatus" value="false" />
            <label htmlFor="NO">아니오</label>
          </div>
        </Container>
      ) : (
        'loading'
      )}
    </>
  );
};

export default InfoRegister;

const Container = styled.form``;
