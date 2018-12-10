module.exports = {
  dialect: 'postgres',
  host: 'database_ip',
  username: 'docker',
  password: 'docker',
  database: 'dbname',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoreAll: true
  }
}
