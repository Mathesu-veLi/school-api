'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _multer = require('multer');
var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig');
var _multerConfig2 = _interopRequireDefault(_multerConfig);

var _Photo = require('../models/Photo');
var _Photo2 = _interopRequireDefault(_Photo);

const upload = _multer2.default
  .call(void 0, _multerConfig2.default)
  .single('file');

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
        const photo = await _Photo2.default.create({
          originalname,
          filename,
          student_id,
        });

        return res.json(photo);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['ID do student não existe'],
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
        const photo = await _Photo2.default.findOne({
          where: {
            student_id: req.body.student_id,
          },
        });
        const student_id = req.body.student_id;
        const originalnameAntigo = req.file.originalname;
        const filenameAntigo = req.file.filename;

        const photoAtualizada = await photo.update({
          originalname: originalnameAntigo,
          filename: filenameAntigo,
        });
        const { originalname, filename } = photoAtualizada;

        return res.json({ originalname, filename, student_id });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['ID do student não existe'],
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
        const photo = await _Photo2.default.findOne({
          where: {
            student_id: req.body.student_id,
          },
        });
        await photo.destroy();
        return res.json('Foto deletada com sucesso');
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ['ID do student não existe'],
        });
      }
    });
  }
}

exports.default = new PhotoController();
