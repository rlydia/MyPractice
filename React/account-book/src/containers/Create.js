import React from 'react'
import { withRouter } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
import { Tabs, Tab } from '../components/Tabs'
import PriceForm from '../components/PriceForm'
// import { testCategories } from '../testData'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import withContext from '../WithContext'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
export class CreatePage extends React.Component {
  constructor(props) {
    super(props)
    const { id } = props.match.params
    const { categories, items } = props.data
    this.state = {
      selectedTab: (id && items[id])? categories[items[id].cid].type : TYPE_OUTCOME,
      selectedCategory: (id && items[id])? categories[items[id].cid]: null,
    }
    // console.log(this.state.selectedTab)
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.actions.getEditData(id).then(data => {
      const { editItem, categories } = data
      this.setState({
        selectedTab: (id && editItem)? categories[editItem.cid].type : TYPE_OUTCOME,
        selectedCategory: (id && editItem)? categories[editItem.cid]: null,
      })
    })
  }
  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index]
    })
  }
  selectCategory = (category) => {
    this.setState({
      selectedCategory: category
    })
  }
  cancelSubmit = (index) => {
    this.props.history.push('/')
  }
  submitForm = (data, isEditMode) => {
    if (!isEditMode) {
      // create
      this.props.actions.createItem(data, this.state.selectedCategory.id).then(() => {
        this.props.history.push('/')
      })
    } else {
      // update
      this.props.actions.updateItem(data, this.state.selectedCategory.id).then(() => {
        this.props.history.push('/')
      })
    }
    // this.props.history.push('/')
  }
  render() {
    const { data } = this.props
    const { items, categories } = data
    const { id } = this.props.match.params
    const editItem = (id && items[id]) ? items[id] : {}
    const { selectedTab, selectedCategory } = this.state
    // const filterCategories = testCategories.filter(category => category.type === TYPE_OUTCOME)
    const filterCategories = Object.keys(categories)
      .filter(id => categories[id].type === selectedTab)
      .map(id => categories[id])
    const tabIndex = tabsText.findIndex(text => text === selectedTab)
    return (
      <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fff'}}>
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect 
          categories={filterCategories} 
          onSelectCategory={this.selectCategory} 
          selectedCategory={selectedCategory}
        />
        <PriceForm 
          onFormSubmit={this.submitForm}
          onCancelSubmit={this.cancelSubmit}
          selectedCategory={selectedCategory}
          item = { editItem }
        />
      </div>
    )
  }
}

export default withRouter(withContext(CreatePage))