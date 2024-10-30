import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

const ProfissionalExperience = ({ formExpData, handleChangeExp, removeExp, addExp, isLoggedIn, ExpTooltip }) => (
  <Col>
    <h3 className='mb-3 d-flex justify-content-center'>
      Experiências Profissionais
      <OverlayTrigger placement="right" overlay={ExpTooltip}>
        <i className="bi bi-exclamation-circle-fill ps-2 fs-6"></i>
      </OverlayTrigger>
    </h3>

    {formExpData.map((experience, index) => (
      <Container className='experiences-container position-relative px-4 pt-3 pb-1 mb-3' key={index}>
        <h5 className='mb-1 d-flex justify-content-center'>Experiência {index + 1}</h5>

        <Form.Group className="mb-3" controlId={`formPosition${index}`}>
          <Form.Label>Cargo</Form.Label>
          <Form.Control
            disabled={!isLoggedIn}
            type="text"
            name='position'
            value={experience.position}
            onChange={(ev) => handleChangeExp(index, ev)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId={`formCompany${index}`}>
          <Form.Label>Empresa</Form.Label>
          <Form.Control
            disabled={!isLoggedIn}
            type="text"
            name='company'
            value={experience.company}
            onChange={(ev) => handleChangeExp(index, ev)}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId={`formExpStartDate${index}`}>
              <Form.Label>Data de Início</Form.Label>
              <Form.Control 
                disabled={!isLoggedIn}
                type="date" 
                name="exp_start_date" 
                value={experience.exp_start_date} 
                onChange={(ev) => handleChangeExp(index, ev)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId={`formExpEndDate${index}`}>
              <Form.Label>Data de Término</Form.Label>
              <Form.Control 
                disabled={!isLoggedIn}
                type="date" 
                name="exp_end_date" 
                value={experience.exp_end_date} 
                onChange={(ev) => handleChangeExp(index, ev)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId={`formDescription${index}`}>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            disabled={!isLoggedIn}
            as="textarea"
            row={2}
            label="Description"
            name='description'
            value={experience.description}
            onChange={(ev) => handleChangeExp(index, ev)}
          />
        </Form.Group>

        {formExpData.length !== 1 && (
          <span className="cursor-pointer position-absolute top-0 end-0 me-3 mt-1" onClick={() => removeExp(index)}>
            <i className="bi bi-x-circle-fill text-danger fs-2"></i>
          </span>
        )}
      </Container>
    ))}

    <div className='d-flex justify-content-center'>
      <Button variant='success' className='mb-5 mt-1 d-flex justify-content-center' disabled={!isLoggedIn} onClick={addExp}>Adicionar nova formação acadêmica</Button>
    </div>
  </Col>
);

export default ProfissionalExperience;