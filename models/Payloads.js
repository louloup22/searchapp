var config = require('../config');
var payloads = {};

payloads.dataSourcePayload = { 
    "name" : config.searchDatasourceName,
    "description" : "Resume Dataset",
    "type" : config.searchDataSourceType,
    "credentials" : { "connectionString" : config.searchConnectionString},
    "container" : { "name" : config.collectionId,/* "query":None */},
    "dataChangeDetectionPolicy": {
            "@odata.type": "#Microsoft.Azure.Search.HighWaterMarkChangeDetectionPolicy",
            "highWaterMarkColumnName": "_ts" //_ts= propriety timestamp
        },
//strategy of soft delete by identifying the delete data
        "dataDeletionDetectionPolicy": {
            "@odata.type": "#Microsoft.Azure.Search.SoftDeleteColumnDeletionDetectionPolicy",
            "softDeleteColumnName": "isDeleted",
            "softDeleteMarkerValue": "true"
        }
};

payloads.indexerPayload = {
    "name" : config.searchIndexerName,
    "description" : "Resume data indexer",
    "dataSourceName" : config.searchDatasourceName,
    "targetIndexName" : config.searchIndexName,
    "parameters" : { "maxFailedItems" : config.maxFailedItems, "maxFailedItemsPerBatch" : config.maxFailedItemsPerBatch, "base64EncodeKeys": config.base64EncodeKeys }
};

payloads.indexPayload = 
{
    "name": config.searchIndexName,
    "fields":[
        {"name":"index","type":"Edm.Int64"},
        {"name":"file_path","type":"Edm.String"},
        {"name":"extension","type":"Edm.String"},
        {"name":"file","type":"Edm.String"},
        {"name":"text","type":"Edm.String"},
        {"name":"chunk_text","type":"Edm.String"},
        {"name":"candidate_name","type":"Edm.String"},
        {"name":"nationality","type":"Edm.String"},
        {"name":"email","type":"Edm.String"},
        {"name":"phone","type":"Edm.String"},
        {"name":"birthdate","type":"Edm.String"},
        {"name":"unit_postcode","type":"Edm.String"},
        {"name":"url","type":"Edm.String"},
        {"name":"experience","type":"Edm.String"},
        {"name":"position","type":"Edm.String"},
        {"name":"level_of_education","type":"Edm.String"},
        {"name":"platforms","type":"Edm.String"},
        {"name":"typestudies","type":"Edm.String"},
        {"name":"universities","type":"Edm.String"},
        {"name":"languages","type":"Edm.String"},
        {"name":"languages_accreditation","type":"Edm.String"},
        {"name":"hobbies","type":"Edm.String"},
        {"name":"programming","type":"Edm.String"},
        {"name":"database","type":"Edm.String"},
        {"name":"machinelearning","type":"Edm.String"},
        {"name":"cloud_platform","type":"Edm.String"},
        {"name":"open_source","type":"Edm.String"},
        {"name":"IT_business_toolkit","type":"Edm.String"},
        {"name":"id","type":"Edm.String","key":true,"searchable": false}
        ],
    "suggesters": [
        {
        "name": "education",
        "searchMode": "analyzingInfixMatching",
        "sourceFields": ["universities", "typestudies","level_of_education"]
        }]
    /*"scoringProfiles": [],
    "defaultScoringProfile": null,
    "corsOptions": 
    {
    	"allowedOrigins":["*"],
    	"maxAgeInSeconds":300
    },
    "suggesters": []*/
};

module.exports = payloads;
