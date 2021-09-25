import { Button, TextField} from "@material-ui/core"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";
import { toast } from 'react-toastify'
import login from "../services/login";

const Profile = ({User, setUser}) =>{
    const history = useHistory()

    const schema = yup.object().shape({
        name: yup.string()
            .required("Nome é obrigatório"),
        email: yup.string()
            .required("Insira um email")
            .email("Insira um e-mail valido"),
        contact: yup.string()
            .required("Insira um contato")
            .matches(/[0-9]$/, "O telefone deve conter apenas numeros")
            .min(10, "Insira um numero valido"),
        bio: yup.string()
            .required("Insira uma bio"),
        old_password: yup.string()
            .required("Insira sua senha atual"),
        password: yup.string()
            .required("Insira sua nova senha")
            .min(5, "Senha deve ter no minimo 5 caracters"),
        passwordConfirm: yup.string()
            .required("Confirme sua nova senha")
            .oneOf([yup.ref("password")], "Senhas estão diferentes"),
        course_module: yup.string()
            .required("Insira seu modulo")
    })

    const handleForm = ({name, email, contact, bio, old_password, password, course_module}) =>{
        const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))

        const user = {
            "name": name,
            "email": email,
            "contact": contact,
            "bio": bio,
            "old_password": old_password,
            "password": password,
            "course_module": course_module
        }

        api.put("/profile", user , {
            "headers": {
              "Authorization": `Bearer ${token}`,
            }})
            .then(response => {
                toast.success("Alterações salvas com sucesso!")
                login(setUser);
                history.push("/")
            })
    }

    const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

    return (
        <form className="form_profile" onSubmit={handleSubmit(handleForm)}>
            <h2>Modificar perfil</h2>
            <div className="input">
                <p>Nome atual: {User.name}</p>
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Nome"
                    {...register("name")}
                    helperText={errors.name?.message}
                />
            </div>
            <div className="input">
                <p>E-mail atual: {User.email}</p>
                <TextField
                    fullWidth={true}
                    variant= "outlined"
                    label="E-mail"
                    {...register("email")}
                    helperText={errors.email?.message}
                />
            </div>
            <div className="input">
                <p>Contato atual: {User.contact}</p>
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Tel/celular"
                    {...register("contact")}
                    type="tel"
                    helperText={errors.contact?.message}
                />
            </div>
            <div className="input">
                <p>Bio atual: {User.bio}</p>
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Bio"
                    {...register("bio")}
                    type="text"
                    helperText={errors.bio?.message}
                />
            </div>
            <div className="input">
                <p>Modulo atual: {User.course_module}</p>
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Modulo do curso"
                    {...register("course_module")}
                    type="text"
                    helperText={errors.course_module?.message}
                />
            </div>
            <div className="input">
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Senha atual"
                    type="password"
                    {...register("old_password")}
                    helperText={errors.old_password?.message}
                />
            </div>
            <div className="input">
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Nova senha"
                    type="password"
                    {...register("password")}
                    helperText={errors.password?.message}
                />
            </div>
            <div className="input">
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="Confirme a nova senha"
                    type="password"
                    {...register("passwordConfirm")}
                    helperText={errors.passwordConfirm?.message}
                />
            </div>
            <div className="Submit_Button">
                <Button fullWidth={true} type="submit" variant="contained">Salvar</Button>
            </div>
        </form>
    )
}

export default Profile;