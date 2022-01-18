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

//findHeaviestPokemon();
/////////////////////////////////////////////////////////////////////////////////
const findPokemonByType = async function (type) {
  let arrPokemons = [];
  let query = `SELECT name 
                FROM pokemon 
                WHERE type=(SELECT id FROM pokemon_type WHERE type = '${type}') `;
  let result = await sequelize.query(query);
  arrPokemons = result[0].map((p) => p.name);
  console.log(arrPokemons);
};

//findPokemonByType("grass");
//////////////////////////////////////////////////////////////////////////////////////
const findAllPokemonOwners = async function (name) {
  let arrTrainersName = [];
  let query = `SELECT trainer.name
                FROM pokemon_trainer, pokemon, trainer
                WHERE pokemon_trainer.pokemon_id = pokemon.id AND
                pokemon_trainer.trainer_id = trainer.id 
                AND pokemon.name = '${name}'
                `;
  let result = await sequelize.query(query);
  arrTrainersName = result[0].map((p) => p.name);
  console.log(arrTrainersName);
};

//findAllPokemonOwners("gengar");
/////////////////////////////////////////////////////////////////////////////
