import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, likeToggle, deleteComment} = props
  const {id, name, comment, time, profileBG, liked} = commentDetails

  const likeButtonImg = liked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeButtonText = liked ? 'light-blue-color' : ''

  const onLikeClicked = () => {
    likeToggle(id)
  }

  const onDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-container">
      <div className="comment-info">
        <div className={`dp ${profileBG}`}>
          <p>{name[0]}</p>
        </div>
        <h1 className="name-heading">{name}</h1>
        <p className="time">{formatDistanceToNow(time)}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="btn-container">
        <button type="button" className="like-btn" onClick={onLikeClicked}>
          <img src={likeButtonImg} alt="like" />
          <p className={`like-text ${likeButtonText}`}>Like</p>
        </button>
        <button
          type="button"
          onClick={onDelete}
          data-testid="delete"
          className="delete-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
