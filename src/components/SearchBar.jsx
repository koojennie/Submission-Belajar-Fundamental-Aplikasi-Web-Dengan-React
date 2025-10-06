import React from 'react';
import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import LocaleContext from '../contexts/LocaleContext';

class SearchBar extends React.Component {
  static contextType = LocaleContext;

  constructor(props) {
    super(props);

    this.state = {
      keyword: props.defaultKeyword || ''
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.search(this.state.keyword);
  }

  onKeywordChangeHandler(event) {
    const { value } = event.target;
    this.setState(() => ({ keyword: value }), () => {
      this.props.search(this.state.keyword);
    });
  }

  render() {
    const { locale } = this.context;

    return (
      <form className="search-bar" onSubmit={this.onSubmitHandler}>
        <FaMagnifyingGlass className="icons"/>
        <input
          type="text"
          placeholder={locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title ...'}
          value={this.state.keyword}
          onChange={this.onKeywordChangeHandler}
        />
      </form>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string
};

export default SearchBar;