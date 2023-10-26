import { Link } from "react-router-dom";

import styles from './Navbar.module.css';

import Logo from '../../assets/img/logo.png'

// Context
import { Context } from '../../context/UserContext'
import { useContext } from "react";

const Navbar = () => {

    const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
            <Link className={styles.navbar_logo} to="/">
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </Link>
        <ul>
            <li>
                <Link to="/">Adotar</Link>
            </li>
            {authenticated ? (
                <>
                    <li>
                        <Link to='/pets/myadoptions'>Minhas Adoções</Link>
                    </li>
                    <li>
                        <Link to='/pets/mypets'>Meus Pets</Link>
                    </li>
                    <li>
                        <Link to='/user/profile'>Perfil</Link>
                    </li>
                    <li onClick={logout}>Sair</li>
                </>  
            ) : (
                <>
                    <li>
                        <Link to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastrar</Link>
                    </li>
                </>
            )}
            
        </ul>
    </nav>
  )
}

export default Navbar;