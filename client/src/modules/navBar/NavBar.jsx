import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavProfile from "./components/navProfile";
import { getLoggedInStatus, getCurrentUserData } from "../../store/slices/user";
import { Spinner } from "react-bootstrap";

const NavBar = () => {
	const currentUser = useSelector(getCurrentUserData());

	const isLoggedIn = useSelector(getLoggedInStatus());
	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand as="div">
						<Link to="/">TimeManagment</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav as="ul" className="me-auto">
							<Nav.Link as="li">
								<Link to="/projects">Проекты</Link>
							</Nav.Link>
							<Nav.Link as="li">
								<Link to="/completed">Завершенные проекты</Link>
							</Nav.Link>
							<Nav.Link as="li">
								<Link to="/analytics">Аналитика</Link>
							</Nav.Link>
						</Nav>
						<Nav as="ul">
							<Nav.Link as="li">
								{isLoggedIn ? (
									<div className="d-flex">
										<div className="me-2">
											<i className="fs-2 bi bi-person-circle"></i>
										</div>

										<NavProfile currentUser={currentUser} />
									</div>
								) : (
									<Link to="/login">Login</Link>
								)}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
