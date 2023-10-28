"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename']
      }
    });
    return res.json(alunos);
  };

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      };

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename']
        }
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      };


      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    };
  };

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body, req.userId)
      const { id, nome, sobrenome, email, idade, peso, altura } = aluno

      return res.json({ id, nome, sobrenome, email, idade, peso, altura })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  };

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      };

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      };

      const alunoAtualizado = await aluno.update(req.body);
      const { nome, sobrenome, email, idade, peso, altura } = alunoAtualizado;

      return res.json({ nome, sobrenome, email, idade, peso, altura });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    };
  };

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      };

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      };

      await aluno.destroy();
      return res.json('Aluno deletado com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    };
  };
};

exports. default = new AlunoController();
