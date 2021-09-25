import { Button, TextField, MenuItem } from "@material-ui/core"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const TechForm = ({User, handleDelete, handleForm, setIsTechOrWork}) =>{

    const statusTech = [
        {
            value: "Iniciante",
            label: "Iniciante"
        },
        {
            value: "Itermediario",
            label: "Itermediario"
        },
        {
            value: "Avançado",
            label: "Avançado"
        },
        {
            value: "Pleno",
            label: "Pleno"
        }
    ]
    const [selected, setSelected] = useState("Iniciante")

    const schema = yup.object().shape({
        title: yup.string().required("Insira um título para a tecnologia").max(20, "Limite de 20 caracters"),
    })

    const showAllTech = item =>{
        return (
            <li className="Techs" key={item.id}>
                <h2>Tecnologia: {item.title}</h2>
                <p>{item.status}</p>
                <Button onClick={()=> handleDelete(item.id, "techs")} variant="contained">
                    Deletar
                </Button>
            </li>
        )
    }

    const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

    return (
        <>
            <form className="form_tech" onSubmit={handleSubmit(data => handleForm(data, "techs"))}>
                <div className="form_tech_inputs">
                    <TextField
                        label="Título da tecnologia:"
                        {...register("title")}
                        helperText={errors.title?.message}
                        variant="outlined"
                        />
                    <TextField
                        label="Estado:"
                        {...register("status")}
                        variant="outlined"
                        select={true}
                        value={selected}
                        onChange={(e)=> setSelected(e.target.value)}
                    >
                        {statusTech.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Button fullWidth={true} type="submit" variant="contained">Salvar</Button>
            </form>
                    <nav className="Tech_Or_Work_Nav">
                        <Button onClick={()=> setIsTechOrWork("tech")} variant="outlined">Tecnologias</Button>
                        <Button onClick={()=> setIsTechOrWork("work")} variant="outlined">Trabalhos</Button>
                    </nav>
            <ul className="Techs_list">
                {User.techs && User.techs.map(showAllTech)}
            </ul>
        </>
    )
}

export default TechForm;