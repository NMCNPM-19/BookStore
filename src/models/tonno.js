const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tonno', {
    MAKH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    Ngaythang: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    nodau: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nocuoi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tongno: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tongtra: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tonno',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MAKH" },
          { name: "Ngaythang" },
        ]
      },
    ]
  });
};
