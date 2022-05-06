import { SQLDataSource } from "./sqlDataSource";

export class ConventionsDataSources extends SQLDataSource {
  async getConventions(limit, offset) {
    const responseCache = await this.cache
      .get(`conventions:${limit}:${offset}`)
      .then((item) => item && JSON.parse(item));

    if (responseCache) {
      return responseCache;
    }

    const response = await this.knex
      .select("*")
      .from("convention")
      .limit(limit)
      .offset(offset);

    this.cache.set(`conventions:${limit}:${offset}`, JSON.stringify(response), {
      ttl: 10,
    });

    return response;
  }
}
