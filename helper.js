const shell = require('electron').shell

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
module.exports.readTextFile = readTextFile;

function median(values) {

    if (values.length === 0) {
      throw new Error('Input array is empty');
    }
  
    // Sorting values, preventing original array
    // from being mutated.
    values = [...values].sort((a, b) => a - b);
  
    const half = Math.floor(values.length / 2);
  
    return (values.length % 2
      ? values[half]
      : (values[half - 1] + values[half]) / 2
    );
  
  }
  module.exports.median = median;

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
module.exports.numberWithSpaces = numberWithSpaces;




function openWiki(id){
  console.log(id);
  helper.readTextFile(db.url + db.items[id].data, function(text){
      let data  = JSON.parse(text);
      let category = {
          "bullet": "ammo",
          "misc": "other",
          "drink": "medicine",
          "food": "medicine",
      }
      shell.openExternal(`https://stalcraft.wiki/items/${category[data.category] || data.category}/${id}`);
  })
}

module.exports.openWiki = openWiki;