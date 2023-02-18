import React from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavProfile = ({ currentUser }) => {
	if (!currentUser) return "Loading...";
	return (
		<div className="d-flex align-items-center">
			<NavDropdown
				id="nav-dropdown-dark-example"
				title={currentUser.name}
				menuVariant="dark"
				as="div"
			>
				<NavDropdown.Item as="div">
					<Link to="/profile">Профиль</Link>
				</NavDropdown.Item>
				<NavDropdown.Item as="div">
					<Link to="/logout">Выйти</Link>
				</NavDropdown.Item>
			</NavDropdown>
		</div>
	);
};

export default NavProfile;
