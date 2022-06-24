// This is used for lib/utils to map the spell ids to the spell names.
const axios = require("axios").default;

const resp = axios
  .get(
    "https://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/summoner.json"
  )
  .then((res) => {
    const data = res.data.data;
    // Foreach property in the data object
    for (const key in data) {
      // If the property is a spell
      if (data.hasOwnProperty(key)) {
        let spell = data[key]
        console.log(`case ${spell.key}:\nreturn \"${spell.id}\"`)
      }
    }
  });
