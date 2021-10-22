'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail.hasOne(models.User, {foreignKey: "DetailId"})
    }

    get birthDateFormat(){
      return this.birthDate.toISOString().split('T')[0]
    }

    get getProfilePitc() {
      if(this.gender == 'Male' ) {
        return this.profilePitc = "https://i.ibb.co/KLWvmDG/male-boy-person-people-avatar-icon-159358.png"
      } else {
        return this.profilePitc = "https://i.ibb.co/N2pBVBX/female-woman-avatar-people-person-white-tone-icon-159370.png"
      }
    }
  };
  Detail.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input your fullname!'
        }
      } 
    }, 
    birthDate:  {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Please input your birthdate!'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input gender!'
        }
      }
    },
    profilePitc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};