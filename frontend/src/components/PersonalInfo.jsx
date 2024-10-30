import { Form, Col } from 'react-bootstrap';

const PersonalInfo = ({ formPersonalData, handleChangePersonal, isLoggedIn }) => (
  <Col>
    <h3 className='d-flex justify-content-center'>Informações Pessoais</h3>

    <Form.Group className="mb-3" controlId="formName">
      <Form.Label>Nome*</Form.Label>
      <Form.Control
        disabled={!isLoggedIn}
        type="text"
        name='name'
        value={formPersonalData.name}
        onChange={handleChangePersonal}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formDateOfBirth">
      <Form.Label>Data de Nascimento*</Form.Label>
      <Form.Control 
        disabled={!isLoggedIn}
        type="date" 
        name="date_of_birth" 
        value={formPersonalData.date_of_birth} 
        onChange={handleChangePersonal} 
      />
    </Form.Group>
  </Col>
);

export default PersonalInfo;
