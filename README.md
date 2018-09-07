# searchapp

This repository is the content of the login_web_app folder of my repository ResumeDocxAnalyzer.

This is the web app displaying the result you can obtain with the classification of entities from the resume and the search you can achieve. The local server is the port 5000. 

This webapp is connected to Cosmos DB to search and retrieve CV by keyword to help the screening process for HR.

The web app is linked to Azure resources as blob for upload of CV that should then calls the python script to classify the entities, store them in Cosmos DB and retrieve them by indexation in Azure Search.

The configuration file that stores the information containing the credentials of these resources has been ignored. Therefore, after creating your blob account storage, Cosmos DB and Azure Search on Azure portal, add a config file config.js in this repository.

## Add in config.js

```javascript

let config = {}

//FOR COSMOS DB
config.host = "Cosmos DB host url";
config.authKey = "Cosmos DB key 1";
config.databaseId = "Cosmos DB database ID (name)";
config.collectionId = "Cosmos DB collection ID (name)";

//FOR AZURE SEARCH
config.searchApiKey="Your Asure Search key 1";
config.searchQueryKey="Your Azure Search query key ";
config.searchURL="Your Azure Seach Url";
config.searchApiVersion="2017-11-11";
config.searchName="Your Azure Search name";
config.searchDatasourceName="Your Azure Search Datasource name";
config.searchIndexName="Your Azure Search Index Name";
config.searchIndexerName="Your Azure Search Indexer Name";
config.searchDataSourceType = "documentdb";


config.maxFailedItems = 10;
config.maxFailedItemsPerBatch = 5;

config.base64EncodeKeys = false;

config.searchConnectionString='AccountEndpoint='+config.host+';AccountKey='+config.authKey+';Database='+config.databaseId

///FOR BLOB Storage
config.blobname="Your blob storage account name";
config.blobkey="Your blob key 1";
config.blobcontainer="Your blob container name";



module.exports = config;
```
