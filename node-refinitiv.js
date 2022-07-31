/*
 * ====================================================================
 * This nodejs example shows how to request an authentication token from
 * DSS/TRTH service and perform a RIC search.
 * 
 * To run this example, you must provide a valid username and password.
 *
 *  Dependencies:
 *		Use NPM to install request library 
 *
 * 	Command line examples:
 * 		node ricSearch.js
 * ====================================================================
 */


'use strict';
const request = require("request");

// wrap the requests module in a promise
const pSendRequest = function (httpOptions) {
    return new Promise((resolve, reject) => {
        request.post(httpOptions, function (error, response, body) {
            if (!error && response.statusCode == 200)
                resolve(JSON.parse(body));
            else {
                if (error)
                    reject(error);
                else if (body)
                    reject(body);
                else
                    reject(`Request failed, status code: ${response.statusCode} - ${response.statusMessage}`);
            }
        });
    });
};


// send authentication request
const authenticate = function (userName, password) {
    const authMsg = {
        Credentials: {
            Username: userName,
            Password: password
        }
    };

    const opt = {
        url: "https://selectapi.datascope.refinitiv.com/RestApi/v1/Authentication/RequestToken",
        headers: {
            Prefer: "respond-async",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authMsg)
    };

    return pSendRequest(opt)
        .then(resp => resp.value);
};


// send RIC search request
const ricSearch = function (token, ric) {

    const searchMsg = {
        SearchRequest: {
            InstrumentTypeGroups: [
                "CollatetizedMortgageObligations",
                "Commodities",
                "Equities",
                "FuturesAndOptions",
                "GovCorp",
                "MortgageBackedSecurities",
                "Money",
                "Municipals",
                "Funds"
            ],
            IdentifierType: "Ric",
            Identifier: ric,
            PreferredIdentifierType: "Ric"
        }
    };

    const opt = {
        url: "https://selectapi.datascope.refinitiv.com/RestApi/v1/Search/InstrumentSearch",
        headers: {
            Authorization: "Token " + token,
            Prefer: "respond-async",
            "Content-Type": "application/json; odata=minimalmetadata"
        },
        body: JSON.stringify(searchMsg)
    };

    return pSendRequest(opt);
};





const username = "****";
const password = "****";
const itemName = "US10YT=RRPS";

authenticate(username, password)
    .then(token => ricSearch(token, itemName))
    .then(jsonMsg => console.log(`Received search response for [${itemName}]: ${JSON.stringify(jsonMsg, null, " ")}`))
    .catch(err => console.log("Received error: ", err));

