import {API_KEY, SERVER, REQUEST_MAPPING} from './NewsURI';
import {NOTIFICATION} from './notification';

export class NewsAPI {

    static async getAllSources(){
        return await fetch(SERVER+REQUEST_MAPPING.SOURCES+"?apiKey="+API_KEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status == 200) {
                return response.json();
            }else {
                return Promise.reject(response.status);
            }
        });
    }

    static async getEveryNewsOnSource(sourceId, query) {
        return await fetch(SERVER+REQUEST_MAPPING.EVERYTHING+"?q="+query+"&sources="+sourceId+"&apiKey="+API_KEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status == 200) {
                return response.json();
            }else {
                return Promise.reject(response.status);
            }
        });
    }

    static getErrorMessage(error) {
        if(error == "400") {
            return NOTIFICATION.error400;
        }else if(error == "401"){
            return NOTIFICATION.error401;
        }else if(error == "429"){
            return NOTIFICATION.error429;
        }else if(error == "500"){
            return NOTIFICATION.error500;
        }else {
            return NOTIFICATION.noInternet;
        }
    }
}