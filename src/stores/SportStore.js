import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class SportStore extends EventEmitter {
    constructor() {
        super()
        this.loading = false;
        this.sportData = null;
        this.showError = false;
        this.errorMessage = '';
    }


    handleActions(action) {
        switch (action.type) {
            case 'FETCH_SPORT': {
                this.loading = true;
                this.showError = false;
                this.emit('change');
                break;
            }

            case 'RECEIVED_SPORT': {
                this.loading = false;
                this.showError = false;
                this.sportData = action.data;
                this.emit('change');
                break;
            }

            case 'FETCH_SPORT_ERROR': {
                this.loading = false;
                this.showError = true;
                this.errorMessage = 'Please check your internet connectivity and try again!';
                this.emit('change');
                break;
            }


        }
    }
}


const sportStore = new SportStore;
dispatcher.register(sportStore.handleActions.bind(sportStore));
window.dispatcher = dispatcher;

export default sportStore;