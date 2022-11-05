import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { findUser, addUserInfoMutation } from '../api/userApi';

import { userInfo } from '../types/type';

interface RouteState {
  state: {
    scanTime: string;
  };
}

const InfoRegister = () => {
  const { adId } = useParams();
  const { state } = useLocation() as RouteState;

  const { mutate } = addUserInfoMutation();

  const emailInput = useRef<HTMLInputElement | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const agreementInput = useRef<HTMLInputElement | null>(null);
  const disAgreementInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      location.replace('/');
    }, 300000);
  }, []);

  const [info, setInfo] = useState<userInfo>({
    elevator_id: 'ELE_3041',
    ad_id: adId || '',
    scanTime: state?.scanTime,
    name: '',
    email: '',
    license: '',
  });
  const [emailvalidation, setEmailValidation] = useState('');

  const handleInfo = (e: React.ChangeEvent<HTMLInputElement>, ref: any) => {
    ref.current.value = e.target.value;
  };
  const clearBlur = (e: React.ChangeEvent<HTMLInputElement>, ref: any) => {
    setInfo({ ...info, [e.target.name]: ref.current.value });
  };

  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

  const emailHandleInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: any,
  ) => {
    handleInfo(e, ref);
    if (emailRegExp.test(ref.current.value) === false) {
      setEmailValidation('올바른 이메일을 입력해주세요.');
    } else setEmailValidation('');
  };

  const sendInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(info, 'sendInfo');
    if (info.name.length < 1) {
      nameInput.current?.focus();
      return;
    }
    if (info.email.length < 1) {
      emailInput.current?.focus();
      return;
    }
    if (info.license.length < 1 || info.license === 'N') {
      alert('약관 동의 여부를 확인해주세요');
      return;
    }

    findUser(info.ad_id, info.email).then(response => {
      if (response?.statusCode === 200) {
        mutate(info);
        alert('전송 완료, db.json에서 확인할 수 있습니다.');
      } else if (response?.statusCode === 400) {
        alert('해당 광고에 이미 등록된 이메일입니다.');
      }
    });
  };

  return (
    <Container>
      {state?.scanTime ? (
        <Wrapper onSubmit={sendInfo}>
          <NameWrapper>
            <Title>이름</Title>
            <Input
              type="text"
              placeholder="name"
              name="name"
              ref={nameInput}
              onChange={event => handleInfo(event, nameInput)}
              onBlur={event => clearBlur(event, nameInput)}
            />
          </NameWrapper>
          <EmailWrapper>
            <Title>email</Title>
            <Input
              type="text"
              placeholder="email"
              name="email"
              ref={emailInput}
              onChange={event => emailHandleInfo(event, emailInput)}
              onBlur={event => clearBlur(event, emailInput)}
            />
            <Message>{emailvalidation}</Message>
          </EmailWrapper>
          <AgreementWrapper>
            <Title>약관 동의</Title>
            <Option>
              <input
                style={{ marginRight: '5px' }}
                type="radio"
                id="YES"
                name="license"
                value="Y"
                ref={agreementInput}
                onChange={event => handleInfo(event, agreementInput)}
                onBlur={event => clearBlur(event, agreementInput)}
              />
              <label htmlFor="YES">예</label>
            </Option>
            <Option>
              <input
                style={{ marginRight: '5px' }}
                type="radio"
                id="NO"
                name="license"
                value="N"
                ref={disAgreementInput}
                onChange={event => handleInfo(event, disAgreementInput)}
                onBlur={event => clearBlur(event, disAgreementInput)}
              />
              <label htmlFor="NO">아니오</label>
            </Option>
          </AgreementWrapper>
          <SendWrapper>
            <button>보내기</button>
          </SendWrapper>
        </Wrapper>
      ) : (
        <>
          <h1>loading</h1>
        </>
      )}
    </Container>
  );
};

export default InfoRegister;

const Container = styled.div`
  border: solid red 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Wrapper = styled.form`
  border: solid red 2px;
  height: 370px;
  padding: 33px;
`;

const NameWrapper = styled.div``;
const EmailWrapper = styled.div``;
const AgreementWrapper = styled.div``;
const SendWrapper = styled.div`
  button {
    color: #343435;
    width: 220px;
    padding: 10px;
    font-size: 20px;
    :hover {
      cursor: pointer;
      background-color: orange;
    }
  }
`;
const Title = styled.div`
  font-size: 22px;
`;
const Input = styled.input`
  height: 30px;
  font-size: 20px;
  margin: 10px auto;
  border-bottom: solid grey 2px;
`;
const Message = styled.div`
  color: tomato;
  margin: 10px auto;
  height: 20px;
`;
const Option = styled.div`
  margin: 10px auto;
`;
