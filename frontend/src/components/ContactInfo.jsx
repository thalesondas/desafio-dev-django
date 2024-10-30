import { Form, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const ContactInfo = ({ formContactData, handleChangeContact, isLoggedIn }) => (
  <Col>
    <h3 className='d-flex justify-content-center'>Informações de Contato</h3>

    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Label>Email<span className='text-danger fs-5'>*</span></Form.Label>
      <Form.Control
        disabled
        type="email"
        name='email'
        value={formContactData.email}
        onChange={handleChangeContact}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPhone">
      <Form.Label>Telefone<span className='text-danger fs-5'>*</span></Form.Label>
      {isLoggedIn ? (
        <InputMask 
          disabled={!isLoggedIn}
          mask="(99) 99999-9999" 
          value={formContactData.phone}
          onChange={handleChangeContact}
        >
          {() => <Form.Control type="tel" name='phone' />}
        </InputMask>
      ) : (
        <Form.Control value={"(__) _____-____"} disabled={!isLoggedIn} />
      )}
    </Form.Group>
  </Col>
);

export default ContactInfo;
