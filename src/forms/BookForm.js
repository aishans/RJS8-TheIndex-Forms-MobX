import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: "blue",
    authors: [this.props.author.id]
  };
  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //   handleSubmit = event => {
  //     event.preventDefault();
  //     bookStore.addBook(this.state, this.props.author);
  //     alert("submit");
  //   };
  submitBook = async event => {
    event.preventDefault();
    await bookStore.addBook(this.state);
    if (!bookStore.errors) {
      this.props.closeModal();
    }
  };

  render() {
    let colors = ["-----", "blue", "red", "yellow", "white", "green"];
    let colorChoices = colors.map(color => (
      <option value={color}>{color}</option>
    ));
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>

            <input
              onChange={event => this.textChangeHandler(event)}
              type="text"
              className="form-control"
              name="title"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              onChange={event => this.textChangeHandler(event)}
              name="color"
            >
              {colorChoices}
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
