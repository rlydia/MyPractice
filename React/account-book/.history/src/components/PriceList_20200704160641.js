import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

// 函数型组件
const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group list-group-flush">
      {
        items.map((item) => (
          <li className="list-group-item d-flex justify-content-between align-items-center"
          key={item.id}
          >
            <span className="col-1 badge badge-primary">
              <Ionicon
                fontSize="30px"
                style={{ backgroundColor: '#007bff', padding: '5px'}}
                color={'#fff'}
                icon={item.category.iconName}
              />
            </span>
            <span className="col-5 itemTitle">{item.title}</span>
            <span className="col-2 font-weight-bold itemPrice">
              {(item.category.type === 'income') ? '+' : '-'}
              {item.price}元
            </span>
            <span className="col-2 itemData">
              {item.date}
            </span>
            <a className="col-1" href="/#"
              onClick={(event) => {event.preventDefault(); onModifyItem(item)}}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#28a745', padding: '5px'}}
                color={'#fff'}
                icon='ios-create-outline'
              />
            </a>
            <a className="col-1" href="/#"
              onClick={(event) => {event.preventDefault(); onDeleteItem(item)}}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#dc3545', padding: '5px'}}
                color={'#fff'}
                icon='ios-close'
              />
            </a>
          </li>
        ))
      }
    </ul>
  )
}

PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}

PriceList.defaultProps = {
  // 给onModifyItem添加一个默认属性，即使父组件没有传入这个属性也不会报错
  onModifyItem: () => {}
}

export default PriceList