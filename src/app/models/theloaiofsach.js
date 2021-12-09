const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('theloaiofsach', {
    maTL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'theloai',
        key: 'maTL'
      }
    },
    masach: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'masach'
      }
    }
  }, {
    sequelize,
    tableName: 'theloaiofsach',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maTL" },
          { name: "masach" },
        ]
      },
      {
        name: "theloaiofsach_sach_masach_fk",
        using: "BTREE",
        fields: [
          { name: "masach" },
        ]
      },
    ]
  });
};
