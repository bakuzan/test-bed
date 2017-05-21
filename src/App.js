import React, { Component } from 'react';
import ChipListInput from './components/chip-list-input/chip-list-input'
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      selected: [],
      tags: [
        { id: 0, name: 'action' },
        { id: 1, name: 'adventure' },
        { id: 2, name: 'comedy' },
      ],
      series: [
        { id: 0, title: 'gotham' },
        { id: 2, title: 'the flash' },
        { id: 3, title: 'arrow' },
      ]
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(this);
  }

  selectAutocompleteSuggestion(id) {
    const item = this.state.series.find(x => x.id === id);
    console.log(item);
  }

  handleListUpdate(name, value) {
    this.setState({ [name]: value });
  }

  handleUserInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    console.log('APP RENDER > ', this.state);
    return (
      <div className="App center-contents">
        <ChipListInput
          attr="title"
          name="selected"
          chipsSelected={this.state.selected}
          chipOptions={this.state.series}
          updateChipList={this.handleListUpdate}
        />
      </div>
    );
  }
}

export default App
