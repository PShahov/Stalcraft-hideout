helper = require("./helper");

const _DB_REGION = "ru" || "global";
const _DB_URL = "https://raw.githubusercontent.com/EXBO-Studio/stalcraft-database/main/" + _DB_REGION;

const _HIDEOUT_TOOLS = {
    "workbench":                    "",
    "precise_tools":                "",
    "cnc":                          "",
    "hoods":                        "2l3l",
    "tool_trolley":                 "6z9p",
    "lathe":                        "kv5y",
    "chemical_reactor":             "yj0k",
    "centrifuge":                   "",
    "precise_powertools":           "w6l2",
    "wrenches_kit":                 "",
    "screwdrivers":                 "",
    "electronics_kit":              "gv16",
    "welding_equipment":            "yjnk",
    "flasks_kit":                   "",
    "calipers_kit":                 "",
    "gauze_filter":                 "0qj9",
    "rotary_evaporator":            "",
    "laser_level":                  "",
    "laboratory_table":             "gv96",
    "laminar_box":                  "",
    "chromatographic_equipment":    "",
    "scalpels_kit":                 "",
    "stove":                        "mvyy",
    "kitchen_items":                "n2n1",
    "kitchen_table":                "rzpv",
    "sterilization_system":         "",
    "fermentation_container":       "",
}
module.exports.hideout_tools = _HIDEOUT_TOOLS;

module.exports.numbers = ["N", "I","II","III","IV","V","VI","VII","IIX","IX","X"];



_items = {};
{
    let data  = require("./db/listing.json");
    data.forEach(e => {
        let key = e.data.split("/").at(-1).split(".")[0];
        e.craftable = false;
        e.id = key;
        _items[key] = e;
    });
    module.exports.items = _items;
}

let _recipes;
let _perks;
{
    let data  = require("./db/hideout_recipes.json")
    _recipes = data.recipes;
    _perks = data.perks;
    module.exports.recipes = _recipes;
    let perkId = {};
    for(let i = 0;i < _perks.length;i++){
        perkId[_perks[i].id] = i;
    }
    module.exports.perkId = perkId;
    _perks.forEach(e => {
        e.maxLevel = 0;
    });
    _recipes.forEach(e => {
        _items[e.result[0].item].craftable = true;
        if(e.requirements.perks == undefined) return;
        let perkKeys = Object.keys(e.requirements.perks);
        for(let i = 0;i < perkKeys.length;i++){
            if(_perks[perkId[perkKeys[i]]].maxLevel < e.requirements.perks[perkKeys[i]]) _perks[perkId[perkKeys[i]]].maxLevel = e.requirements.perks[perkKeys[i]];
        }
        return;
    });
    
    module.exports.perks = _perks;
}
// helper.readTextFile(_DB_URL + "/hideout_recipes.json", function(text){
//     let data  = JSON.parse(text);
//     _recipes = data.recipes;
//     _perks = data.perks;
//     module.exports.recipes = _recipes;
//     let perkId = {};
//     for(let i = 0;i < _perks.length;i++){
//         perkId[_perks[i].id] = i;
//     }
//     module.exports.perkId = perkId;
//     _perks.forEach(e => {
//         e.maxLevel = 0;
//     });
//     _recipes.forEach(e => {
//         if(e.requirements.perks == undefined) return;
//         let perkKeys = Object.keys(e.requirements.perks);
//         for(let i = 0;i < perkKeys.length;i++){
//             if(_perks[perkId[perkKeys[i]]].maxLevel < e.requirements.perks[perkKeys[i]]) _perks[perkId[perkKeys[i]]].maxLevel = e.requirements.perks[perkKeys[i]];
//         }
//         return;
//     });
    
//     module.exports.perks = _perks;
// });


const _RECIPES = _recipes;
const _PERKS = _perks;
// helper.readTextFile(_DB_URL + "/listing.json", function(text){
//     let data  = JSON.parse(text);
//     data.forEach(e => {
//         let key = e.data.split("/").at(-1).split(".")[0];
//         _items[key] = e;
//     });
//     module.exports.items = _items;
// })

const _ITEMS = _items;

module.exports.region = _DB_REGION;
module.exports.url = _DB_URL;