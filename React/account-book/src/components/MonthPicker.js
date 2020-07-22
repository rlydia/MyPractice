import React from 'react'
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'

class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year
    }
  }
  // componentDidMount() {   // 监听全局的click --------------------------
  //   document.addEventListener('click', this.toggleUp)
  // }
  // toggleUp = (event) => {   // 点击后 菜单收起
  //   event.preventDefault()
  //   this.setState({
  //     isOpen: false
  //   })
  // }

  // stopPropagation(e) {  // 阻断冒泡的方法
  //   e.nativeEvent.stopImmediatePropagation()
  // }

  componentDidMount() {
    // 第三个参数 表冒泡
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }
  handleClick = (event) => {
    // 在按钮日期选择器中click不会使其下拉菜单关闭
    if (this.node.contains(event.target)) {
      return;
    }
    this.setState({
      isOpen: false,
    })
  }

  toggleDropdown = (event) => {  // 用这种方式this就不用手动绑定
    event.preventDefault()
    // this.stopPropagation(event)  // 阻断冒泡
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  selectYear = (event, yearNumber) => {
    event.preventDefault()
    // this.stopPropagation(event)  // 阻断冒泡
    this.setState({
      selectedYear: yearNumber
    })
  }
  selectMonth = (event, monthNumber) => {
    event.preventDefault()
    // this.stopPropagation(event)   // 阻断冒泡
    this.setState({
      isOpen: false
    })
    this.props.onChange(this.state.selectedYear, monthNumber)
  }

  render() {
    const { year, month } = this.props
    const { isOpen, selectedYear } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(number => number + year)
    return (
      // ref接收一个回调函数，拿到dom节点
      <div className="dropdown month-picker-component" ref={(ref) => {this.node = ref}}>
        <div>选择月份</div>
        <button 
          className="btn btn-sm btn-secondary dropdown-toggle"
          onClick = {this.toggleDropdown}
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        { isOpen && 
          <div className="dropdown-menu" style={{display: 'block'}}>
            <div className="row">
              <div className="col border-right years-range">
                {yearRange.map((yearNumber, index) => 
                  <a key={index}
                    href="/#"
                    onClick={(event) => {this.selectYear(event, yearNumber)}}
                    className={(yearNumber === selectedYear) ? 'dropdown-item active' : 'dropdown-item'}>
                    {yearNumber} 年
                  </a>
                )}
              </div>
              <div className="col months-range">
                {monthRange.map((monthNumber, index) => 
                  <a key={index}
                    href="/#"
                    onClick={(event) => {this.selectMonth(event, monthNumber)}}
                    className={(monthNumber === month) ? 'dropdown-item active' : 'dropdown-item'}>
                    {padLeft(monthNumber)} 月
                  </a>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default MonthPicker;