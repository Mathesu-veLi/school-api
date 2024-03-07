import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validade: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio',
            },
          },
        },

        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validade: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `/images/${this.getDataValue('filename')}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'photos',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}
