import React, {useEffect, useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";

//
function PageTableWidget(props) {
//
  const {
    keyField, data, page, sizePerPage, onTableChange, onSizePerPageChange, totalSize, viewColumns, rowEvents, paginationSize, hideSizePerPage
  } = props;
//
  return (
    <>
      <BootstrapTable keyField={keyField} data={data.slice()} columns={viewColumns} onTableChange={onTableChange} rowEvents={rowEvents}
                      remote striped hover condensed
                      pagination={paginationFactory({
                        page, sizePerPage, totalSize, paginationSize: (paginationSize) ? paginationSize : 5, showTotal: false,
                        hidePageListOnlyOnePage: true, hideSizePerPage: (hideSizePerPage !== undefined), onSizePerPageChange: onSizePerPageChange})}
                      noDataIndication={() => <div style={{textAlign: 'center'}}>목록이 없습니다.</div>} />
    </>
  );
};

export default PageTableWidget;
