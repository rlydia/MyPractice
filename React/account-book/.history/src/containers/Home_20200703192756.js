import React, { Component } from 'react';
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME,TYPE_OUTCOME } from '../utility'
import { withRouter } from 'react-router-dom'
import Ionicon from 'react-ionicons'
import withContext from '../WithContext'
import PriceList from '../components/PriceList'
import TotalPrice from '../components/TotalPrice'
// import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import {Tab, Tabs} from '../components/Tabs'
import Loader from '../components/Loader'
import PieChart from '../components/PieChart'
// import { PieChart, Pie, Tooltip, Cell } from 'recharts'
/*
  export const categories = {
    "1": {
      "id": "1",
      "name": "旅行",
      "type": "outcome",
      "iconName": "ios-plane"
    },
    "2": {
      "id": "2",
      "name": "旅行",
      "type": "income",
      "iconName": "logo-yen"
    }
  }
  export const items =[
    {
      "id": 1,
      "title": "去云南旅行",
      "price": 200,
      "data": "2020-04-18",
      "cid": 1 
    },
    {
      "id": 2,
      "title": "去云南旅行",
      "price": 2000,
      "data": "2020-06-18",
      "cid": 1
    },
    {
      "id": 3,
      "title": "工资",
      "price": 40000,
      "data": "2020-05-29",
      "cid": 2
    },
    {
      "id": 4,
      "title": "工资",
      "price": 1000,
      "data": "2020-06-29",
      "cid": 2
    }
  ]

  export const newItem = {  // 先写死
    "id": 5,
    "title": "新添加的项目",
    "price": 300,
    "data": "2020-06-10",
    "cid": 1
  }
  */


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
  // return categoryMap   
  // return Object.keys(categoryMap).map(mapKey => {  // 将object转为array 
  //   return { ...categoryMap[mapKey] }
  // })
  return Object.keys(categoryMap).map(mapKey => (
    { ...categoryMap[mapKey], name: categoryMap[mapKey].category.name }
    ))
}

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // items,
      // currentDate: parseToYearAndMonth('2020/06/05'),
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
  // 根据year与month会改变当前显示的账目
  /*
    changeDate = (selectedYear, selectedMonth) => {
      this.setState({
        currentDate: { 
          year: selectedYear, 
          month: selectedMonth 
        }
      })
    }
  */
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
  }
  /*
    createItem = () => {  // 先写死
      this.setState({
        items: [newItem, ...this.state.items]
      })
    }
    modifyItem = (modifyItem) => {  // 先写死
      const modifyItems = this.state.items.map(item => {
        if (item.id === modifyItem.id) {
          // 后面的title覆盖前面的内容
          return { ...item, title: '更新后的标题'}
        } else {
          return item
        }
      })
      this.setState({
        items: modifyItems
      })
    }
    deleteItem = (deletedItem) => {
      // 方法一：
      // this.state.items.splice(deletedItem.id - 1, 1)
      // this.setState({
      //   items
      // })
      // 方法二：
      // 使用数组的函数来实现delete效果：filter函数
      const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id)
      this.setState({
        items: filteredItems
      })
    }
  */
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
    /*
      const itemsWithCategory = Object.keys(items).map(id => {
        items[id].category = categories[items[id].cid]
        return items[id]
      }).filter(item => {  // filter出当前选择月份的信息
        return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
      })
      */
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