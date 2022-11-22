import axios from 'axios';

export const getAxios =
  ({ waitMs = 500, successPercentage }: { waitMs?: number; successPercentage: number }) =>
  async () =>
    axios.get<string>('/api/during', {
      params: {
        waitMs,
        successPercentage,
      },
    });
