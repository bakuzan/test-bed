import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutocompleteInput from '../autocomplete-input/autocomplete-input'
import {Enums, Icons} from '../../constants/values'
import './chip-list-input.css'

class ChipListInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      [props.attr]: '',
      readyRemoval: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(this);
  }

  selectAutocompleteSuggestion(id) {
    const item = this.props.series.find(x => x.id === id);
    console.log(item);
  }

  persistListState(list) {
    this.props.updateChipList(this.props.attr, list);
    this.setStateRemoval(false);
  }

  updateList(item) {
    const list = [...this.props.chipsSelected, item];
    this.persistListState(list);
  }

  addInputItem() {
    const activeSuggestion = this.props.chipOptions[this.state.activeSuggestion];
    if (activeSuggestion) return this.selectTypeaheadEntry(activeSuggestion._id);
  }

  selectTypeaheadEntry(id) {
    const item = this.props.chipOptions.find(x => x._id === id);
    this.updateList(item);
    this.setState({ [this.props.attr]: '' });
  }

  removeInputItem(name) {
    const list = this.props.chipsSelected.filter(x => x[this.props.attr] !== name);
    this.persistListState(list);
  }

  removeLastInputItem() {
    const list = this.props.chipsSelected.slice(0, this.props.chipsSelected.length - 1);
    this.persistListState(list);
  }

  setStateRemoval(value) {
    this.setState({ readyRemoval: value });
  }

  handleUserInput(event) {
    const { value } = event.target;
    this.setState({ [this.props.attr]: value.toLowerCase(), readyRemoval: false })
  }

  handleKeyDown(event) {
    const { keyCode } = event;
    if (keyCode === Enums.keyCode.enter && this.state.text) {
      event.preventDefault();
      this.addInputItem();
    } else if (keyCode === Enums.keyCode.backspace && !this.state.text) {
      if (!this.state.readyRemoval) return this.setStateRemoval(true);
      if (this.state.readyRemoval) return this.removeLastInputItem();
    }
  }

  render() {
    const { attr, name, chipsSelected, chipOptions, updateChipList } = this.props;
    // console.log('%c input list => ', 'font-weight: bold; font-size: 18px', list);
    const chips = chipOptions.filter(x => x !== undefined).map((item, index, array) => {
      const readyRemoval = this.state.readyRemoval && index === array.length - 1;
      return (
        <span key={index} className={`input-chip input-chip-deletable${readyRemoval ? ' active' : ''}`}>
          <span className="input-chip-text">{ item.name }</span>
          <button type="button"
                  className="button-icon small input-chip-delete"
                  title="remove"
                  icon={Icons.cross}
                  onClick={() => this.removeInputItem(item.name)}
            ></button>
        </span>
      );
    });
    const hasChips = chips.length > 0;
    // const hasAutoComplete = chipOptions.length > 0;

    return (
      <div className="chip-list-input-container">
        <AutocompleteInput
          attr={attr}
          items={chipOptions}
          filter={this.state[attr]}
          onChange={this.handleUserInput}
          onSelect={this.selectAutocompleteSuggestion}
        />
        {
          !!hasChips &&
          <div className="list">
          { chips }
          </div>
        }
      </div>
    );
  }
}

ChipListInput.propTypes = {
  attr: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  chipsSelected: PropTypes.arrayOf(PropTypes.object).isRequired,
  chipOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateChipList: PropTypes.func.isRequired
}

export default ChipListInput

// <div className="input-list-container has-float-label input-container">
//   <div className="input-list-wrapper">
//     <input
//       className="flex-all"
//       type="text"
//       name={name}
//       value={this.state.text}
//       placeholder={placeholder}
//       onChange={(e) => this.handleText(e)}
//       onKeyDown={(e) => this.handleKeyDown(e)}
//       />
//     <label className={`${hasInputs ? 'input-has-content' : ''}`}>
//       { label }
//     </label>
//     {
//       hasInputs &&
//       <div className="list">
//         { inputList }
//       </div>
//     }
//   </div>
//   {
//     hasAutoComplete &&
//       <ul className="autocomplete-menu">
//         {
//           autoCompleteList.map((item, index) => {
//             const activeSuggestion = this.state.activeSuggestion === index ? ' active' : '';
//             return (
//               <li key={item._id}
//                 className={`autocomplete-suggestion${activeSuggestion}`}>
//                 <button type="button"
//                   className="button ripple"
//                   onClick={() => this.selectTypeaheadEntry(item._id)}>
//                   { this.highlightMatch(item.name) }
//                 </button>
//               </li>
//             );
//           })
//         }
//       </ul>
//   }
// </div>
