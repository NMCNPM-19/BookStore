const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('theloai', {
    maTL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenTL: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Mota: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'theloai',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maTL" },
        ]
      },
    ]
  });
};
