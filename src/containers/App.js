import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll.js";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
                robots: [],
                searchField: '',
            }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots : users}));
    }
    
    onsSearchChange = (event) => {
        this.setState({ searchField : event.target.value,
        });
    }

    render() {
        const {robots, searchField} = this.state;
        const filteredRobots = 
            robots.filter(
                robot => robot.name.toLowerCase().includes(searchField.toLowerCase())
                );

        return !robots.length ?
            <h1>Loading</h1> :
                (
                    <div className="tc">
                        <h1>Robo friends</h1>
                        <SearchBox searchChange={this.onsSearchChange}/>
                        <Scroll>
                            <CardList robots={filteredRobots} />
                        </Scroll>
                    </div>
                );
    }
}

export default App;