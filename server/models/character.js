module.exports = (conn, DataTypes) => {
  const character = conn.define('character', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    print_name: DataTypes.STRING
  })

  return character
}
