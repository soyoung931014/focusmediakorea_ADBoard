import { BASE_URL } from './index';
import axios from 'axios';
import { userInfo } from '../types/type';
import { useMutation } from 'react-query';

export const fetchAd = async (today: string, currentTime: string | number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/adInfo?announcementDay=${today}&startTime=${currentTime}:00`,
    );
    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

export const userInfoMutation = () =>
  useMutation((info: userInfo) => {
    return axios.post(`${BASE_URL}/userInfo`, info);
  });
