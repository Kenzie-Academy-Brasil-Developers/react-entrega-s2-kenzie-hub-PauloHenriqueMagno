import { Button, TextField } from "@material-ui/core"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const WorkForm = ({User, handleDelete, handleForm, setIsTechOrWork}) =>{
    const schema = yup.object().shape({
        title: yup.string().required("Insira um título para o trabalho").max(20, "Limite de 20 caracters"),
        deploy_url: yup.string().required("Insira um link"),
        description: yup.string().required("Insira uma descrição")
    })

    const showAllWork = item =>{
        return (
            <li className="Works" key={item.id}>
                <h2>Titulo: {item.title}</h2>
                <p>Descrição: {item.description}</p>
                <p>Link: {item.deploy_url}</p>
                <Button onClick={()=> handleDelete(item.id, "works")} variant="contained">
                    Deletar
                </Button>
            </li>
        )
    }

    const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

    return (
        <>
            <form className="form_work" onSubmit={handleSubmit(data => handleForm(data, "works"))}>
                <div className="form_work_inputs">
                    <TextField
                        label="Título do trabalho:"
                        {...register("title")}
                        helperText={errors.title?.message}
                        variant="outlined"
                        />
                    <TextField
                        label="Descrição:"
                        {...register("description")}
                        variant="outlined"
                    />
                    <TextField
                        label="Link:"
                        {...register("deploy_url")}
                        variant="outlined"
                    />
                </div>
                <Button fullWidth={true} type="submit" variant="contained">Salvar</Button>
            </form>
                    <nav className="Tech_Or_Work_Nav">
                        <Button
                        onClick={()=> setIsTechOrWork("tech")}
                        variant="outlined">
                            Tecnologias
                        </Button>
                        <Button
                        onClick={()=> setIsTechOrWork("work")}
                        variant="outlined">
                            Trabalhos
                        </Button>
                    </nav>
            <ul className="Work_list">
                {User.works && User.works.map(showAllWork)}
            </ul>
        </>
    )
}

export default WorkForm;