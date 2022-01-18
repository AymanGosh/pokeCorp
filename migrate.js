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
