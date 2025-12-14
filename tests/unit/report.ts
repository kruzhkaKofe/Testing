import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const sendReport = async (message: string) => {
  const id = uuidv4();
  await axios.post('https://analytics.service/api/reports', {
    id,
    message,
    timestamp: Date.now()
  });
  return id;
};
