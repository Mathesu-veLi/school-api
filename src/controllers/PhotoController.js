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
        const { aluno_id } = req.body;
        const photo = await Photo.create({ originalname, filename, aluno_id });

        return res.json(photo);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['ID do aluno não existe'],
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
            aluno_id: req.body.aluno_id,
          },
        });
        const aluno_id = req.body.aluno_id;
        const originalnameAntigo = req.file.originalname;
        const filenameAntigo = req.file.filename;

        const photoAtualizada = await photo.update({
          originalname: originalnameAntigo,
          filename: filenameAntigo,
        });
        const { originalname, filename } = photoAtualizada;

        return res.json({ originalname, filename, aluno_id });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['ID do aluno não existe'],
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
            aluno_id: req.body.aluno_id,
          },
        });
        await photo.destroy();
        return res.json('Foto deletada com sucesso');
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['ID do aluno não existe'],
        });
      }
    });
  }
}

export default new PhotoController();
