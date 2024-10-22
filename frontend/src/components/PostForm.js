import { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../assets/PostForm.css'

const PostForm = () => {

  {/* **** BLOCO PARA ARMAZENAR VALORES DOS INPUT **** */}
  const [formContactData, setFormContactData] = useState({
    email: '',
    phone: '',
    address: ''
  });

  const [formPersonalData, setFormPersonalData] = useState({
    name: '',
    date_of_birth: ''
  });

  const [formExpData, setFormExpData] = useState([{
    position: '',
    company: '',
    exp_start_date: '',
    exp_end_date: null,
    description: null
  }]);

  const [formAcademicData, setFormAcademicData] = useState([{
    institution: '',
    course: '',
    acad_start_date: '',
    acad_end_date: null
  }]);

  {/* **** BLOCO PARA MUDANÇAS NO INPUT // ARMAZENAR VALORES **** */}
  const handleChangeContact = (ev) => {
    setFormContactData({
      ...formContactData,
      [ev.target.name]: ev.target.value
    });
  };

  const handleChangePersonal = (ev) => {
    setFormPersonalData({
      ...formPersonalData,
      [ev.target.name]: ev.target.value
    });
  };

  const handleChangeExp = (index, ev) => {
    const updatedExpData = [...formExpData];
    updatedExpData[index][ev.target.name] = ev.target.value === "" ? null : ev.target.value
    setFormExpData(updatedExpData);
  };

  const handleChangeAcademic = (index, ev) => {
    const updatedAcademicData = [...formAcademicData];
    updatedAcademicData[index][ev.target.name] = ev.target.value === "" ? null : ev.target.value
    setFormAcademicData(updatedAcademicData);
  };

  {/* **** BLOCO PARA FUNÇÕES DE VALIDAÇÃO**** */}
  const validateAllFields = () => {
    if(validateIsFieldEmpty){
      throw new Error("Preencha todos os campos obrigatórios");
    }

    if(!validateEmail(formContactData.email)){
      throw new Error("Formato do email inválido")
    }

    if (formContactData.phone.length !== 15) {
      throw new Error("Número de telefone inválido")
    }

    formExpData.forEach(exp => {
      if (!validateDates(exp.exp_start_date, exp.exp_end_date)) {
        throw new Error("A data de término da experiência profissional não pode ser anterior à data de início");
      }
    });
  
    formAcademicData.forEach(acad => {
      if (!validateDates(acad.acad_start_date, acad.acad_end_date)) {
        throw new Error("A data de término da formação acadêmica não pode ser anterior à data de início");
      }
    });
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email);
  }

  const validateDates = (startDate, endDate) => {
    if (endDate && new Date(endDate) < new Date(startDate)) {
      return false;
    }
    return true;
  };

  const validateIsFieldEmpty = () => {
    if(isFieldEmpty(formContactData.email) || isFieldEmpty(formContactData.phone) || isFieldEmpty(formContactData.address) || isFieldEmpty(formPersonalData.name) || isFieldEmpty(formPersonalData.date_of_birth)) {
      return true;
    }
  }

  {/* **** BLOCO PARA FUNÇÕES AUXILIARES**** */}
  const isFieldEmpty = (value) => {
    return value.trim() === "";
  };

  const addExp = () => {
    setFormExpData([...formExpData, {
      position: '',
      company: '',
      exp_start_date: '',
      exp_end_date: '',
      description: ''
    }]);
  };

  const removeExp = (index) => {
    const updatedExpData = formExpData.filter((_, idx) => idx !== index);
    setFormExpData(updatedExpData);
  }

  const addAcademic = () => {
    setFormAcademicData([...formAcademicData, {
      institution: '',
      course: '',
      acad_start_date: '',
      acad_end_date: ''
    }]);
  };

  const removeAcademic = (index) => {
    const updatedAcademicData = formAcademicData.filter((_, idx) => idx !== index);
    setFormAcademicData(updatedAcademicData);
  }

  {/* **** BLOCO/LÓGICA PARA CADASTRO DE CURRÍCULO **** */}
  const handleSubmit = (ev) => {
    ev.preventDefault();

    validateAllFields();
  
    axios.post('http://127.0.0.1:8000/api/contact-info/', formContactData)
      .then(response => {
        console.log('Informações de contato enviadas com sucesso: ', response.data);
  
  
        return axios.post('http://127.0.0.1:8000/api/personal-info/', {
          ...formPersonalData,
          contact_info: response.data.id
        });
      })
      .then(response => {
        console.log('Informações pessoais enviadas com sucesso: ', response.data);

        const requests = formExpData.map(exp => {
          return axios.post('http://127.0.0.1:8000/api/professional-experience/', {
            ...exp,
            contact_info: response.data.contact_info
          });
        });
      
        return Promise.all(requests);
      })
      .then(response => {
        console.log('Experiências profissionais enviadas com sucesso: ', response);

        const requests = formAcademicData.map(acad => {
          return axios.post('http://127.0.0.1:8000/api/academic-background/', {
            ...acad,
            contact_info: response[0].data.contact_info
          });
        });
      
        return Promise.all(requests);
      })
      .then(response => {
        console.log('Formação acadêmica enviada com sucesso: ', response);
      })
      .catch(error => {
        console.error('Erro de resposta:', error.response.data || error.message);
      });
  };

  return (
    <main className='main-container d-flex flex-column align-items-center justify-content-center'>

      <h1 className='mt-4'>Cadastro do Currículo</h1>
      <span className='custom-span mb-5'>Items marcados com * são obrigatórios</span>

      <Form className='w-75' onSubmit={handleSubmit} >

        <Row className='mb-4 gap-5'>
          
          {/* **** BLOCO PARA INFORMAÇÕES DE CONTATO **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Informações de Contato</h3>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" placeholder="Coloque seu email" name='email' value={formContactData.email} onChange={handleChangeContact} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Telefone*</Form.Label>
                <InputMask 
                  mask="(99) 99999-9999" 
                  value={formContactData.phone}
                  onChange={handleChangeContact}
                >
                  {() => <Form.Control type="tel" name='phone' placeholder="Coloque seu telefone" />}
                </InputMask>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Endereço*</Form.Label>
                <Form.Control as="textarea" row={3} placeholder="Coloque seu endereço" label="Address" name='address' value={formContactData.address} onChange={handleChangeContact} />
            </Form.Group>
          </Col>

          {/* **** BLOCO PARA INFORMAÇÕES PESSOAIS **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Informações Pessoais</h3>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome*</Form.Label>
                <Form.Control type="text" placeholder="Coloque seu nome" name='name' value={formPersonalData.name} onChange={handleChangePersonal} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDateOfBirth">
                <Form.Label>Data de Nascimento*</Form.Label>
                <Form.Control 
                  type="date" 
                  name="date_of_birth" 
                  value={formPersonalData.date_of_birth} 
                  onChange={handleChangePersonal} 
                />
            </Form.Group>
          </Col>

        </Row>

        <Row className='gap-5'>

          {/* **** BLOCO PARA EXPERIÊNCIAS PROFISSIONAIS **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Experiências Profissionais</h3>

            {formExpData.map((experience, index) =>
              <Container className='experiences-container position-relative px-4 pt-3 pb-1 mb-3' key={index}>
                
                <h5 className='mb-1 d-flex justify-content-center'>Experiência {index + 1}</h5>

                <Form.Group className="mb-3" controlId={`formPosition${index}`}>
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" placeholder="Coloque seu cargo" name='position' value={experience.position} onChange={(ev) => handleChangeExp(index, ev)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId={`formCompany${index}`}>
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control type="text" placeholder="Coloque o nome da empresa" name='company' value={experience.company} onChange={(ev) => handleChangeExp(index, ev)} />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId={`formExpStartDate${index}`}>
                      <Form.Label>Data do começo</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="exp_start_date" 
                        value={experience.exp_start_date} 
                        onChange={(ev) => handleChangeExp(index, ev)}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3" controlId={`formExpEndDate${index}`}>
                      <Form.Label>Data do fim</Form.Label>
                      <Form.Control 
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
                    <Form.Control as="textarea" row={2} label="Description" placeholder="Coloque a descrição" name='description' value={experience.description} onChange={(ev) => handleChangeExp(index, ev)} />
                </Form.Group>

                {formExpData.length !== 1 &&
                  <span className="cursor-pointer position-absolute top-0 end-0 me-3 mt-1" onClick={() => removeExp(index)}>
                    <i className="bi bi-x-circle-fill text-danger fs-2"></i>
                  </span>
                }
              </Container>
            )}

              <Button variant='success' className='mt-1' onClick={addExp}>Adicionar nova experiência profissional</Button>
          </Col>

          {/* **** BLOCO PARA FORMAÇÃO ACADÊMICA **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Formação Acadêmica</h3>

            {formAcademicData.map((academic, index) =>
              <Container className='academic-container position-relative px-4 pt-3 pb-1 mb-3' key={index}>

                <h5 className='mb-1 d-flex justify-content-center'>Formação {index + 1}</h5>

                <Form.Group className="mb-3" controlId={`formInstitution${index}`}>
                    <Form.Label>Instituição</Form.Label>
                    <Form.Control type="text" placeholder="Coloque sua instituição" name='institution' value={academic.institution} onChange={(ev) => handleChangeAcademic(index, ev)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId={`formCourse${index}`}>
                    <Form.Label>Curso</Form.Label>
                    <Form.Control type="text" placeholder="Coloque o curso" name='course' value={academic.course} onChange={(ev) => handleChangeAcademic(index, ev)} />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId={`formAcadStartDate${index}`}>
                      <Form.Label>Data do começo</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="acad_start_date" 
                        value={academic.acad_start_date} 
                        onChange={(ev) => handleChangeAcademic(index, ev)}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3" controlId={`formAcadEndDate${index}`}>
                        <Form.Label>Data do fim</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="acad_end_date" 
                          value={academic.acad_end_date} 
                          onChange={(ev) => handleChangeAcademic(index, ev)}
                        />
                      </Form.Group>
                  </Col>
                </Row>

                {formAcademicData.length !== 1 &&
                  <span className="cursor-pointer position-absolute top-0 end-0 me-3 mt-1" onClick={() => removeAcademic(index)}>
                    <i className="bi bi-x-circle-fill text-danger fs-2"></i>
                  </span>
                }
              </Container>
            )}

              <Button variant='success' className='d-flex justify-content-center mt-1' onClick={addAcademic}>Adicionar nova formação acadêmica</Button>
          </Col>

          <Row className='mb-3 d-flex justify-content-center'>
            <Button variant="primary" type="submit" className='w-25'>
              Enviar Currículo
            </Button>
          </Row>

        </Row>
      </Form>
    </main>
  );
};

export default PostForm;