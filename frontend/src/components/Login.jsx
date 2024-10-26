import { Button, Form, Row } from "react-bootstrap";

const Login = () => {
    return(
        <>
            <h1 className="mt-5 mb-4">Login</h1>
            <Form className="mt-2 w-25">
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>

                <Row className="mt-4 d-flex justify-content-center align-self-center">
                    <Button type="submit" className='w-25 submit-button'>
                        Logar
                    </Button>
                </Row>
            </Form>
        </>
    )
}

export default Login;