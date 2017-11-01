module.exports = (conn, DataTypes) => {
  const contributionKey = conn.define('contribution_key', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user: DataTypes.STRING,
    key: DataTypes.STRING
  })

  return contributionKey
}
