import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'lastName', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename']
      }
    });
    return res.json(students);
  };

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID not submitted'],
        });
      };

      const student = await Student.findByPk(id, {
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename']
        }
      });

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      };


      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    };
  };

  async store(req, res) {
    try {
      const student = await Student.create(req.body, req.userId)
      const { id, name, lastname, email, age, weight, height } = student

      return res.json({ id, name, lastname, email, age, weight, height })
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
          errors: ['ID not submitted'],
        });
      };

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      };

      const updatedStudent = await student.update(req.body);
      const { name, lastname, email, age, weight, height } = updatedStudent;

      return res.json({ name, lastname, email, age, weight, height });
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
          errors: ['ID not submitted'],
        });
      };

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      };

      await student.destroy();
      return res.json('Student successfully deleted');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    };
  };
};

export default new StudentController();
