const { db } = require("./render");

class CraftMap{
    title = "";
    totalItems = {};
    linkedItems = {};

    constructor(title = "test", id = ""){
        this.title = title;
        if(id != null)
            this.CreateMapById(id);
    }

    CreateMapById(id){
        this.linkedItems = {
            "id": _id,
            "craft": []
        };


        function ingRecur(_id){
            let ret = {
                "id": _id,
                "craft":[]
            };

            if(db.items[_id].craftable){
                for(let )
            }

            return ret;
        }
    };
}

module.exports.CraftMap = CraftMap;