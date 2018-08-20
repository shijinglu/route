import React, {Component} from 'react';
import './App.css';
import storeCoords from './data/StoreCoords'
import storePaths from './data/WarehouseData'
import dotenv from 'dotenv'

import Map from './components/Map'

class App extends Component {
    constructor(props) {
        super(props);
        dotenv.load();
    }

    submit() {

    }

    render() {
        return (
            <div className="Awesome App Name ">
                <header className="App-header">
                    <h1 className="App-title">My Super Awesome App</h1>
                </header>
                <button className="square" onClick={this.submit}>
                    {this.props.value}
                </button>
                <Map markers={storeCoords} paths={storePaths}/>,
                document.getElementById('map')
            </div>
        );
    }
}

export default App;
