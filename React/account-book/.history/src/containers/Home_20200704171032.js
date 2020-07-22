import React, { Component } from 'react';
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME,TYPE_OUTCOME } from '../utility'
import { withRouter } from 'react-router-dom'
import Ionicon from 'react-ionicons'
import withContext from '../WithContext'
import PriceList from '../components/PriceList'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import {Tab, Tabs} from '../components/Tabs'
import Loader from '../components/Loader'
import PieChart from '../components/PieChart'

const tabsText = [LIST_VIEW, CHART_VIEW]
const generateChartDataByCategory = (items, type = TYPE_OUTCOME) => {
  let categoryMap = { }
  items.filter(item => item.category.type === type).forEach((item) => {
    if (categoryMap[item.cid]) {
      categoryMap[item.cid].value += (item.price * 1)
      // categoryMap[item.cid].items.push(item.id)
      categoryMap[item.cid].items = [...categoryMap[item.cid].items, item.id]
    } else {
      categoryMap[item.cid] = {
        category: item.category,
        value: item.price * 1,
        items: [item.id]
      }
    }
  })
  return Object.keys(categoryMap).map(mapKey => (
    { ...categoryMap[mapKey], name: categoryMap[mapKey].category.name }
    ))
}

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: tabsText[0],
    }
  }
  // 在Home中添加一个钩子函数：
  componentDidMount() {
    this.props.actions.getInitalData()
  }
  changeView = (index) => {
    this.setState({
      tabView: tabsText[index],
    })
  }
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
  }
  createItem = () => {
    this.props.history.push('/create')
  }
  modifyItem = (item) => {
    this.props.history.push(`/edit/${item.id}`)
  }
  deleteItem = (item) => {
    this.props.actions.deleteItem(item)
  }

  render() {
    const { data } = this.props
    const { items, categories, currentDate, isLoading} = data
    const { tabView } = this.state
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })
    const chartOutcomDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME)
    const chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME)
    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_INCOME) {
        totalIncome += item.price
      } else {
        totalOutcome += item.price
      }
    })

    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row mb-4 title">Account Book</div>
          <div className="row">
            <div className="col">
              <MonthPicker 
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice
                className="Total-price"
                income={totalIncome}
                outcome={totalOutcome}
              />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChange={this.changeView}>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={'#007bff'}
                icon='ios-paper'
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={'#007bff'}
                icon='ios-pie'
              />
              图表模式
            </Tab>
          </Tabs>
          {/* <ViewTab 
            activeTab= {tabView}
            onTabChange = {this.changeView}
          /> */}
          <CreateBtn onClick={this.createItem} />
          { isLoading && 
            <Loader />
          }
          { !isLoading &&
            <>
            { tabView === LIST_VIEW &&
              <PriceList 
              items = {itemsWithCategory}
              onModifyItem = {this.modifyItem}
              onDeleteItem = {this.deleteItem}
              />
            }
            { tabView === CHART_VIEW &&
              <>
                <PieChart title="本月支出" categoryData={chartOutcomDataByCategory} />
                <PieChart title="本月收入" categoryData={chartIncomeDataByCategory} />
              </>
            }
            </>
          }
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withContext(Home))