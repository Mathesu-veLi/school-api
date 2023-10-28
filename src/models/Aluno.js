import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validade: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres'
          },
        },
      },

      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validade: {
          len: {
            args: [3, 255],
            msg: 'Sobrenome precisa ter entre 3 e 255 caracteres'
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email inválido'
          },

          isUnique(value, next) {
            Aluno.findOne({ where: { email: value } }).then(aluno => {
              if (aluno) {
                return next('Email já existe, tente outro!');
              };
              return next();
            }).catch(err => next(err));
          },

        },
      },

      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validade: {
          isInt: {
            msg: 'Idade precisa ser um número inteiro'
          },
        },
      },

      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validade: {
          isFloat: {
            msg: 'Peso precisa ser um número inteiro ou flutuante'
          },
        },
      },

      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validade: {
          isFloat: {
            msg: 'Altura precisa ser um número inteiro ou flutuante'
          },
        },
      },
    }, {
      sequelize,
    });

    return this;
  };

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'aluno_id'})
  }
}
