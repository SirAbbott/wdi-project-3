import React from 'react'
import axios from 'axios'

class CommentForm extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        body: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: {name, value}}) {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post(`/api/items/${this.props.location.state.id}/comment`, this.state.data)
      .then(res => {
        console.log(res.data)
        this.props.history.push(`/items/${this.props.location.state.id}`)
      })
      .catch(err => alert(err.message))
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">New Comment</h2>
            <div className="field">
              <label className="label">Display Name</label>
              <input
                className="input"
                name="name"
                placeholder="This will be publically visible"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Comment</label>
              <textarea
                className="textarea"
                name="body"
                placeholder="Comment"
                value={this.state.body}
                onChange={this.handleChange}
              />
            </div>
            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </main>
    )
  }

}

export default CommentForm
