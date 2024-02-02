import { NavDropdown, InputGroup, Button, Badge } from 'react-bootstrap';

import { Bell } from 'react-bootstrap-icons';

import { LinkContainer } from 'react-router-bootstrap';

import AcceptRequestBtn from '../acceptRequestBtn/AcceptRequestBtn';

const Notifications = () => {
  return (
    <>
      <NavDropdown
        title={
          <>
            <Bell size={25} />
            <Badge bg='primary'>25</Badge>
          </>
        }
        drop='down'
        className='remove-arrow '
        align='end'>
        <NavDropdown.Header>Notifications</NavDropdown.Header>
        <NavDropdown.Divider />

        <div>
          <NavDropdown.Item>
            <ul>
              <li>
                {/* <LinkContainer to={`/userPage/`}> */}
                <small>Sent you a friend request</small>
                {/*     </LinkContainer> */}

                <InputGroup>
                  {/*  <AcceptRequestBtn /> */}
                  <Button
                    variant='outline-danger'
                    size='sm'>
                    Reject
                  </Button>
                </InputGroup>
              </li>
            </ul>
          </NavDropdown.Item>
        </div>
      </NavDropdown>
    </>
  );
};

export default Notifications;
