import { Form, Col, Row } from 'react-bootstrap';

const AddressInfo = ({ formAddressData, handleChangeAddress, states, isLoggedIn }) => (
  <>
    <h4 className='d-flex justify-content-center'>Endereço</h4>
    <Row className='gap-2 mb-4'>
      <Col>
      
        <Row>
          <Col xs={8}>
            <Form.Group className="mb-3" controlId="formStreet">
              <Form.Label>Rua<span className='text-danger fs-5'>*</span></Form.Label>
              <Form.Control
                disabled={!isLoggedIn}
                type="text"
                name='street'
                value={formAddressData.street}
                onChange={handleChangeAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>Cidade<span className='text-danger fs-5'>*</span></Form.Label>
              <Form.Control
                disabled={!isLoggedIn}
                type="text"
                name='city'
                value={formAddressData.city}
                onChange={handleChangeAddress}
              />
            </Form.Group>
          </Col>

          <Col xs={4}>
            <Form.Group className="mb-3" controlId="formNumber">
              <Form.Label>Número<span className='text-danger fs-5'>*</span></Form.Label>
              <Form.Control
                disabled={!isLoggedIn}
                type="text"
                name='number'
                value={formAddressData.number}
                onChange={handleChangeAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>Estado<span className='text-danger fs-5'>*</span></Form.Label>
              <Form.Select 
                disabled={!isLoggedIn} 
                name='state' 
                value={formAddressData.state} 
                onChange={handleChangeAddress}
              >
                <option value="" disabled>-</option>
                {states.map(state => (
                  <option key={state.code} value={state.code}>
                    {state.code}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Col>

      <Col>
        <Form.Group className="mb-3" controlId="formNeighborhood">
          <Form.Label>Bairro<span className='text-danger fs-5'>*</span></Form.Label>
          <Form.Control
            disabled={!isLoggedIn}
            type="text"
            name='neighborhood'
            value={formAddressData.neighborhood}
            onChange={handleChangeAddress}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formComplement">
          <Form.Label>Complemento</Form.Label>
          <Form.Control
            disabled={!isLoggedIn}
            type="text"
            name='complement'
            value={formAddressData.complement}
            onChange={handleChangeAddress}
          />
        </Form.Group>
      </Col>
    </Row>
  </>
);

export default AddressInfo;