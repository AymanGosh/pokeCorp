const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://root:@localhost/sql_pokemon");
const poke_data = require("./poke_data.json");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
/////////////////////////////////////////////////////////////////////
const findHeaviestPokemon = async function () {
  let heaviestPokemon;
  let query = `SELECT name
                 FROM pokemon
                 WHERE weight = (SELECT MAX(weight) FROM pokemon)`;
  let result = await sequelize.query(query);
  heaviestPokemon = result[0][0].name;
  console.log(heaviestPokemon);
};

findHeaviestPokemon();
