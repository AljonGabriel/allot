import PostModal from '../postModal/PostModal';
import PostedContainer from '../postedContainer/PostedContainer';

const PostSeciton = () => {
  return (
    <>
      <section className='m-auto w-50 '>
        <PostModal />
        <PostedContainer />
      </section>
    </>
  );
};

export default PostSeciton;
