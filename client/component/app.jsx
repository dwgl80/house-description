import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DescriptionTitle from './description-title.jsx';
import Highlights from './highlights.jsx';
import DescriptionBody from './description-body.jsx';
import Amenities from './amenities.jsx';



class App extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      info: {},
      modal: false,
      showDescription: false
    }
    this.grabData = this.grabData.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  componentDidMount() {
    this.grabData();
  }

  handleInfo(results) {
    this.setState({
      info: results
    })
  }

  grabData() {
    let id = window.location.pathname.slice(8);
    id = parseInt(id.substring(0, id.length))
    axios.get(`/house/${id}`)
      .then( response => {
        console.log('data in client', response.data);
        this.handleInfo(response.data);
      })
      .catch( error => {
        console.log(error);
    })
  }


  toggleDescription() {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  togglePopup() {
    this.setState({
      modal: !this.state.modal
    })
  }




  render() {
  	return (
      <div className='main-app'>
        <DescriptionTitle info={this.state.info} />
        <DescriptionBody info={this.state.info} toggleDescription={this.toggleDescription} show={this.state.showDescription} />
        <Highlights info={this.state.info} />
        <Amenities info={this.state.info} togglePopup={this.togglePopup} modal={this.state.modal} />
      </div>
  	);
  }
}


ReactDOM.render(<App />, document.getElementById('app'));