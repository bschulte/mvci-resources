module.exports = (conn, DataTypes) => {
  const User = conn.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE
    },
    last_login: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    },
    group: {
      type: DataTypes.STRING
    },
    login_attempts: {
      type: DataTypes.INTEGER
    },
    locked: {
      type: DataTypes.INTEGER
    }
  })

  return User
}
