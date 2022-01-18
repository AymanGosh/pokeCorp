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

const addToPokemonTypeTable = async function (pokemons) {
  let arrTypes = [];
  pokemons.forEach(async (p) => {
    if (!arrTypes.includes(p.type)) {
      arrTypes.push(p.type);
      let query = `INSERT INTO pokemon_type VALUES (null, '${p.type}')`;
      let result = await sequelize.query(query);
      return result[0];
    }
  });
};

//addToPokemonTypeTable(poke_data);
///////////////////////////////////////////////////////////////////////////////////////
const addToTownTable = async function (pokemons) {
  let arrTowns = [];
  pokemons.forEach(async (p) => {
    p.ownedBy.forEach(async (o) => {
      if (!arrTowns.includes(o.town)) {
        arrTowns.push(o.town);
        let query = `INSERT INTO town VALUES (null, '${o.town}')`;
        let result = await sequelize.query(query);
        return result[0];
      }
    });
  });
};

//addToTownTable(poke_data);
///////////////////////////////////////////////////////////////////////////////////////
const addToTrainerTable = async function (pokemons) {
  const arrTrainers = [];
  pokemons.forEach((p) => {
    p.ownedBy.forEach(async (o) => {
      if (!arrTrainers.includes(o.name)) {
        arrTrainers.push(o.name);
        const query_town = `SELECT id FROM town WHERE town='${o.town}'`;
        const town_id = await sequelize.query(query_town);
        let query = `INSERT INTO trainer VALUES (null, '${o.name}', ${town_id[0][0].id})`;
        let result = await sequelize.query(query);
        return result[0];
      }
    });
  });
};

//addToTrainerTable(poke_data);
/////////////////////////////////////////////////////////////////////////////////////

const addToPokemonsTable = async function (pokemons) {
  pokemons.forEach(async (p) => {
    const query_type = `SELECT id FROM pokemon_type WHERE type='${p.type}'`;
    const type_id = await sequelize.query(query_type);
    let query = `INSERT INTO pokemon VALUES (${p.id}, '${p.name}', ${type_id[0][0].id}, ${p.height}, ${p.weight} )`;
    let result = await sequelize.query(query);
    return result[0];
  });
};
//addToPokemonsTable(poke_data);
////////////////////////////////////////////////////////////////////////////////////

const addToPokemonTrainerTable = async function (pokemons) {
  pokemons.forEach(async (p) => {
    let pokemonID = p.id;
    p.ownedBy.forEach(async (o) => {
      let query1 = `SELECT id FROM trainer WHERE name='${o.name}'`;
      result = await sequelize.query(query1);
      let ownerIds = result[0];
      let query2 = `INSERT INTO pokemon_trainer VALUES (${pokemonID}, ${ownerIds[0].id})`;
      result2 = await sequelize.query(query2);
    });
  });
};

//addToPokemonTrainerTable(poke_data);
//////////////////////////////////////////////////////////////////////////////////////
