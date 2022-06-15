import SQLCollector from "./sql-collector";

export default {
  requestDidStart() {
    return {
      willSendResponse(requestContext) {
        const sqlExtension = {
          executionTime: SQLCollector.executionTime,
          numbersOfQueries: SQLCollector.queries.length,
          queries: SQLCollector.queries,
        };

        // eslint-disable-next-line no-param-reassign
        requestContext.response.extensions = {
          ...requestContext.response.extensions,
          sqlExtension,
        };

        SQLCollector.reset();
      },
    };
  },
};
