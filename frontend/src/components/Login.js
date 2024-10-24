import { Form } from "react-bootstrap";

const Login = () => {
    return(
        <>
            <h1 className="mt-5 mb-4">Login</h1>
            <Form className="mt-2">
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>
            </Form>
        </>
    )
}

export default Login;