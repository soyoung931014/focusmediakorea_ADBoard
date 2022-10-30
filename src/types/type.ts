export interface adInfo {
  ad_id: string;
  category: string[];
  announcementDay: string;
  startTime: string;
  endTime: string;
  limit: number;
}

export interface userInfo {
  elevator_id: string;
  ad_id: string;
  scanTime: string;
  name: string;
  email: string;
  license: string;
}
