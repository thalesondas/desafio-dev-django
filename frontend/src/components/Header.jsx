import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../images/pegho-logo.png';
import '../assets/Header.css';

const Header = () => {
    return (
        <header>
            <Navbar className="px-5 py-2" expand="lg">
                <Container className="pe-5" fluid>
                    <Navbar.Brand as={Link} to="/">
                        <Image src={Logo} alt="Pegho Logo" className="pegho-logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto gap-5">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Cadastro</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;