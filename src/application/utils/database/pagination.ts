export class PaginationUtils {
  page: number;
  limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  static generatePaginationForSql(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return {
      offset,
      limit: limit
    };
  }
}
