import { RESTDataSource } from "apollo-datasource-rest";

export class cinemaDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://62738f9d345e1821b21d6ca8.mockapi.io/";
  }

  async getAllCinemas() {
    return await this.get("/cinema");
  }
}
