import { Button } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const Header = ({isLogged, setIsLogged}) =>{
    const history = useHistory()

    const quit = () =>{
        localStorage.clear();
        setIsLogged(false);
        history.push("/")
    }
    return (
        <header>
            <div className="container">
                <h1>KenzieHub</h1>
                <nav>
                    <ul>
                        {!isLogged?
                        <>
                            <li><Button onClick={()=> history.push("/")} variant="contained">Entrar</Button></li>
                            <li><Button onClick={()=> history.push("/sign_in")} variant="contained">Cadastrar</Button></li>
                        </>:
                        <>
                            <li><Button onClick={()=> history.push("/")} variant="contained">Home</Button></li>
                            <li><Button onClick={()=> history.push("/profile")} variant="contained">Perfil</Button></li>
                            <li><Button onClick={()=> quit} variant="contained">Sair</Button></li>
                        </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;