import  pool  from '../config/db.js';

export const getAllMedia = async () => {
  const [rows] = await pool.query('SELECT * FROM media');
  return rows;
};

export const createMedia = async (media) => {
  const { title, type, genre, image_url, description } = media;
  const [result] = await pool.query(
    'INSERT INTO media (title, type, genre, image_url, description) VALUES (?, ?, ?, ?, ?)',
    [title, type, genre, image_url, description]
  );
  return result.insertId;
};
