import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../redux/alertSlice';
import axios from '../axiosConfig.js';
import InputMask from 'react-input-mask';
import validator from "validator";
import '../assets/PostForm.css'

const PostForm = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // Preenchendo valores nos campos caso já tenha feito o envio do currículo anteriormente
  useEffect(() => {
    const fetchUserData = async () => {
        if (isLoggedIn) {
            try {
                const email = localStorage.getItem('email_login');

                // Faz uma requisição para buscar todos os contatos
                const contactResponse = await axios.get('contact-info/');

                // Encontra o contato que corresponde ao email
                const user = contactResponse.data.find(contact => contact.email === email);

                if (user) {
                  // Preenche os dados do formulário com as informações do usuário
                  setFormContactData({
                      email: localStorage.getItem('email_login') || '',
                      phone: user.phone || '',
                  });

                  // Lógico para separar o address salvo em partes e pegar cada parte para colocar no seu devido input
                  const addressParts = user.address.split(',').map(part => part.trim());

                  const addressStreet = addressParts[0];

                  const numberAndNeighborhood = addressParts[1].split('-').map(part => part.trim());
                  const addressNumber = numberAndNeighborhood[0];
                  const addressNeighborhood = numberAndNeighborhood[1];

                  const cityAndState = addressParts[2].split('-').map(part => part.trim());
                  const addressCity = cityAndState[0];
                  const addressState = cityAndState[1];

                  const addressComplement = addressParts.length >= 3 ? addressParts[3] : '';

                  setFormAddressData({
                    street: addressStreet || '',
                    city: addressCity || '',
                    number: addressNumber || '',
                    state: addressState || '',
                    neighborhood: addressNeighborhood || '',
                    complement: addressComplement,
                  });

                  if (user.personal_info) {
                    setFormPersonalData({
                        name: user.personal_info.name || '',
                        date_of_birth: user.personal_info.date_of_birth || '',
                    });
                  }

                  setFormExpData(
                    user.professional_experiences?.length > 0 ?
                     user.professional_experiences.map(exp => ({
                          position: exp.position || '',
                          company: exp.company || '',
                          exp_start_date: exp.exp_start_date || '',
                          exp_end_date: exp.exp_end_date || null,
                          description: exp.description || null,
                      }))
                      : 
                      [{
                          position: '',
                          company: '',
                          exp_start_date: '',
                          exp_end_date: null,
                          description: null,
                      }]
                  );

                  setFormAcademicData(
                    user.academic_backgrounds?.length > 0 ?
                      user.academic_backgrounds.map(acad => ({
                        institution: acad.institution || '',
                        course: acad.course || '',
                        acad_start_date: acad.acad_start_date || '',
                        acad_end_date: acad.acad_end_date || null,
                      }))
                      : 
                      [{
                        institution: '',
                        course: '',
                        acad_start_date: '',
                        acad_end_date: null,
                      }]
                  );

                } else {
                    setFormContactData({
                      email: localStorage.getItem('email_login') || ''
                    });
                    console.warn('Nenhum contato encontrado para o email:', email);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        }
    };

    fetchUserData();
}, [isLoggedIn]);

  // **** LISTA DE ESTADOS ****
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

  // **** ESTADOS PARA ARMAZENAR VALORES DOS INPUTS ****
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

  // **** FUNÇÕES PARA MANIPULAR AS MUDANÇAS NO INPUT ****
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

  // **** FUNÇÕES DE VALIDAÇÃO ****
  const validateAllFields = () => {

    // Verifica se algum campo está vazio
    if (validateIsFieldEmpty()) {
      dispatch(setAlert({ message: 'Preencha todos os campos obrigatórios', variant: 'danger' }));
      return false;
    }
  
    // Verifica se o e-mail é válido
    if(!validator.isEmail(formContactData.email)){
      dispatch(setAlert({ message: 'Formato do email inválido', variant: 'danger' }));
      return false;
    }
  
    // Verifica se a data de nascimento não é futura
    if (new Date(formPersonalData.date_of_birth) > new Date()) {
      dispatch(setAlert({ message: 'Data de Nascimento não pode ser em uma data futura', variant: 'danger' }));
      return false;
    }
  
    // Verifica o formato do telefone
    if (formContactData.phone.length !== 15) {
      dispatch(setAlert({ message: 'Número de telefone inválido', variant: 'danger' }));
      return false;
    }
  
    // Validação para experiências profissionais
    const expInvalid = formExpData.some(exp => {
      if (new Date(exp.exp_start_date) > new Date() || new Date(exp.exp_end_date) > new Date()) {
        dispatch(setAlert({ message: 'As datas nas experiências não podem ser datas futuras', variant: 'danger' }));
        return true;
      }
      if (!validateDates(exp.exp_start_date, exp.exp_end_date)) {
        dispatch(setAlert({ message: 'A data de término da experiência profissional não pode ser anterior à data de início', variant: 'danger' }));
        return true;
      }
      return false;
    });
  
    if (expInvalid) return false; // Se alguma experiência for inválida, interrompe a validação.
  
    // Validação para formações acadêmicas
    const acadInvalid = formAcademicData.some(acad => {
      if (new Date(acad.acad_start_date) > new Date() || new Date(acad.acad_end_date) > new Date()) {
        dispatch(setAlert({ message: 'As datas nas formações acadêmicas não podem ser datas futuras', variant: 'danger' }));
        return true;
      }
      if (!validateDates(acad.acad_start_date, acad.acad_end_date)) {
        dispatch(setAlert({ message: 'A data de término da formação acadêmica não pode ser anterior à data de início', variant: 'danger' }));
        return true;
      }
      return false;
    });
  
    if (acadInvalid) return false; // Se alguma formação for inválida, interrompe a validação.
  
    return true; // Se todos os campos passarem na validação, retorna true.
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

  // **** FUNÇÕES AUXILIARES ****
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
      Experiências que não tiverem Cargo, Empresa e Data de Início preenchidas não serão salvas
    </Tooltip>
  );

  const AcadTooltip = (
    <Tooltip id="AcadTooltip">
      Formações que não tiverem Instituição, Curso e Data de Início preenchidas não serão salvas
    </Tooltip>
  );


  // **** ADICIONAR E REMOVER EXPERIÊNCIAS E FORMAÇÕES ACADÊMICAS ****
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

  // **** LÓGICA PARA CADASTRO DE CURRÍCULO ****
  const handleSubmit = async (ev) => {
    ev.preventDefault();
  
    try {
      if (!validateAllFields()) return; // Certificando de que os dados estão corretos antes do envio
  
      // Monta o endereço completo
      const complement = formAddressData.complement.trim() !== '' ? `, ${formAddressData.complement}` : '';
      const fullAddress = `${formAddressData.street}, ${formAddressData.number} - ${formAddressData.neighborhood}, ${formAddressData.city} - ${formAddressData.state}${complement}`;
  
      const email = localStorage.getItem('email_login');
  
      // Faz uma requisição para buscar todos os contatos
      const contactResponse = await axios.get('contact-info/');
      const user = contactResponse.data.find(contact => contact.email === email);
  
      if (user) {
  
        const response = await axios.get(`contact-info/${user.id}/`);
  
        // Caso exista, faz o update
        const contactInfoRequest = axios.patch(`contact-info/${response.data.id}/`, { 
          ...formContactData, 
          address: fullAddress 
        });
        const personalInfoRequest = axios.patch(`personal-info/${response.data.id}/`, {
          ...formPersonalData
        });
  
        // Bloco de lógica para atualizar experiências profissionais
        if (formExpData.length === 1 && (!formExpData[0].position || !formExpData[0].company || !formExpData[0].exp_start_date)) {
          // Caso o usuário remova todas as experiências do formulário, deleta todas do backend
          const expDeleteRequests = response.data.professional_experiences.map(exp => 
            axios.delete(`professional-experience/${exp.id}/`)
          );
          await Promise.all(expDeleteRequests);
        } else {
          // 1. Atualizar as experiências existentes
          const expUpdateRequests = response.data.professional_experiences.slice(0, formExpData.length).map((exp, index) => 
            axios.patch(`professional-experience/${exp.id}/`, {
              ...formExpData[index],
              exp_end_date: formExpData[index].exp_end_date === '' ? null : formExpData[index].exp_end_date,
              description: formExpData[index].description === '' ? null : formExpData[index].description
            })
          );
        
          // 2. Adicionar novas experiências (caso o formulário tenha mais do que o backend)
          const newExpRequests = formExpData.slice(response.data.professional_experiences.length).map(exp => 
            axios.post('professional-experience/', {
              ...exp,
              exp_end_date: exp.exp_end_date === '' ? null : exp.exp_end_date,
              description: exp.description === '' ? null : exp.description,
              contact_info: response.data.id
            })
          );
        
          // 3. Remover experiências que estão no backend, mas não estão no formulário
          const expDeleteRequests = response.data.professional_experiences.slice(formExpData.length).map(exp => 
            axios.delete(`professional-experience/${exp.id}/`)
          );
        
          // Executa todas as requisições de atualização, criação e exclusão
          await Promise.all([...expUpdateRequests, ...newExpRequests, ...expDeleteRequests]);
        }

        // Bloco de lógica para atualizar formações acadêmicas
        if (formAcademicData.length === 1 && (!formAcademicData[0].institution || !formAcademicData[0].course || !formAcademicData[0].acad_start_date)) {
          // Caso o usuário remova todas as formações do formulário, deleta todas do backend
          const acadDeleteRequests = response.data.academic_backgrounds.map(acad => 
            axios.delete(`academic-background/${acad.id}/`)
          );
          await Promise.all(acadDeleteRequests);
        } else {
          // 1. Atualizar as formações existentes
          const acadUpdateRequests = response.data.academic_backgrounds.slice(0, formAcademicData.length).map((acad, index) => 
            axios.patch(`academic-background/${acad.id}/`, {
              ...formAcademicData[index],
              acad_end_date: formAcademicData[index].acad_end_date === '' ? null : formAcademicData[index].acad_end_date
            })
          );
        
          // 2. Adicionar novas formações (caso o formulário tenha mais do que o backend)
          const newAcadRequests = formAcademicData.slice(response.data.academic_backgrounds.length).map(acad => 
            axios.post('academic-background/', {
              ...acad,
              acad_end_date: acad.acad_end_date === '' ? null : acad.acad_end_date,
              contact_info: response.data.id
            })
          );
        
          // 3. Remover experiências que estão no backend, mas não estão no formulário
          const acadDeleteRequests = response.data.academic_backgrounds.slice(formAcademicData.length).map(acad => 
            axios.delete(`academic-background/${acad.id}/`)
          );
        
          // Executa todas as requisições de atualização, criação e exclusão
          await Promise.all([...acadUpdateRequests, ...newAcadRequests, ...acadDeleteRequests]);
        }
  
        await Promise.all([contactInfoRequest, personalInfoRequest]);
  
        dispatch(setAlert({ message: 'Currículo atualizado com sucesso', variant: 'success' }));
      } else {

        // Caso não exista, crie uma primeira vez
        const response = await axios.post('contact-info/', {
          ...formContactData,
          address: fullAddress
        });
  
        const personalInfoRequest = await axios.post('personal-info/', {
          ...formPersonalData,
          contact_info: response.data.id
        });
  
        const expRequests = await Promise.all(formExpData
          .filter(exp => exp.position && exp.company && exp.exp_start_date)
          .map(exp => axios.post('professional-experience/', {
            ...exp,
            exp_end_date: exp.exp_end_date === '' ? null : exp.exp_end_date,
            description: exp.description === '' ? null : exp.description,
            contact_info: response.data.id
          }))
        );
  
        const academicRequests = await Promise.all(formAcademicData
          .filter(acad => acad.institution && acad.course && acad.acad_start_date)
          .map(acad => axios.post('academic-background/', {
            ...acad,
            acad_end_date: acad.acad_end_date === '' ? null : acad.acad_end_date,
            contact_info: response.data.id
          }))
        );
  
        await Promise.all([personalInfoRequest, ...expRequests, ...academicRequests]);
  
        dispatch(setAlert({ message: 'Currículo cadastrado com sucesso', variant: 'success' }));
      }
    } catch (error) {
      dispatch(setAlert({ message: 'Erro ao enviar os dados. Tente novamente mais tarde', variant: 'danger' }));
      console.error('Erro ao enviar os dados: ', error.message);
    }
  };  
  
  return (
    <>

      <h1 className='mt-5 d-flex justify-content-center'>
        Cadastro do Currículo
        <OverlayTrigger placement="right" overlay={MainTooltip}>
          <i className="bi bi-exclamation-circle-fill ps-2 fs-6"></i>
        </OverlayTrigger>
      </h1>
      {!isLoggedIn ?
        <span className='fs-6 text-danger'>Você precisa estar logado para poder preencher os campos!</span>
      :
       null   
      }

      <Form className='col-11 col-sm-10 col-xl-8 col-md-9 mt-5' onSubmit={handleSubmit} >

        <Row className='mb-2 custom-gap'>
          
          {/* **** BLOCO PARA INFORMAÇÕES DE CONTATO **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Informações de Contato</h3>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  disabled
                  type="email"
                  name='email'
                  value={formContactData.email}
                  onChange={handleChangeContact}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Telefone*</Form.Label>
                {isLoggedIn ? 
                  <InputMask 
                    disabled={!isLoggedIn}
                    mask="(99) 99999-9999" 
                    value={formContactData.phone}
                    onChange={handleChangeContact}
                  >
                    {() => <Form.Control type="tel" name='phone' />}
                  </InputMask>
                  :
                  <Form.Control value={"(__) _____-____"} disabled={!isLoggedIn}/>
                }
            </Form.Group>
          </Col>

          {/* **** BLOCO PARA INFORMAÇÕES PESSOAIS **** */}
          <Col>
            <h3 className='mb-3 d-flex justify-content-center'>Informações Pessoais</h3>

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

        </Row>

        {/* **** SUB-BLOCO PARA ENDEREÇO // INFORMAÇÕES DE CONTATO **** */}
        <h4 className='d-flex justify-content-center mb-3 mt-4'>Endereço</h4>
        <Row className='custom-gap mb-4'>
          <Col>
            <Row>
              <Col xs={8}>
                <Form.Group className="mb-3" controlId="formStreet">
                  <Form.Label>Rua*</Form.Label>
                  <Form.Control
                    disabled={!isLoggedIn}
                    type="text"
                    name='street'
                    value={formAddressData.street}
                    onChange={handleChangeAddress}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>Cidade*</Form.Label>
                  <Form.Control
                    disabled={!isLoggedIn}
                    type="text"
                    name='city'
                    value={formAddressData.city}
                    onChange={handleChangeAddress} />
                </Form.Group>
              </Col>

              <Col xs={4}>
                <Form.Group className="mb-3" controlId="formNumber">
                  <Form.Label>Número*</Form.Label>
                  <Form.Control
                    disabled={!isLoggedIn}
                    type="text"
                    name='number'
                    value={formAddressData.number}
                    onChange={handleChangeAddress}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>Estado*</Form.Label>
                  <Form.Select disabled={!isLoggedIn} name='state' value={formAddressData.state} onChange={handleChangeAddress}>
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

        <hr className='mb-5' />

        <Row className='custom-gap'>

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

                {formExpData.length !== 1 &&
                  <span className="cursor-pointer position-absolute top-0 end-0 me-3 mt-1" onClick={() => removeExp(index)}>
                    <i className="bi bi-x-circle-fill text-danger fs-2"></i>
                  </span>
                }
              </Container>
            )}

              <Button variant='success' className='mt-1' disabled={!isLoggedIn} onClick={addExp}>Adicionar nova experiência profissional</Button>
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
                    <Form.Control disabled={!isLoggedIn} type="text" name='course' value={academic.course} onChange={(ev) => handleChangeAcademic(index, ev)} />
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

                {formAcademicData.length !== 1 &&
                  <span className="cursor-pointer position-absolute top-0 end-0 me-3 mt-1" onClick={() => removeAcademic(index)}>
                    <i className="bi bi-x-circle-fill text-danger fs-2"></i>
                  </span>
                }
              </Container>
            )}

              <Button variant='success' className='d-flex justify-content-center mt-1' disabled={!isLoggedIn} onClick={addAcademic}>Adicionar nova formação acadêmica</Button>
          </Col>

          <Row className='mb-3 d-flex justify-content-center text-center'>
            {!isLoggedIn ?
              <span className='fs-6 mb-3 text-danger'>Você precisa estar logado para poder enviar o currículo!</span>
              :
              null
            }
            <Button type="submit" className='mb-3 w-25 submit-button' disabled={!isLoggedIn}>
              Enviar Currículo
            </Button>
          </Row>

        </Row>
      </Form>
    </>
  );
};

export default PostForm;