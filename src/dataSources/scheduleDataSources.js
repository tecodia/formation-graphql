import { RESTDataSource } from "apollo-datasource-rest";

export class scheduleDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://62738f9d345e1821b21d6ca8.mockapi.io/";
  }

  async getScheduleByCinema(cinemaId) {
    try {
      const data = await this.get(`/schedules?cinemaId=${cinemaId}`);
      return data;
    } catch (error) {
      return [];
    }
  }
}
