import { Button, TextField} from "@material-ui/core"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import api from "../services/api"
import { toast } from 'react-toastify'

const LoginPage = ({setIsLogged, login, setUser}) =>{
    const schema = yup.object().shape({
        email: yup.string()
            .required("E-mail é obrigatório")
            .email("Insira um e-mail valido"),
        password: yup.string()
            .required("Senha é obrigatória")
    })

    const handleForm = (data) =>{
        api.post("/sessions", data)
            .then((response) => {
                localStorage.clear()
                localStorage.setItem("@KenzieHub:token", JSON.stringify(response.data.token))
                login(setUser)
                setIsLogged(true)
                toast.success("Conta acessada")
            }).catch(err => toast.error("E-mail ou senha incorreto!"))
    }

    const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

    return (
        <form className="form_login" onSubmit={handleSubmit(handleForm)}>
            <div className="form_inputs">
                <div className="input">
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        label="E-mail"
                        {...register("email")}
                        helperText={errors.email?.message}
                    />
                </div>
                <div className="input">
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        label="Senha"
                        type="password"
                        {...register("password")}
                        helperText={errors.password?.message}
                    />
                </div>
            </div>
            <div className="Submit_Button">
                <Button fullWidth={true} type="submit" variant="contained">Login</Button>
            </div>
        </form>
    )
}

export default LoginPage;