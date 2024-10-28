import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alertSlice";
import { useNavigate } from "react-router-dom"
import validator from "validator";
import axios from "axios";

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [registerFormData, setRegisterFormData] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const handleChange = (ev) => {
        setRegisterFormData({
            ...registerFormData,
            [ev.target.name]: ev.target.value
        });
    };

    const validateAllFields = () => {

        if(!validator.isEmail(registerFormData.email)){
            dispatch(setAlert({ message: 'Formato do email inválido', variant: 'danger' }));
            return false;
        }

        if(registerFormData.password.length < 6){
            dispatch(setAlert({ message: 'Senha precisa ter no mínimo 6 caracteres', variant: 'danger' }));
            return false;
        }

        if(registerFormData.password !== registerFormData.repeatPassword){
            dispatch(setAlert({ message: 'As senhas estão diferentes', variant: 'danger' }));
            setRegisterFormData({
                ...registerFormData,
                password: '',
                repeatPassword: ''
            })
            return false;
        }
        return true;
    }

    const handleRegister = (ev) => {
        ev.preventDefault();

        if (!validateAllFields()) return;

        axios.post('http://127.0.0.1:8000/api/user/register/', registerFormData)
            .then(response => {
                dispatch(setAlert({ message: 'Cadastro realizado com sucesso!', variant: 'success' }));
                navigate("/login");
            })
            .catch(error => {
                const errorMsg = error.response?.status === 400 && error.response.data.email
                    ? 'Este e-mail já está cadastrado'
                    : 'Erro ao enviar os dados. Tente novamente mais tarde';
                dispatch(setAlert({ message: errorMsg, variant: 'danger' }));
            });
    };

    return(
        <>
            <h1 className="mt-5 mb-4">Cadastro</h1>
            <Form className="mt-2 col-10 col-sm-8 col-md-4 col-xl-3" onSubmit={handleRegister}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={registerFormData.email}
                        onChange={(ev) => handleChange(ev)}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={registerFormData.password}
                        onChange={(ev) => handleChange(ev)}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Repita a Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="repeatPassword"
                        value={registerFormData.repeatPassword}
                        onChange={(ev) => handleChange(ev)}
                    />
                </Form.Group>

                <Row className="mt-4 d-flex justify-content-center align-self-center">
                    <Button type="submit" className='submit-button'>
                        Cadastrar
                    </Button>
                </Row>
            </Form>
        </>
    )
}

export default Register;