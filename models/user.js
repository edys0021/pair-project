'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require("sequelize");
const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Detail, { foreignKey: "DetailId" })
      User.hasMany(models.Post, { foreignKey: "UserId" })
    }

    static search(role) {
      return User.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
            model: Detail,
            where: { fullName: { [Op.iLike]: `%${search}%` } }
        }, {
            model: Post
        }]
    })
    }

  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input your email!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input your password!'
        }
      }
    },
    role: DataTypes.STRING,
    DetailId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(instance.password, salt)
        instance.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};