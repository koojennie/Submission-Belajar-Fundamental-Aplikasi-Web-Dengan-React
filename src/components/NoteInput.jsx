import React from 'react';
import PropTypes from 'prop-types';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
      title: '',
      body: ''
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyInputHandler = this.onBodyInputHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.refCallback === 'function') {
      this.props.refCallback(this.formRef.current);
    }
  }

  onTitleChangeHandler(event) {
    const { value } = event.target;
    this.setState(() => ({ title: value }));
  }

  onBodyInputHandler(event) {
    this.setState(() => ({
      body: event.target.innerHTML
    }));
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <section className="add-new-page">
        <form ref={this.formRef} onSubmit={this.onSubmitHandler}>
          <div className="add-new-page__input">
            <input
              className="add-new-page__input__title"
              placeholder="Catatan rahasia"
              value={this.state.title}
              onChange={this.onTitleChangeHandler}
            />
            <div
              className="add-new-page__input__body"
              contentEditable
              data-placeholder="Sebenarnya saya adalah ...."
              onInput={this.onBodyInputHandler}
            />
          </div>
          <button type="submit" style={{ display: 'none' }}>Simpan</button>
        </form>
      </section>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
  refCallback: PropTypes.func
};

export default NoteInput;