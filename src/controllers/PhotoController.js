import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('file');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (e) => {
      if (e) {
        return res.status(400).json({
          erros: [e.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await Photo.create({
          originalname,
          filename,
          student_id,
        });

        return res.json(photo);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['Student ID does not exist'],
        });
      }
    });
  }
  update(req, res) {
    return upload(req, res, async (e) => {
      if (e) {
        return res.status(400).json({
          erros: [e.code],
        });
      }

      try {
        const photo = await Photo.findOne({
          where: {
            student_id: req.body.student_id,
          },
        });
        const student_id = req.body.student_id;
        const oldOriginalName = req.file.originalname;
        const oldFilename = req.file.filename;

        const photoAtualizada = await photo.update({
          originalname: oldOriginalName,
          filename: oldFilename,
        });
        const { originalname, filename } = photoAtualizada;

        return res.json({ originalname, filename, student_id });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['Student ID does not exist'],
        });
      }
    });
  }
  delete(req, res) {
    return upload(req, res, async (e) => {
      if (e) {
        return res.status(400).json({
          erros: [e.code],
        });
      }

      try {
        const photo = await Photo.findOne({
          where: {
            student_id: req.body.student_id,
          },
        });
        await photo.destroy();
        return res.json('Photo successfully deleted');
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['Student id does not exist'],
        });
      }
    });
  }
}

export default new PhotoController();
