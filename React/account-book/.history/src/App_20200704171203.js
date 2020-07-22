import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Home from './containers/Home'
import Create from './containers/Create'
// import { testCategories, testItems } from './testData'
import { flatternArr, ID, parseToYearAndMonth, padLeft } from './utility'


export const AppContext = React.createContext()
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // items: flatternArr(testItems),
      // categories: flatternArr(testCategories)
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth('2020/06/05')
    }
    const withLoading = (cb) => {
      // 返回一个function
      return (...arg) => {
        this.setState({
          isLoading: true
        })
        return cb(...arg)
      }
    }
    this.actions = {
      // async await改造异步流程
      getInitalData: withLoading(async () => {
        const { currentDate } = this.state
        // 筛选条件- json server提供的
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${padLeft(currentDate.month)}&_sort=timestamp&_order=desc`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])
        const [ categories, items ] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false
        })
        return results
      }),
      getEditData: withLoading(async (id) => {
        const { items, categories } = this.state
        // let promiseArr = [axios.get('/categories')]
        let promiseArr = []
        if (Object.keys(categories).length === 0) {   // 若没有被加载过
          promiseArr.push(axios.get('/categories'))
        }
        const itemAlreadyFeched = (Object.keys(items).indexOf(id) > -1)  // 某个id已经被首页getInitalData加载过
        if (id && !itemAlreadyFeched) {  // 若id存在(为编辑页面)，且没被加载过
          const getURLWithID = `/items/${id}`
          promiseArr.push(axios.get(getURLWithID))
        }
        const [ fetchedCategories, editItem ] = await Promise.all(promiseArr)
        // 若已经被加载过/已存在，直接取categories和items[id]
        const finalCategories = fetchedCategories ? flatternArr(fetchedCategories.data) : categories
        const finalItem = editItem ? editItem.data : items[id]
        if (id) {
          this.setState({  
            categories: finalCategories,
            isLoading: false,
            items: { ...this.state.items, [id]: finalItem }
          })
        } else {
          this.setState({
            categories: finalCategories,
            isLoading: false
          })
        }
        return {
          categories: finalCategories,
          editItem: finalItem,
        }
      }),
      selectNewMonth: withLoading(async (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${padLeft(month)}&_sort=timestamp&_order=desc`
        const items = await  axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: { year, month },
          isLoading: false
        })
        return items
      }),
      deleteItem: withLoading(async (item) => {
        const deleteItem = await axios.delete(`/items/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items,
          isLoading: false
        })
        return deleteItem
      }),
      createItem: withLoading(async (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${padLeft(parsedDate.month)}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', { ...data, id: newId, cid: categoryId })
        this.setState({
          items: { ...this.state.items, [newId]: newItem.data },
          isLoading: false
        })
        return newItem.data
      }),
      updateItem: withLoading(async (item, updatedCategoryId) => {
        delete item.category
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        const updatedItem = await axios.put(`/items/${modifiedItem.id}`, modifiedItem)
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
          isLoading: false,
        })
        return updatedItem.data
      })

      /*
        // promise的写法：
        getInitalData: () => {
          this.setState({
            isLoading: true
          })
          const { currentDate } = this.state
          // console.log(currentDate.year,currentDate.month)
          // 筛选条件- json server提供的
          const getURLWithData = `/items?monthCategory=${currentDate.year}-${padLeft(currentDate.month)}&_sort=timestamp&_order=desc`
          const promiseArr = [axios.get('/categories'), axios.get(getURLWithData)]
          Promise.all(promiseArr).then(arr => {
            const [ categories, items ] = arr
            this.setState({
              items: flatternArr(items.data),
              categories: flatternArr(categories.data),
              isLoading: false
            })
          })
        },
        selectNewMonth: (year, month) => {
          const getURLWithData = `/items?monthCategory=${year}-${padLeft(month)}&_sort=timestamp&_order=desc`
          axios.get(getURLWithData).then(items => {
            this.setState({
              items: flatternArr(items.data),
              currentDate: { year, month }
            })
          })
        },
        deleteItem: (item) => {
          axios.delete(`/items/${item.id}`).then(() => {
            delete this.state.items[item.id]
            this.setState({
              items: this.state.items
            })
          })
        },
        createItem: (data, categoryId) => {
          const newId = ID()
          const parsedDate = parseToYearAndMonth(data.date)
          data.monthCategory = `${parsedDate.year}-${padLeft(parsedDate.month)}`
          data.timestamp = new Date(data.date).getTime()
          axios.post('/items', { ...data, id: newId, cid: categoryId }).then(newItem => {
            this.setState({
              items: { ...this.state.items, [newId]: newItem.data },
            })
          })
        },
        updateItem: (item, updatedCategoryId) => {
          delete item.category
          const modifiedItem = {
            ...item,
            cid: updatedCategoryId,
            timestamp: new Date(item.date).getTime()
          }
          axios.put(`/items/${modifiedItem.id}`, modifiedItem).then(updatedItem => {
            this.setState({
              items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
              isLoading: false,
            })
          })
        }
        */
      /*
        deleteItem: (item) => {
          delete this.state.items[item.id]
          this.setState({
            items: this.state.items
          })
        },
      
        createItem: (data, categoryId) => {
          const newId = ID()
          const parsedDate = parseToYearAndMonth(data.date)
          data.monthCategory = `${parsedDate.year} - ${parsedDate.month}`
          data.timestate = new Date(data.date).getTime()
          const newItem = { ...data, id: newId, cid: categoryId }
          this.setState({
            items: { ...this.state.items, [newId]: newItem}
          })
        },
        updateItem: (item, updatedCategoryId) => {
          const modifedItem = {
            ...item,
            cid: updatedCategoryId,
            timeStamp: new Date(item.date).getTime()
          }
          this.setState({
            items: { ...this.state.items, [modifedItem.id]: modifedItem }
          })
        }
        */
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div> 
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}
/*
  function App() {
    return (
      <Router>
        <div className="App">
          <ul>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/edit/10">Edit</Link>
          </ul>
          <div className="container pb-5">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
          </div> 
        </div>
      </Router>
    );
  }
*/
export default App;
