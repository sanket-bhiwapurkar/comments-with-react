import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentsItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentsList: [], commentCount: 0}

  onInputChange = event => {
    this.setState({name: event.target.value})
  }

  onTextAreaChange = event => {
    this.setState({comment: event.target.value})
  }

  onAddButtonClicked = event => {
    event.preventDefault()
    const {name, comment, commentsList} = this.state

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      liked: false,
      time: new Date(),
      profileBG:
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ],
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      commentCount: commentsList.length + 1,
    }))
  }

  likeToggle = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, liked: !eachComment.liked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => id !== eachComment.id,
      ),
      commentCount: prevState.commentCount - 1,
    }))
  }

  render() {
    const {name, comment, commentsList, commentCount} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="form-and-image">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-img"
          />
          <form className="form">
            <p className="msg">Say something about 4.0 Technologies</p>
            <input
              className="name-input"
              type="text"
              placeholder="Your Name"
              onChange={this.onInputChange}
              value={name}
            />
            <textarea
              className="comment-input"
              rows="6"
              onChange={this.onTextAreaChange}
              value={comment}
              placeholder="Your Comment"
            />
            <button
              type="submit"
              onClick={this.onAddButtonClicked}
              className="btn"
            >
              Add Comment
            </button>
          </form>
        </div>
        <hr />
        <div className="comment-count-container">
          <div className="comment-count">
            <p>{commentCount}</p>
          </div>
          <p>comments</p>
        </div>
        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentsItem
              commentDetails={eachComment}
              key={eachComment.id}
              likeToggle={this.likeToggle}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
