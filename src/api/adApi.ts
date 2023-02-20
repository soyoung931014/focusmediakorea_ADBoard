import { BASE_URL } from './index';
import axios from 'axios';

export const fetchAd = async (today: string, currentTime: string | number) => {
  try {
    const criteriaDay = new Date(today).getTime();

    const response = await axios.get(
      `${BASE_URL}/adInfo?startTime=${currentTime}:00`,
    );

    if (response.data.length === 0) return;

    const { data } = response;
    const filteredDate = [];
    for (const ad of data) {
      const { announcementDay, EndDay } = ad;
      const start = new Date(announcementDay).getTime();
      const end = new Date(EndDay).getTime();
      if (start <= criteriaDay && criteriaDay <= end) {
        filteredDate.push(ad);
      }
    }

    response.data = [...filteredDate];

    return response.data;
  } catch (error) {
    return console.log(error);
  }
};
