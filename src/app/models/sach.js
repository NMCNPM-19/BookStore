const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sach', {
    masach: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    tensach: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tacgia: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MOTA: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    manxb: {
      type: DataTypes.STRING(6),
      allowNull: true,
      references: {
        model: 'nxb',
        key: 'manxb'
      }
    },
    ngayXB: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SL: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    atDeleted: {
      type: DataTypes.DATE,
      allowNull: true
    },
    atUpdated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    atCreated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IMAGE: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    IMAGE_PUBLICID: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sach',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "masach" },
        ]
      },
      {
        name: "FK_SACH_NXB",
        using: "BTREE",
        fields: [
          { name: "manxb" },
        ]
      },
    ]
  });
};
