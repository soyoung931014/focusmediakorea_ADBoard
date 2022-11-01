import { BASE_URL } from './index';
import axios from 'axios';

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
