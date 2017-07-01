import React from 'react'
import PropTypes from 'prop-types'
import {Icons} from '../../constants/values'
import './clearable-input.css'

const ClearableInput = ({ name = "search", label = "search", value, maxLength, onChange, onKeyDown }) => (
  <div className="has-float-label input-container clearable-input">
    <input
      type="text"
      name={name}
      placeholder=" "
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoComplete="off"
      />
    <label>{ label }</label>
    {
      !!value &&
      <button
        type="button"
        className="button-icon small clear-input"
        icon={Icons.cross}
        onClick={() => onChange({ target: { name, value: '' } })}
        >
      </button>
    }
    {
      !!maxLength &&
      <span className="clearable-input-count">
      { `${value.length}/${maxLength}` }
      </span>
    }
  </div>
);

ClearableInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func
}

export default ClearableInput
