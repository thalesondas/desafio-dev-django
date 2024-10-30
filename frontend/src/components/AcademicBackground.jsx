import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

const AcademicBackground = ({ formAcademicData, handleChangeAcademic, removeAcademic, addAcademic, isLoggedIn, AcadTooltip }) => (
  <Col>
    <h3 className='mb-3 d-flex justify-content-center'>
      Formação Acadêmica
      <OverlayTrigger placement="right" overlay={AcadTooltip}>
        <i className="bi bi-exclamation-circle-fill ps-2 fs-6"></i>
      </OverlayTrigger>
    </h3>

    {formAcademicData.map((academic, index) => (
      <Container className='academic-container position-relative px-4 pt-3 pb-1 mb-3' key={index}>
        <h5 className='mb-1 d-flex justify-content-center'>Formação {index + 1}</h5>

        <Form.Group className="mb-3" controlId={`formInstitution${index}`}>
          <Form.Label>Instituto</Form.Label>
          <Form.Control
            disabled={!isLoggedIn}
            type="text"
            name='institution'
            value={academic.institution}
            onChange={(ev) => handleChangeAcademic(index, ev)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId={`formCourse${index}`}>
          <Form.Label>Curso</Form.Label>
          <Form.Control
            disabled={!isLoggedIn}
            type="text"
            name='course'
            value={academic.course}
            onChange={(ev) => handleChangeAcademic(index, ev)}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId={`formAcadStartDate${index}`}>
              <Form.Label>Data de Início</Form.Label>
              <Form.Control 
                disabled={!isLoggedIn}
                type="date" 
                name="acad_start_date" 
                value={academic.acad_start_date} 
                onChange={(ev) => handleChangeAcademic(index, ev)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId={`formAcadEndDate${index}`}>
              <Form.Label>Data de Término</Form.Label>
              <Form.Control 
                disabled={!isLoggedIn}
                type="date" 
                name="acad_end_date" 
                value={academic.acad_end_date} 
                onChange={(ev) => handleChangeAcademic(index, ev)}
              />
            </Form.Group>
          </Col>
        </Row>

        {formAcademicData.length !== 1 && (
          <span className="cursor-pointer position-absolute top-0 end-0 me-3 mt-1" onClick={() => removeAcademic(index)}>
            <i className="bi bi-x-circle-fill text-danger fs-2"></i>
          </span>
        )}
      </Container>
    ))}

    <div className='d-flex justify-content-center'>
        <Button variant='success' className='mb-5 mt-1 d-flex justify-content-center' disabled={!isLoggedIn} onClick={addAcademic}>Adicionar nova formação acadêmica</Button>
    </div>
  </Col>
);

export default AcademicBackground;