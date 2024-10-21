import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import '../assets/PostForm.css'

const PostForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios.post('http://127.0.0.1:8000/api/contact-info/', formData)
      .then(response => {
        console.log('Currículo enviado com sucesso: ', response.data);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao enviar o currículo: ', error);
      });
  };

  return (
    <main className='main-container d-flex align-items-center justify-content-center bg-info'>
        <Form className='w-50' onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Coloque seu email" name='email' value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="tel" placeholder="Coloque seu telefone" name='phone' value={formData.phone} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Endereço</Form.Label>
                <Form.Control as="textarea" row={3} label="Address" name='address' value={formData.address} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar Currículo
            </Button>
        </Form>
    </main>
  );
};

export default PostForm;