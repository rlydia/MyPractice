import React from 'react'
import PropTypes from 'prop-types'

const TotalPrice = ({income, outcome}) => (
  <div className='TotalPriceWrapper row'>
    <div className="col">
      <div className="income">收入: <span>{income}</span></div>
    </div>
    <div className="col">
      <div className="outcome">支出: <span>{outcome}</span></div>
    </div>
  </div>
)

TotalPrice.propTypes = {
  income: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired
}
export default TotalPrice