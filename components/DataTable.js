import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Table } from 'reactstrap'
import TablePagination from './TablePagination'

class DataTable extends Component {
  constructor(props) {
    super(props)

    // Initialize the data to be displayed in the page
    const numEntriesPerPage = props.numEntriesPerPage || 10
    const currentData = props.data.slice(0, numEntriesPerPage)
    const maxPages = Math.ceil(props.data.length / numEntriesPerPage)

    // Check the columns provided by the parent and see if any of them are filterable
    const filterableKeys = this.props.columns.filter(column => column.filterable).map(column => column.keyName)

    this.state = {
      page: 1,
      maxPages: maxPages,
      numEntriesPerPage: numEntriesPerPage,

      filterableKeys: filterableKeys,

      currentData: currentData,
      filteredData: props.data
    }

    this.getPage = this.getPage.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      this.props.onRowClick(this.state.currentData[0])
    }
  }

  // Get the new proper page to display from the data
  getPage(pageNum, e) {
    if (e) e.preventDefault()
    // On a button click (when we have the 'e' object) and the page
    // is the same as our current page just return since we're already on that page
    if (e && pageNum === this.state.page) return

    this.setState({
      currentData: this.state.filteredData.slice(
        (pageNum - 1) * this.state.numEntriesPerPage,
        pageNum * this.state.numEntriesPerPage
      ),

      page: pageNum
    })
  }

  // Change the table's filter
  changeFilter(e) {
    const filterStr = e.target.value
    console.log('Filtering on:', filterStr)

    // Filter the data based on the filterStr
    if (filterStr === '') {
      var newFilteredData = this.props.data
    } else {
      var newFilteredData = this.props.data.filter(item => {
        for (let keyName of this.state.filterableKeys) {
          if (item[keyName].toLowerCase().includes(filterStr)) return true
        }
        return false
      })
    }

    // Calculate the new max pages value
    let maxPages = Math.ceil(newFilteredData.length / this.state.numEntriesPerPage)
    if (maxPages === 0) maxPages = 1

    // Check to see if the current page we're on is past the new max page limit
    // If so, just change the page to the new max pages and then get the pages
    // after the state change
    let newPage
    if (this.state.page > maxPages) {
      newPage = maxPages
    } else {
      newPage = this.state.page
    }
    if (newPage === 0) newPage = 1

    this.setState(
      {
        filteredData: newFilteredData,
        maxPages: maxPages,
        page: newPage
      },
      () => this.getPage(newPage)
    )
  }

  render() {
    const { columns, tableSize } = this.props
    const { currentData, page, maxPages } = this.state

    return (
      <Container fluid>
        <Row>
          <Col>
            <TablePagination className="pull-right" page={page} maxPages={maxPages} getPage={this.getPage} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table size={tableSize}>
              <thead>
                <tr>
                  {columns.map((column, columnIndex) => {
                    return <th key={columnIndex}>{column.label}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => this.props.onRowClick(row)}
                      className={this.props.onRowClick ? 'pointer' : ''}
                    >
                      {columns.map((column, columnIndex) => {
                        // Check to see if there is a custom component for the column
                        if (column.component) {
                          const Custom = column.component
                          return (
                            <td key={columnIndex}>
                              <Custom value={row[column.keyName]} />
                            </td>
                          )
                        } else {
                          return <td key={columnIndex}>{row[column.keyName]}</td>
                        }
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableSize: PropTypes.string
}

DataTable.defaultProps = {
  numEntriesPerPage: 10,
  tableSize: 'md',
  filterEnterEvent: false
}

export default DataTable
