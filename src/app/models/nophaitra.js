const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nophaitra', {
    MaNoPT: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    MAKH: {
      type: DataTypes.STRING(6),
      allowNull: false,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    MANV: {
      type: DataTypes.STRING(6),
      allowNull: false,
      references: {
        model: 'nhanvien',
        key: 'MANV'
      }
    },
    sono: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ngayno: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nophaitra',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaNoPT" },
        ]
      },
      {
        name: "FK_PTRA_KHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "FK_PTRA_NHANVIEN",
        using: "BTREE",
        fields: [
          { name: "MANV" },
        ]
      },
    ]
  });
};
