import { Form } from "react-bootstrap";

const Register = () => {
    return(
        <>
            <h1 className="mt-5 mb-4">Cadastro</h1>
            <Form className="mt-2 w-25">
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Repita a Senha</Form.Label>
                    <Form.Control type="password2" name="password2" />
                </Form.Group>
            </Form>
        </>
    )
}

export default Register;