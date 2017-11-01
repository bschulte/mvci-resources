module.exports = (conn, DataTypes) => {
  const resource = conn.define('resource', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    char1: DataTypes.INTEGER,
    char2: DataTypes.INTEGER,
    char3: DataTypes.INTEGER,
    char4: DataTypes.INTEGER,
    title: DataTypes.STRING
  })

  return resource
}
