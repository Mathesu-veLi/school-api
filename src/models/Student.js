import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validade: {
            len: {
              args: [3, 255],
              msg: 'Name must be between 3 and 255 characters',
            },
          },
        },

        lastName: {
          type: Sequelize.STRING,
          defaultValue: '',
          validade: {
            len: {
              args: [3, 255],
              msg: 'Last name must be between 3 and 255 characters',
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'Invalid Email',
            },

            isUnique(value, next) {
              Student.findOne({ where: { email: value } })
                .then((student) => {
                  if (student) {
                    return next('Email already registered');
                  }
                  return next();
                })
                .catch((err) => next(err));
            },
          },
        },

        age: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validade: {
            isInt: {
              msg: 'Age must be an integer',
            },
          },
        },

        weight: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validade: {
            isFloat: {
              msg: 'Weight must be an integer or floating number',
            },
          },
        },

        height: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validade: {
            isFloat: {
              msg: 'Height must be an integer or floating number',
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
}
