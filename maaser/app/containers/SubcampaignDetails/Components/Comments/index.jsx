import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import { Modal, Popover } from 'antd';
import CommentIcon from '../../../../images/comment-icon.svg';
import EmptyTable from '../../../../components/EmptyTable';

// comment card
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import convertDate from '../../../../utils/helpers/dateConverter';
import Dots from '../../../../images/dots.svg';

// proto
import CommentProto from '../../../../protos/campaign_pb';

const Comments = ({
  setComment,
  commentData,
  addComment,
  deleteComment,
  updateComment,
  loading,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [commentId, setCommentId] = useState('');
  const commentsList = commentData.commentsList;
  // for getting campaign id from url
  const subcampaignid = window.location.pathname.split('/')[3];
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();
  // add comment
  function addCommentSubmit(e) {
    setComment('');
    e.preventDefault();
    const commentProto = new CommentProto.Comment();
    commentProto.setDescription(commentData.comment);
    commentProto.setRefid(subcampaignid);
    addComment(commentProto);
  }

  // edit comment
  function editCommentSubmit(e) {
    setComment('');
    e.preventDefault();
    const updateProto = new CommentProto.Comment();
    updateProto.setDescription(commentData.comment);
    updateProto.setRefid(subcampaignid);
    updateProto.setCommentid(commentId);
    updateComment(updateProto);
  }

  useEffect(() => {
    setEditModal(false);
  }, [loading]);

  return (
    <div className="tab-contents comments-contents">
      <form className="comment-form" onSubmit={addCommentSubmit}>
        <input
          type="text"
          placeholder="Write something"
          value={editModal ? '' : commentData.comment}
          onChange={e => {
            setComment(e.target.value);
          }}
        />
        <button type="submit">Post</button>
      </form>
      <div className="comments">
        <>
          {commentsList.length ? (
            commentsList.map((comment, index) => {
              return (
                <div className="comment-row" key={index}>
                  <div className="small-card">
                    <img src={comment.profilepicture} alt="" />
                    <div>
                      <h4 className="c-text">
                        {comment.fullname}{' '}
                        <span class="comment-date">
                          {convertDate(comment.createdat).timeDate}
                        </span>
                      </h4>
                      <p className="c-text">{comment.description}</p>
                    </div>
                  </div>

                  {/* edit comment */}
                  <Popover
                    placement="leftTop"
                    trigger="click"
                    content={
                      <div className="dropdown">
                        <p
                          className="dropdown-link"
                          onClick={() => {
                            setEditModal(true);
                            setComment(comment.description);
                            setCommentId(comment.commentid);
                          }}
                        >
                          Edit
                        </p>
                        <p
                          className="dropdown-link"
                          onClick={() => {
                            deleteComment(comment.commentid);
                          }}
                        >
                          Delete
                        </p>
                      </div>
                    }
                  >
                    {comment.addedby === accountId ? (
                      <div className="comments-actions  ">
                        <img className="dropdown-trigger" src={Dots} alt="" />
                      </div>
                    ) : null}
                  </Popover>
                </div>
              );
            })
          ) : (
            <EmptyTable image={CommentIcon} msg="No comments yet" />
          )}
        </>

        {/* edit comment modal */}
        <Modal
          className="modal-form edit-comment-form"
          title="Edit comment"
          visible={editModal}
          onCancel={() => {
            setComment('');
            setCommentId('');
            setEditModal(false);
          }}
          centered
        >
          <form onSubmit={editCommentSubmit}>
            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <textarea
                value={commentData.comment}
                onChange={e => {
                  setComment(e.target.value);
                }}
              />
            </div>
            <SubmitBtn value="Save" loading={loading} />
          </form>
        </Modal>
      </div>
    </div>
  );
};
export default Comments;
