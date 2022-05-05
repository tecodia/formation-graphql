import SQLCollector from './sql-collector';

const insertBindingsToSQL = (sql, bindings) => {
  return sql.split('?').reduce((memo, part, index) => {
    const binding = bindings[index] ? JSON.stringify(bindings[index]) : '';
    return memo + part + binding;
  }, '');
};

export default (knex) => {
  const queries = [];

  knex
    .on('query', ({ sql, bindings, __knexQueryUid: queryId }) => {
      const startTime = process.hrtime();

      queries[queryId] = { sql, startTime, bindings };
    })
    .on('query-response', (_, { __knexQueryUid: queryId }) => {
      const { startTime, sql, bindings } = queries[queryId];

      const endTime = process.hrtime(startTime);
      const query = insertBindingsToSQL(sql, bindings);

      SQLCollector.addQuery({
        executionTime: endTime[1] / 1000000,
        query,
      });
    });

  return knex;
};
