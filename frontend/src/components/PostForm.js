import { useState } from 'react';
import { Form, Button, Row, Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setAlert } from '../redux/alertSlice';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../assets/PostForm.css'

const PostForm = () => {

  const dispatch = useDispatch();

  {/* **** LISTA DE ESTADOS **** */}
  const states = [
    { code: 'AC' },
    { code: 'AL' },
    { code: 'AP' },
    { code: 'AM' },
    { code: 'BA' },
    { code: 'CE' },
    { code: 'DF' },
    { code: 'ES' },
    { code: 'GO' },
    { code: 'MA' },
    { code: 'MT' },
    { code: 'MS' },
    { code: 'MG' },
    { code: 'PA' },
    { code: 'PB' },
    { code: 'PR' },
    { code: 'PE' },
    { code: 'PI' },
    { code: 'RJ' },
    { code: 'RN' },
    { code: 'RS' },
    { code: 'RO' },
    { code: 'RR' },
    { code: 'SC' },
    { code: 'SP' },
    { code: 'SE' },
    { code: 'TO' }
  ];

  {/* **** BLOCO PARA ARMAZENAR VALORES DOS INPUT **** */}
  const [formContactData, setFormContactData] = useState({
    email: '',
    phone: '',
    address: ''
  });

  const [formAddressData, setFormAddressData] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: ''
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

  {/* **** BLOCO PARA MUDANÇAS NO INPUT **** */}
  const handleChangeContact = (ev) => {
    setFormContactData({
      ...formContactData,
      [ev.target.name]: ev.target.value
    });
  };

  const handleChangeAddress = (ev) => {
    setFormAddressData({
      ...formAddressData,
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

  {/* **** BLOCO PARA FUNÇÕES DE VALIDAÇÃO **** */}
  const validateAllFields = () => {
    if(validateIsFieldEmpty()){
      dispatch(setAlert({ message: 'Preencha todos os campos obrigatórios', variant: 'danger' }));
      return false;
    }

    if(!validateEmail(formContactData.email)){
      dispatch(setAlert({ message: 'Formato do email inválido', variant: 'danger' }));
      return false;
    }

    if(new Date(formPersonalData.date_of_birth) > new Date()){
      dispatch(setAlert({ message: 'Data de Nascimento não pode ser em uma data futura', variant: 'danger' }));
      return false;
    }

    if (formContactData.phone.length !== 15) {
      dispatch(setAlert({ message: 'Número de telefone inválido', variant: 'danger' }));
      return false;
    }

    formExpData.forEach(exp => {
      if(new Date(exp.exp_start_date) > new Date() || new Date(exp.exp_end_date) > new Date()){
        dispatch(setAlert({ message: 'As datas nas experiências não podem ser datas futuras', variant: 'danger' }));
        return false;
      }
      if (!validateDates(exp.exp_start_date, exp.exp_end_date)) {
        dispatch(setAlert({ message: 'A data de término da experiência profissional não pode ser anterior à data de início', variant: 'danger' }));
        return false;
      }
    });
  
    formAcademicData.forEach(acad => {
      if(new Date(acad.acad_start_date) > new Date() || new Date(acad.acad_end_date) > new Date()){
        dispatch(setAlert({ message: 'As datas nas formações acadêmicas não podem ser datas futuras', variant: 'danger' }));
        return false;
      }
      if (!validateDates(acad.acad_start_date, acad.acad_end_date)) {
        dispatch(setAlert({ message: 'A data de término da formação acadêmica não pode ser anterior à data de início', variant: 'danger' }));
        return false;
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
    return isFieldEmpty(formContactData.email) ||
          isFieldEmpty(formContactData.phone) ||
          isFieldEmpty(formPersonalData.name) ||
          isFieldEmpty(formPersonalData.date_of_birth) ||
          isFieldEmpty(formAddressData.street) ||
          isFieldEmpty(formAddressData.city) ||
          isFieldEmpty(formAddressData.number) ||
          isFieldEmpty(formAddressData.neighborhood) ||
          isFieldEmpty(formAddressData.state)
  }

  {/* **** BLOCO PARA FUNÇÕES AUXILIARES**** */}
  const isFieldEmpty = (value) => {
    return value.trim() === "";
  };

  const MainTooltip = (
    <Tooltip id="MainTooltip">
      Items marcados com * são obrigatórios
    </Tooltip>
  );

  const ExpTooltip = (
    <Tooltip id="ExpTooltip">
      Experiências que não tiverem Cargo, Empresa e Data de Início preenchidas serão ignoradas
    </Tooltip>
  );

  const AcadTooltip = (
    <Tooltip id="AcadTooltip">
      Formações que não tiverem Instituição, Curso e Data de Início preenchidas serão ignoradas
    </Tooltip>
  );

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
  
    try {
      if(validateAllFields() === false) return; // Certificando de que os dados estão corretos antes do envio
  
      // Caso exista complemento, fazer uma máscara para encaixar no Address Field, caso o contrário fica null
      const complement = formAddressData.complement.trim() !== '' ? `, ${formAddressData.complement}` : '';
      const fullAddress = `${formAddressData.street}, ${formAddressData.number} - ${formAddressData.neighborhood}, ${formAddressData.city} - ${formAddressData.state}${complement}`;
      setFormContactData({ ...formContactData, address: fullAddress });
  
      // Inicia a requisição para salvar as informações de contato e pegar o id gerado para fazer os relacionamentos
      axios.post('http://127.0.0.1:8000/api/contact-info/', formContactData)
        .then(response => {
  
          // Monta a requisição para informações pessoais
          const personalInfoRequest = axios.post('http://127.0.0.1:8000/api/personal-info/', {
            ...formPersonalData,
            contact_info: response.data.id
          });
  
          // Filtra e mapeia as requisições para as experiências profissionais
          const expRequests = formExpData
            .filter(exp => exp.position && exp.company && exp.exp_start_date)
            .map(exp => {
              return axios.post('http://127.0.0.1:8000/api/professional-experience/', {
                ...exp,
                exp_end_date: exp.exp_end_date === '' ? null : exp.exp_end_date,
                description: exp.description === '' ? null : exp.description,
                contact_info: response.data.id
              });
            });
  
          // Filtra e mapeia as requisições para a formação acadêmica
          const academicRequests = formAcademicData
            .filter(acad => acad.institution && acad.course && acad.acad_start_date)
            .map(acad => {
              return axios.post('http://127.0.0.1:8000/api/academic-background/', {
                ...acad,
                acad_end_date: acad.acad_end_date === '' ? null : acad.acad_end_date,
                contact_info: response.data.id
              });
          });
  
          // Envia todas as requisições em paralelo
          return Promise.all([personalInfoRequest, ...expRequests, ...academicRequests]);
        })
        .then(response => {
          // Se todas as requisições forem bem-sucedidas, exibe o alerta de sucesso
          dispatch(setAlert({ message: 'Currículo cadastrado com sucesso', variant: 'success' }));
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            // Verifica se a resposta contém o erro de e-mail duplicado
            const errorMsg = error.response.data.email ? 'Este e-mail já está cadastrado!' : 'Erro ao enviar os dados. Verifique os campos e tente novamente.';
            dispatch(setAlert({ message: errorMsg, variant: 'danger' }));
          } else {
            dispatch(setAlert({ message: 'Erro ao enviar os dados. Tente novamente mais tarde', variant: 'danger' }));
            console.error('Erro ao enviar os dados: ', error.message);
          }
        });
    } catch (error) {
      dispatch(setAlert({ message: error.message, variant: 'danger' }));
      console.error("Erro: ", error.message); // Exibe mensagem de erro de validação
    }
  };
  
  return (
    <main className='main-container d-flex flex-column align-items-center justify-content-center'>

      <h1 className='mt-4 mb-5 d-flex justify-content-center'>
        Cadastro do Currículo
        <OverlayTrigger placement="right" overlay={MainTooltip}>
          <i className="bi bi-exclamation-circle-fill ps-2 fs-6"></i>
        </OverlayTrigger>
      </h1>

      <Form className='w-75' onSubmit={handleSubmit} >

        <Row className='mb-2 gap-5'>
          
          {/* **** BLOCO PARA INFORMAÇÕES DE CONTATO **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Informações de Contato</h3>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" name='email' value={formContactData.email} onChange={handleChangeContact} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Telefone*</Form.Label>
                <InputMask 
                  mask="(99) 99999-9999" 
                  value={formContactData.phone}
                  onChange={handleChangeContact}
                >
                  {() => <Form.Control type="tel" name='phone' />}
                </InputMask>
            </Form.Group>
          </Col>

          {/* **** BLOCO PARA INFORMAÇÕES PESSOAIS **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Informações Pessoais</h3>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome*</Form.Label>
                <Form.Control type="text" name='name' value={formPersonalData.name} onChange={handleChangePersonal} />
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

        {/* **** SUB-BLOCO PARA ENDEREÇO // INFORMAÇÕES DE CONTATO **** */}
        <h4 className='d-flex justify-content-center mb-3 mt-4'>Endereço</h4>
        <Row className='gap-5 mb-4'>
          <Col>
            <Row>
              <Col xs={8}>
                <Form.Group className="mb-3" controlId="formStreet">
                  <Form.Label>Rua*</Form.Label>
                  <Form.Control type="text" name='street' value={formAddressData.street} onChange={handleChangeAddress} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>Cidade*</Form.Label>
                  <Form.Control type="text" name='city' value={formAddressData.city} onChange={handleChangeAddress} />
                </Form.Group>
              </Col>

              <Col xs={4}>
                <Form.Group className="mb-3" controlId="formNumber">
                  <Form.Label>Número*</Form.Label>
                  <Form.Control type="text" name='number' value={formAddressData.number} onChange={handleChangeAddress} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>Estado*</Form.Label>
                  <Form.Select name='state' value={formAddressData.state} onChange={handleChangeAddress}>
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
              <Form.Label>Bairro*</Form.Label>
              <Form.Control type="text" name='neighborhood' value={formAddressData.neighborhood} onChange={handleChangeAddress} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formComplement">
              <Form.Label>Complemento</Form.Label>
              <Form.Control type="text" name='complement' value={formAddressData.complement} onChange={handleChangeAddress} />
            </Form.Group>
          </Col>
        </Row>

        <hr className='mb-5' />

        <Row className='gap-5'>

          {/* **** BLOCO PARA EXPERIÊNCIAS PROFISSIONAIS **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>
              Experiências Profissionais
              <OverlayTrigger placement="right" overlay={ExpTooltip}>
                <i className="bi bi-exclamation-circle-fill ps-2 fs-6"></i>
              </OverlayTrigger>
            </h3>

            {formExpData.map((experience, index) =>
              <Container className='experiences-container position-relative px-4 pt-3 pb-1 mb-3' key={index}>
                
                <h5 className='mb-1 d-flex justify-content-center'>Experiência {index + 1}</h5>

                <Form.Group className="mb-3" controlId={`formPosition${index}`}>
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" name='position' value={experience.position} onChange={(ev) => handleChangeExp(index, ev)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId={`formCompany${index}`}>
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control type="text" name='company' value={experience.company} onChange={(ev) => handleChangeExp(index, ev)} />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId={`formExpStartDate${index}`}>
                      <Form.Label>Data de Início</Form.Label>
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
                      <Form.Label>Data de Término</Form.Label>
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
                    <Form.Control as="textarea" row={2} label="Description" name='description' value={experience.description} onChange={(ev) => handleChangeExp(index, ev)} />
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
            <h3 className='mb-3 d-flex justify-content-center'>
              Formação Acadêmica
              <OverlayTrigger placement="right" overlay={AcadTooltip}>
                <i className="bi bi-exclamation-circle-fill ps-2 fs-6"></i>
              </OverlayTrigger>
            </h3>

            {formAcademicData.map((academic, index) =>
              <Container className='academic-container position-relative px-4 pt-3 pb-1 mb-3' key={index}>

                <h5 className='mb-1 d-flex justify-content-center'>Formação {index + 1}</h5>

                <Form.Group className="mb-3" controlId={`formInstitution${index}`}>
                    <Form.Label>Instituição</Form.Label>
                    <Form.Control type="text" name='institution' value={academic.institution} onChange={(ev) => handleChangeAcademic(index, ev)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId={`formCourse${index}`}>
                    <Form.Label>Curso</Form.Label>
                    <Form.Control type="text" name='course' value={academic.course} onChange={(ev) => handleChangeAcademic(index, ev)} />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId={`formAcadStartDate${index}`}>
                      <Form.Label>Data de Início</Form.Label>
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
                        <Form.Label>Data de Término</Form.Label>
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