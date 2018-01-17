import React, { Component, ReactPropTypes } from 'react';
import Modal from 'react-modal';
import { CSSTransitionGroup } from 'react-transition-group';
import { BarLoader } from 'react-spinners';
import sportStore from './stores/SportStore';
import * as SportActions from './actions/sportActions';
import 'normalize.css';
import 'styles/index.scss';


export default class Sport extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sportData: null,
      loading: false,
      showError: false,
      errorMessage: '',
      isModalActive: false
    };
  }

  storeChanged() {
    this.setState({
      sportData: sportStore.sportData,
      loading: sportStore.loading,
      showError: sportStore.showError,
      errorMessage: sportStore.errorMessage
    });


  }

  bookSport = () => {
    // send request to the server with user data

    this.setState({
      isModalActive: !this.state.isModalActive
    })
  }

  componentWillMount() {
    sportStore.on('change', this.storeChanged.bind(this));
    SportActions.fetchData();
    Modal.setAppElement('body');
  }

  componentWillUnmount() {
    sportStore.removeListener('change', this.storeChanged);
  }

  render() {

    const { loading, showError, errorMessage, sportData } = this.state;
    let content = null;





    if (loading) {
      content = <div className='loading' >
        {/* show loader here */}

        <BarLoader
          color={'#FFFFFF'}
          loading={this.state.loading}
        />
      </div>
    } else {
      if (showError) {
        content = <div>
          <h2>{errorMessage}</h2>
        </div>
      } else {
        const { name, description, infoBox, imageFile } = sportData;

        var bgStyle = {
          backgroundImage: 'url(' + imageFile.url + ')',
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          width: '100%'
        }

        var modalStyle = {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          },
          content: {
            background: '#d3d3d3',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            outline: 'none',
            padding: '20px',
            height: '%50%',
            width: 'auto',

          }
        }

        content = <div>
          <div style={bgStyle} className='bg' >

            <div className='my-clubs'> <h2 className='my' >my<span className='clubs' >clubs<span className='trade-mark'>&trade;</span></span></h2></div>

            <div className='header-wrapper' >
              <h1 className='sport-name' >{name}</h1>
              <p className='sport-description' >{description}</p>
            </div>

          </div>

          <div className='sport-book-section' >
            <span className='info-box' >{infoBox}</span><button className='sport-book-button' onClick={this.bookSport} >Book Now</button>
          </div>
        </div>
      }
    }

    return (
      <div className='conatiner' >
        {content}
        <Modal
          isOpen={this.state.isModalActive}
          onRequestClose={this.bookSport}
          style={modalStyle}
          className='modal'
        >
          <h1 className='congratulation' >Congratulations</h1>
          <p className='message' >You have sucessfully booked!</p>
          <button className='ok-button' onClick={this.bookSport} >OK</button>
        </Modal>
      </div>

    );
  }
}

