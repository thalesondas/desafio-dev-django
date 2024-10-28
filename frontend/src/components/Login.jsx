import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../redux/alertSlice";
import { login } from "../redux/authSlice"
import axios from "axios";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (ev) => {
        setLoginFormData({
            ...loginFormData,
            [ev.target.name]: ev.target.value
        });
    };

    const handleLogin = (ev) => {
        ev.preventDefault();

        if (!loginFormData.email || !loginFormData.password) {
            dispatch(setAlert({ message: 'Preencha todos os campos.', variant: 'danger' }));
            return;
        }

        setLoading(true);

        axios.post('http://127.0.0.1:8000/api/token/', loginFormData)
            .then(response => {

                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('email_login', loginFormData.email);
                dispatch(login());

                dispatch(setAlert({ message: 'Logado com sucesso!', variant: 'success' }));
                navigate("/");
            })
            .catch(error => {
                dispatch(setAlert({ message: "Dados inválidos, tente novamente", variant: 'danger' }));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return(
        <>
            <h1 className="mt-5 mb-4">Login</h1>
            <Form className="mt-2 w-25" onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={loginFormData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row className="mt-2">
                    <span className="text-center">Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link></span>
                </Row>

                <Row className="mt-4 d-flex justify-content-center align-self-center">
                    <Button type="submit" className='submit-button' disabled={loading}>
                        {loading ? 'Carregando...' : 'Logar'}
                    </Button>
                </Row>
            </Form>
        </>
    );
}

export default Login;