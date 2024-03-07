'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _Student = require('../models/Student');
var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo');
var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    const students = await _Student2.default.findAll({
      attributes: [
        'id',
        'nome',
        'sobrenome',
        'email',
        'idade',
        'peso',
        'altura',
      ],
      order: [
        ['id', 'DESC'],
        [_Photo2.default, 'id', 'DESC'],
      ],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    });
    return res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [
          ['id', 'DESC'],
          [_Photo2.default, 'id', 'DESC'],
        ],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return res.status(400).json({
          errors: ['Student não existe'],
        });
      }

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body, req.userId);
      const { id, nome, sobrenome, email, idade, peso, altura } = student;

      return res.json({ id, nome, sobrenome, email, idade, peso, altura });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student não existe'],
        });
      }

      const studentAtualizado = await student.update(req.body);
      const { nome, sobrenome, email, idade, peso, altura } = studentAtualizado;

      return res.json({ nome, sobrenome, email, idade, peso, altura });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student não existe'],
        });
      }

      await student.destroy();
      return res.json('Student deletado com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports.default = new StudentController();
