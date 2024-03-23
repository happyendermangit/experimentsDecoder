const filterTypes = require('./filters/filtersTypes.js')
const { DataTypes0 } = require('./filters/filterDataTypes.js')


function decodeExperiment(experiment){
    let decodedExperiment = {}
    
    let populations = []

    let overrides = {}

    decodedExperiment.hash = experiment[0]
    decodedExperiment.revision = experiment[2]

    // find populations:
    experiment[3].forEach(population => {
        let buckets = {}
        let filters = []

        // find buckets 
        population[0].forEach(bucket=>{
            buckets[bucket[0].toString()] = {
                rollout: []
            }

            bucket[1].forEach(rollout=>{
                buckets[bucket[0].toString()].rollout.push({
                    start:rollout.s,
                    end:rollout.e
                })
            })
          
        })
        // find filters:
        population[1].forEach(filter=>{
            if (Object.keys(filterTypes).includes(filter[0].toString())){
                for (let data of filter[1]){
                    if (filterTypes[filter[0]]?.requiredData?.includes(data[0])){
                        let filter_ = {}
                        filter_.type = filterTypes[filter[0]].type
                        filter_[DataTypes0 [ data [0] ] ] = data[1]
                        filters.push(filter_)
                    }else{
                        console.log(`[ERROR] Excepted key to be in required data list but got ${data[0]}`)
                    }
                }
            }else{
                filters.push({
                    type:filterTypes.default.type,
                    hash:filter[0],
                    data:filter[1]
                })
            }
        })
        populations.push({
            buckets:buckets,
            filters:filters
        })
    });

    // find ovverides:
    experiment[4].forEach(override=>{
        overrides[override.b] = override.k
    })
    decodedExperiment.populations = populations
    decodedExperiment.overrides = overrides
    decodedExperiment.aaMode = experiment.pop()
    console.log(JSON.stringify(decodedExperiment,null,4))
    return decodedExperiment
}

