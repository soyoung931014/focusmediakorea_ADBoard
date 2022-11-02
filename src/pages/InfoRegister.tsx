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

  const emailHandleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInfo(e);
    if (emailRegExp.test(e.target.value) === false) {
      setEmailValidation('올바른 이메일을 입력해주세요.');
    } else setEmailValidation('');
  };

  return (
    <>
      {state?.scanTime ? (
        <Container>
          <Wrapper>
            <NameWrapper>
              <Title>이름</Title>
              <Input
                type="text"
                placeholder="name"
                onChange={handleInfo}
                name="name"
              />
            </NameWrapper>

            <EmailWrapper>
              <Title>email</Title>
              <Input
                type="text"
                placeholder="email"
                onChange={emailHandleInfo}
                name="email"
              />
              <Message>{emailvalidation}</Message>
            </EmailWrapper>
            <AgreementWrapper>
              <Title>동의 약관</Title>
              <Option>
                <input
                  type="radio"
                  id="YES"
                  name="agreementStatus"
                  value="true"
                />
                <label htmlFor="YES">예</label>
              </Option>
              <Option>
                <input
                  type="radio"
                  id="NO"
                  name="agreementStatus"
                  value="false"
                />
                <label htmlFor="NO">아니오</label>
              </Option>
            </AgreementWrapper>
            <SendWrapper>
              <button>보내기</button>
            </SendWrapper>
          </Wrapper>
        </Container>
      ) : (
        'loading'
      )}
    </>
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
