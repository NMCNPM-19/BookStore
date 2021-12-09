const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nodatra', {
    MaNoDT: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    MaNoPT: {
      type: DataTypes.STRING(6),
      allowNull: false,
      references: {
        model: 'nophaitra',
        key: 'MaNoPT'
      }
    },
    MAKH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    sotien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ngaytra: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nodatra',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaNoDT" },
        ]
      },
      {
        name: "nodatra_khachhang_MAKH_fk",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "nodatra_nophaitra_MaNoPT_fk",
        using: "BTREE",
        fields: [
          { name: "MaNoPT" },
        ]
      },
    ]
  });
};
