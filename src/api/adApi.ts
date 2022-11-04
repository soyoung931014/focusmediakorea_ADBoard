import { BASE_URL } from './index';
import axios from 'axios';
import { userInfo } from '../types/type';
import { useMutation } from 'react-query';

export const fetchAd = async (today: string, currentTime: string | number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/adInfo?announcementDay=${today}&startTime=${currentTime}:00`,
    );
    if (response.data.length === 0) {
      return;
    }
    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

export const userInfoMutation = () =>
  useMutation(async (info: userInfo) => {
    return axios.post(`${BASE_URL}/userInfo`, info);
  });

export const findUser = async (ad_id: string, email: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/userInfo?ad_id=${ad_id}&email=${email}`,
    );
    if (response.data.length !== 0) {
      return { message: 'already exist', statusCode: 400 };
    } else {
      return { message: 'ok', statusCode: 200 };
    }
  } catch (error) {
    console.log('error');
  }
};
