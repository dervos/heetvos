import React from 'react'
//import { PageHeader } from 'rebass'

export class Picker extends React.Component {
  static propTypes = {
    options: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    ).isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  render() {
    const { value, onChange, options } = this.props

    return (
      <span>
        <h3>{value}</h3>
        <select onChange={e => onChange(e.target.value)}
          value={value}>
          {options.map(option =>
                       <option value={option} key={option}>
                         {option}
                       </option>)
          }
        </select>
      </span>
    )
  }
}

