//endpoints
import { useState } from 'react';
import { useViewPostCommentsQuery } from '../../states/slices/comments/apiCommentsEndpoints';
import { useSelector } from 'react-redux';

const Comments = ({ post, userInfo }) => {
  const postId = post._id;
  const [inputData, setInputData] = useState({
    fePostId: postId,
  });

  const { commentAction } = useSelector((state) => state.comments);

  const { data: comment, isLoading } = useViewPostCommentsQuery(inputData);

  console.log('Comments: ', comment);

  return (
    <>
      {comment
        ? comment.map((userComment, index) => (
            <section
              key={index}
              className='bg-white-secondary p-3 mt-1'>
              <h3>{userComment.commentedBy}</h3>
              <p>{userComment.comment}</p>
            </section>
          ))
        : 'No Comment'}
    </>
  );
};

export default Comments;
