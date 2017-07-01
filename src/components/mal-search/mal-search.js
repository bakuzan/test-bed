import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AutocompleteInput from '../autocomplete-input/autocomplete-input'
import {debounce, getTimeoutSeconds} from '../../utils/common'

const searchMyAnimeList = type => search => {

}

class MalSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      results: []
    }

    this.query = searchMyAnimeList(props.type);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(this);
  }

  selectAutocompleteSuggestion(selectedId) {
    const item = this.state.results.find(x => x.id === selectedId);
    this.props.selectMalItem(item);
  }

  handleUserInput(event) {
    this.setState({ title: event.target.value });
    debounce(this.query(this.state.title), getTimeoutSeconds(1.5));
  }

  render() {

    return (
      <div className="mal-search-container">
        <AutocompleteInput
          attr="title"
          items={this.state.results}
          filter={this.state.title}
          onChange={this.handleUserInput}
          onSelect={this.selectAutocompleteSuggestion}
        />
      </div>
    );
  }
}

MalSearch.propTypes = {
  type: PropTypes.string.isRequired,
  selectMalItem: PropTypes.func.isRequired
}

export default MalSearch
