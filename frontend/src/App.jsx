import Login from './component/login/Login';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
      <Container
        fluid
        className='bg-light'>
        <Container>
          <Row
            style={{ height: '600px' }}
            className=' align-items-center'>
            <Col lg='6'>
              <figure className='text-left'>
                <h1 className='text-primary '>allot</h1>

                <h2 className='text-black'>Recent Log-in</h2>
                <small className='text-secondary'>Click your account</small>
              </figure>
            </Col>
            <Col
              lg='6'
              sm='12'>
              <Login />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid>
        <Container>
          <Row className='mt-5'>
            <Col
              lg='4'
              sm='12'>
              <b className='fs-3 text-black d-block mb-3'>
                A little bit more about Allot
              </b>
              <p>
                {' '}
                <b className='fs-5 d-block mb-2'> Vision:</b>
                To create a vibrant online community where individuals from
                diverse backgrounds can freely share their ideas, experiences,
                and achievements. Through Allot, we envision fostering a culture
                of inspiration, mutual support, and empowerment.
              </p>
            </Col>
            <Col lg='4'>
              <p>
                <b className='fs-5 d-block mb-2'>Mission:</b>
                Our mission at Allot is to provide a platform that celebrates
                the uniqueness of every individual. We strive to curate and
                share compelling life stories, innovative ideas, and noteworthy
                achievements to inspire and uplift our global audience. With a
                commitment to inclusivity and positivity, we aim to create a
                space where sharing becomes a powerful catalyst for personal and
                collective growth.
              </p>
            </Col>
            <Col
              lg='4'
              sm='12'>
              <section>
                <b className='fs-5 d-block mb-2'>Reach me:</b>
                <a
                  href='https://www.facebook.com/aljon.gabriel.391'
                  target='_blank'
                  rel='noreferrer'
                  className='text-primary d-block'
                  style={{ textDecoration: 'none' }}>
                  Facebook
                </a>
                <a
                  href='https://www.linkedin.com/in/aljon-gabriel-valdez-822901171'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary d-block'
                  style={{ textDecoration: 'none' }}>
                  LinkedIn
                </a>
                <p className='text-text m-0'>
                  <b> E-mail:</b> Aljongabrielambasvaldez@gmail.com
                </p>
                <p className='text-text m-0'>
                  <b>Phone no.</b> +63-939-717-9384
                </p>
              </section>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default App;
