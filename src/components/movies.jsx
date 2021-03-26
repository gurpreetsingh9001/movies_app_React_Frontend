import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    //selectedGenre : null //if we dont want to initialise a state variable than we dont need to declare it here just use this.setState({ selectedGenre: genre, currentPage: 1 }); just like in handleGenreSelect()
    genres: [],
    sortColumn: { colName: "title", order: "asc" },
  };

  //its take time to fetch movies and genre from backend so we dont need to stuck it during page load it will slowdown the page load, so we fetch them after page loads
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; // clone genres present in Genre file and also add All genre to it by our self without manipulated the genre file
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: moviescount } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (moviescount === 0) return <p>There are no movies in database</p>;

    //first filter the movies according to filter than sort them and then paginated
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.colName],
      [sortColumn.order]
    );

    const currentPagemovies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            // valueProperty="_id"                   //prepare the props so that we provide props identifier according to our choice even if our object dont have ID property
            // textProperty="name"                   // but fewer the props the easier the component is to use, so we have set default props in listGroup and if we dont have values other than these default props then we are not obliged to write it
            selectedItem={this.state.selectedGenre} //related props and functions should be named similar
            onItemSelect={this.handleGenreSelect} // like here handleGenreSelect is manipulating selectGenre
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in database</p>
          <MoviesTable
            movies={currentPagemovies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
