import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

const SideNavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<Menu
			width={"fit-content"}
			disableAutoFocus
			isOpen={isOpen}
			onClose={handleClose}
			onOpen={() => {
				setIsOpen(true);
      }}
      onClick={() => {
				setIsOpen(true);
			}}
		>
			<NavLink onClick={handleClose} to="/admin">
				DashBoard
			</NavLink>
			<NavLink onClick={handleClose} to="/admin/users">
				Users
			</NavLink>
			<NavLink onClick={handleClose} to="/admin/orders">
				Orders
			</NavLink>
			<NavLink onClick={handleClose} to="/admin/items">
				Items
			</NavLink>
		</Menu>
	);
};

export default SideNavBar;

// <div className="sidenav sticky-right">
//       <br />
//       <br />
//       <NavLink to="/admin">DashBoard</NavLink>
//       <NavLink to="/admin/users">Users</NavLink>
//       <NavLink to="/admin/orders">Orders</NavLink>
//       <NavLink to="/admin/items">Items</NavLink>
//     </div>
