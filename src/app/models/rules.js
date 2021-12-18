const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rules', {
    Locker: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true
    },
    import_min: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    curr_quantity_max: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dept_min: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    curr_sale_min: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_cost_exceed_debt: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Locker" },
        ]
      },
    ]
  });
};
