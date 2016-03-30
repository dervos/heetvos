import React, { PropTypes } from 'react'
import { Select } from 'rebass'

const Picker = ({ value, onChange, options }) => (
  <span>
    <Select
      label="Select"
      name={value}
      onChange={event => onChange(event.target.value)}
      options={options}
    />
  </span>
)
Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
