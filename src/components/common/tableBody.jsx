import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  //Like and delete dont have key/identifier in them
  renderCell = (item, column) => {
    if (column.content) return column.content(item); // return react element
    return _.get(item, column.colName); //else return column object
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={item._id + (column.colName || column.key)}>
                {this.renderCell(item, column)}
              </td> //to get value in nested object we use lodash //simple will not work in nesting
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
