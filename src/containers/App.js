import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroller from '../components/Scroller';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }
    
    render() {
        const {searchField, robots} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return !robots.length ? <h1 className = 'tc'>Loading</h1> :
                (
                <div className = 'tc'>
                    <h1 className = 'f1'>Robomance</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <ErrorBoundry>
                       <Scroller>
                            <CardList robots = {filteredRobots}/>
                        </Scroller> 
                    </ErrorBoundry>                    
                </div>
                );       
    }    
}

export default App;