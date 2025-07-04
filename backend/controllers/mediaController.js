import * as Media from '../models/mediaModel.js';

export const listMedia = async (req, res) => {
  try {
    const media = await Media.getAllMedia();
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadMedia = async (req, res) => {
  try {
    const id = await Media.createMedia(req.body);
    res.status(201).json({ media_id: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
