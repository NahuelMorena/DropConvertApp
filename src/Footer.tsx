import { FaGithub, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Footer = (): JSX.Element => {
    return (
        <footer className="footer">
            <p>© 2025 Tu Nombre o Equipo. Todos los derechos reservados.</p>
            <div className="footer-links">
                <a href="https://github.com/NahuelMorena/PreprocessorFileApp" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={20} /> GitHub
                </a>
                <a href="mailto:nahuel1morena1@gmail.com">
                    <FaEnvelope size={20} /> Contacto
                </a>
                <a href="/privacy-policy">
                    <FaShieldAlt size={20} /> Política de Privacidad
                </a>
            </div>
            <p className="footer-version">Versión 1.0.0</p>
        </footer>
    )
}

export default Footer;