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
  let arr = [];
  pokemons.forEach(async (p) => {
    if (!arr.includes(p.type)) {
      arr.push(p.type);
      let query = `INSERT INTO pokemon_type VALUES (null, '${p.type}')`;
      let result = await sequelize.query(query);
      return result[0];
    }
  });
};

addToPokemonTypeTable(poke_data);
///////////////////////////////////////////////////////////////////////////////////////
