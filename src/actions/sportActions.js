import dispatcher from '../dispatcher';
import axios from 'axios';

export function fetchData() {

    dispatcher.dispatch({
        type: 'FETCH_SPORT'
    })

    axios.get('https://frontend-challenge-190ff.firebaseio.com/activities/coding-activity.json')
        .then((response) => {
            dispatcher.dispatch({
                type: 'RECEIVED_SPORT',
                data: response.data
            })
        })
        .catch((error) => {
            dispatcher.dispatch({
                type: 'FETCH_SPORT_ERROR',
                data: error
            })
        });
}