import { api_calln,api_call, api_call_token } from "./Network";
import { debuglog } from "./Utils";
import { Link } from "react-router-dom";

const debug = true;

function getBaseItems(url, config = null) {             // function to get all list elements base items as well as notes anyu api that gives list in response.data.data
    let _link = "src/utils/GeneralApiCalls.js/getBaseItems"

    return new Promise((resolve, reject) => {
        let request = null

        if (config) {        // check if config is provided  

            // debuglog(debug, "config provided ", Link)
            request = api_call_token.get(url, config)
        }
        else {
            debuglog(debug, "config not provided ", Link)
            request = api_call_token.get(url)
        }

        request   // make request
            .then(response => {
                // debuglog(debug, "The getBaseItems general base response is ", response);
                try {

                    if (response) {   // check if response is present

                        if (response.status === 200 && Array.isArray(response.data.data)) {  // check if status is 200 and data is array list 
                            resolve(response.data.data);    // resolve with data 
                        }
                        else {
                            console.error(`Invaild response received for ${url}.Response Data is not an array in .` + _link);
                            reject({ error: null, response: response, message: 'Invaild response received.Data is not an array.' });  // reject with error
                        }

                    }

                    else {

                        console.error(`Not response received for ${url} in .` + _link);
                        reject({ error: null, response: null, message: 'There was no response.' });
                    }
                }
                catch (error) {

                    console.error("The request was sucessfull, There was an error in processing the response in " + _link);
                    reject({ error: null, response: null, message: "The request was sucessfull, There was an error in processing the response in" + _link })
                }
            })
            .catch(error => {
                console.error("There was an error getting the base item for " + url, error, error.response);
                let error_object = { error: null, response: null, message: "There was an error." }
                if (error.response) {
                    switch (error.response.status) {   // check error 

                        case 403:

                            try {
                                error_object.message = error.response.data.error.message;
                                error_object.response = error.response;
                                error_object.error = error;
                            }
                            catch (error) {
                                error_object.message = "There was an error processing the error response." + _link;

                                reject(error_object);
                            }

                            break;
                        case 404:
                            error_object.message = "Not Found";
                            break;
                        default:
                    }

                }
                reject(error_object);   // reject with erro details and message 

            })
    })


}


const getBaseItemsLists = async (items=[]) => {

    let promises_array = items.map(item=>getBaseItems(`/base/${item}/`));

    return Promise.all(promises_array)
        .then(data => {
            let data_object = {}

            items.forEach((item,idx) => data_object[item] = data[idx])
            return {
                status: true,
                data: data_object
            }
        })
        .catch(error => {
            return {
                status:false,
                error
            }
        })

}


const getItems = async (items={},logdin = false) => {

    let promises_array = Object.values(items).map(item=>getBaseItems(item.url, logdin?{}:null));

    return Promise.all(promises_array)
        .then(data => {
            let data_object = {}

            Object.keys(items).forEach((item,idx) => data_object[item] = data[idx])
            return {
                status: true,
                data: data_object
            }
        })
        .catch(error => {
            return {
                status:false,
                error
            }
        })

}

export { getBaseItems, getBaseItemsLists,getItems };