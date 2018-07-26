import {API_KEY, SERVER, REQUEST_MAPPING} from './NewsURI';

export class NewsAPI {

    static async getAllSources(){
        return await fetch(SERVER+REQUEST_MAPPING.SOURCES+"?apiKey="+API_KEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        });
    }

    static async getEveryNewsOnSource(sourceId) {
        return await fetch(SERVER+REQUEST_MAPPING.EVERYTHING+"?sources="+sourceId+"&apiKey="+API_KEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        });
    }
}