import React from 'react'
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const pageNumbers = (page, lastPage) => {
  const maxPages = 2
  let from = page - maxPages
  if (from < 1) {
    from = 1
  }
  let to = from + maxPages * 2
  if (to >= lastPage) {
    to = lastPage
  }

  let pagesArray = []
  for (let i = from; i <= to; i++) {
    pagesArray.push(i)
  }
  return pagesArray
}

const TablePagination = props => {
  const { className, page, maxPages } = props
  return (
    <div className={className}>
      <Row>
        <Col className="text-center">
          <span>
            Page {page} of {maxPages}
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>
            {/* First page */}
            {page > 1 && (
              <PaginationItem>
                <PaginationLink href="#" onClick={e => props.getPage(1, e)}>
                  First
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Previous page */}
            {page > 1 && (
              <PaginationItem>
                <PaginationLink previous href="#" onClick={e => props.getPage(page - 1, e)} />
              </PaginationItem>
            )}

            {/* Individual page */}
            {pageNumbers(page, maxPages).map((pageNum, index) => {
              return (
                <PaginationItem key={index} active={pageNum === page}>
                  <PaginationLink href="#" onClick={e => props.getPage(pageNum, e)}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {/* Next page */}
            {page < maxPages && (
              <PaginationItem>
                <PaginationLink next href="#" onClick={e => props.getPage(page + 1, e)} />
              </PaginationItem>
            )}

            {/* Last page */}
            {page < maxPages && (
              <PaginationItem>
                <PaginationLink href="#" onClick={e => props.getPage(maxPages, e)}>
                  Last
                </PaginationLink>
              </PaginationItem>
            )}
          </Pagination>
        </Col>
      </Row>
    </div>
  )
}

export default TablePagination
