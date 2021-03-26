import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class moviesTable extends Component {
  columns = [
    { colName: "title", label: "Title" },
    { colName: "genre.name", label: "Genre" },
    { colName: "numberInStock", label: "Stock" },
    { colName: "dailyRentalRate", label: "Rate" },
    //below like component and delete button both are React Elements which are objects themself,so below is just key with object value
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default moviesTable;
