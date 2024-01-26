const { DataTypes1 } = require('./filterDataTypes.js')
const DataTypes = DataTypes1

const Types = {
    2294888943:{
      type: "guild_in_range_by_hash",
      requiredData: [
        DataTypes.hash_key,DataTypes.target
      ]
    },
    4148745523:{
        type: "guild_hub_types",
        requiredData: [
         DataTypes.hub_types 
        ]
    },
    188952590:{
        type:"guild_has_vanity_url"
    },
    1604612045:{
        type:"guild_has_feature",
        requiredData:[
            DataTypes.guild_features
        ]
    },
    3013771838:{
        type:"guild_ids",
        requiredData:[
            DataTypes.guild_ids
        ]
    },
    2404720969:{
        type:"guild_id_range",
        requiredData:[
            DataTypes.min_id,DataTypes.max_id
        ]
    },
    3730341874:{
        type:"guild_age_range_days",
        requiredData:[
            DataTypes.min_id,DataTypes.max_id // not sure if those are correct 
        ]
    },
    2918402255:{
        type:"guild_member_count_range",
        requiredData:[
            DataTypes.min_id,DataTypes.max_id
        ]
    },
    default:{
        type:"unknown_filter"
    }

}

module.exports = Types