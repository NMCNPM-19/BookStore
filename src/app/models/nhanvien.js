const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nhanvien', {
    MANV: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    USER: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "USER"
    },
    PASS: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    HOTEN: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    NGAYSINH: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HINHANH: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    CCCD: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    PHAI: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    DIACHI: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    SDT: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    LOAINV: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    STATUS: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: "Active"
    },
    IDHINHANH: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nhanvien',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
      {
        name: "USER",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER" },
        ]
      },
    ]
  });
};
