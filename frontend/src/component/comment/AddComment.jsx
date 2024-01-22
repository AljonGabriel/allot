import { Form, InputGroup, Button } from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';

const AddComment = () => {
  return (
    <>
      <Form>
        <InputGroup>
          <Form.Control
            type='text'
            placeholder='Write a public comment'
          />
          <Button size='lg'>
            <Send />
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default AddComment;
