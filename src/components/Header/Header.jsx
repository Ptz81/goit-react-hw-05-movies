import { NavLink } from "react-router-dom";

const Header = () => {
  return (
<nav className='navbar bg-primary mb-3 navbar-expand-lg'>
			<div className='container-fluid'>
				<span className='navbar-brand mb-0 h1'>
					CINEMA
				</span>
				<div
					className='collapse navbar-collapse '
					id='navbarNavAltMarkup'
				>
					<div className='navbar-nav '>
						<NavLink
							className='nav-link text-white fw-bold active'
							aria-current='page'
							to='/'
						>
							Home
						</NavLink>
						<NavLink className='nav-link text-white' to='/movies'>
							Movies
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
  )
}

export default Header;

