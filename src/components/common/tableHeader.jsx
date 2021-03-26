import React, { Component } from "react";

//columns: array
//sortColumn: object
//onSort: function

class TableHeader extends Component {
  //sorting is particular to table and thus we used it here rather than in movies component
  raiseSort = (colName) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.colName === colName)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.colName = colName;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    if (column.colName !== this.props.sortColumn.colName) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.colName || column.key}
              onClick={() => this.raiseSort(column.colName)}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
