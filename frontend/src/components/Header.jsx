import { Navbar, Nav, Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../images/pegho-logo.png';
import { useDispatch, useSelector } from "react-redux";
import '../assets/Header.css';
import { logout } from "../redux/authSlice";

const Header = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("email_login");
        dispatch(logout());
    }

    return (
        <header>
            <Navbar className="px-5 py-2" expand="lg">
                <Container className="pe-5" fluid>
                    <Navbar.Brand as={Link} to="/">
                        <Image src={Logo} alt="Pegho Logo" className="pegho-logo" />
                    </Navbar.Brand>
                    {isLoggedIn ? 
                        <Row className="gap-5 d-flex justify-content-center align-items-center text-white">
                            <Col>
                                <span className="d-block fs-5">Conectado:</span>
                                <span className="fs-6">{localStorage.getItem('email_login')}</span>
                            </Col>
                            <Col>
                                <span className="text-danger">● </span><span className="cursor-pointer" onClick={handleLogout}>Desconectar</span>
                            </Col>
                        </Row>
                        :
                        <>
                            <Navbar.Toggle aria-controls="navbar-nav" />
                            <Navbar.Collapse id="navbar-nav">
                                <Nav className="ms-auto gap-5">
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Cadastro</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </>
                    }
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;