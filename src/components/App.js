import React from 'react';
import '../App.css';
import Search from './Search';
import Table from './Table';
import Button from './Button'

//API CONST PART
const DEFAULT_PAGE = 0;
const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;


//Some const to display
const welcome = 'Welcome to my site'
const user = {
  name: 'Jose',
  lastname: 'Herrera'
}
const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list,
      welcome,
      user,
      searchTerm: DEFAULT_QUERY,
      results: null,
      searchKey: '',
    }

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);

  }

  needsToSearchTopstories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopstories(searchTerm)) {
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }
    e.preventDefault();
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }
  fetchSearchTopstories(searchTerm, page) {
    fetch(`${url}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey
    } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    return (
      <div className="App">
        <h2>{this.state.welcome}, I'm {this.state.user.name} {this.state.user.lastname}</h2>
        <div className="interactions">
          <Search value={searchTerm}
            onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search something interesting
          </Search>
        </div>
        {
          this.state.results ?
            <Table
              list={list}
              onDismiss={this.onDismiss} />
            : null
        }
        <div>
          <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}



export default App;
