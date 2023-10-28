import multer from 'multer';
import { extname, resolve } from 'path';

const randInt = () => Math.floor(Math.random() * 10000 + 10000)



export default {
  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser png ou jpg'));
    }

    return cb(null, true)
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve('uploads', 'images'));
     },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randInt()}${extname(file.originalname)}`);
     }
  })
};
