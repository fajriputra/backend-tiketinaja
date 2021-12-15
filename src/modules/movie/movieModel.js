const connection = require("../../config/database");

module.exports = {
  storeMovies: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO movie SET ?", data, (error, result) => {
        const newResult = {
          id: result.insertId,
          ...data,
        };

        if (!error) {
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getMovies: (limit, offset, keyword, month, sortBy, sortType) =>
    // eslint-disable-next-line consistent-return
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM movie WHERE name LIKE "%${keyword}%" AND MONTH(releaseDate) LIKE "%${month}%" ORDER BY ${sortBy} ${sortType} LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getSingleMovie: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM movie WHERE id = ?`,
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getCountMovie: (keyword) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM movie WHERE name LIKE "%${keyword}%"`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updateMovie: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE movie SET ? WHERE id = ?",
        [data, id],
        (error) => {
          const newResult = {
            id,
            ...data,
          };

          if (!error) {
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  deleteMovie: (id) =>
    new Promise((resolve, reject) => {
      connection.query(`DELETE FROM movie WHERE id = ?`, id, (error) => {
        if (!error) {
          resolve(id);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
