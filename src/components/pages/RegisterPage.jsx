import { Button, TextField} from "@material-ui/core"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";
import { toast } from 'react-toastify'

const RegisterPage = () =>{
    const history = useHistory()

    const schema = yup.object().shape({
        name: yup.string()
            .required("Nome é obrigatório"),
        email: yup.string()
            .required("E-mail é obrigatório")
            .email("Insira um e-mail valido"),
        emailConfirm: yup.string()
            .required("Confirme seu e-mail")
            .oneOf([yup.ref("email")], "E-mails são diferentes"),
        contact: yup.string()
            .required("Tel/celular é obrigatório")
            .matches(/[0-9]$/, "O telefone deve conter apenas numeros")
            .min(10, "Insira um numero valido"),
        password: yup.string()
            .required("Senha é obrigatória")
            .min(5, "Senha deve ter no minimo 5 caracters"),
        passwordConfirm: yup.string()
            .required("Confirme sua senha")
            .oneOf([yup.ref("password")], "Senhas estão diferentes"),
    })

    const handleForm = ({ name, email, contact, password }) =>{
        api.post("/users", { 
            "name": name,
            "email": email,
            "contact": contact,
            "password": password, 
            "course_module": "Modulo não definido",
            "bio": "Bio não definido"
        })
            .then(response => {
                toast.success("Cadastrado com sucesso!")
                history.push("/")
            })
            .catch(err => toast.error("E-mail já em uso, tente outro."))
    }

    const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

    return (
        <form className="form_register" onSubmit={handleSubmit(handleForm)}>
            <div className="form_inputs">
                <div className="input">
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        label="Nome"
                        {...register("name")}
                        helperText={errors.name?.message}
                    />
                </div>
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
                        label="Confirme o e-mail"
                        {...register("emailConfirm")}
                        helperText={errors.emailConfirm?.message}
                    />
                </div>
                <div className="input">
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        label="Tel/celular"
                        {...register("contact")}
                        type="tel"
                        helperText={errors.contact?.message}
                    />
                </div>
                <div className="form_inputs_password">
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
                    <div className="input">
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            label="Confirme senha"
                            type="password"
                            {...register("passwordConfirm")}
                            helperText={errors.passwordConfirm?.message}
                        />
                    </div>
                </div>
            </div>
            <div className="Submit_Button">
                <Button fullWidth={true} type="submit" variant="contained">Cadastrar</Button>
            </div>
        </form>
    )
}

export default RegisterPage;