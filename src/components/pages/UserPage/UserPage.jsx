import api from "../../services/api";
import login from "../../services/login";
import { toast } from 'react-toastify'
import { useState } from "react"
import TechForm from "./TechForm";
import WorkForm from "./WorkForm";

const UserPage = ({User, setUser}) =>{
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))
    const [isTechOrWork, setIsTechOrWork] = useState("Tech")

    const handleForm = (data, type) =>{
        api.post(`/users/${type}`, data, {
            "headers": {
              "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            toast.success("Item cadastrado com sucesso")
            login(setUser)
        }).catch(err => toast.error("Falha em cadastrar o item"))
    }
    
    const handleDelete = (techId, type) =>{
        console.log(techId)
        api.delete(`users/${type}/${techId}`, {
            "headers": {
              "Authorization": `Bearer ${token}`
        }}).then(response => {
            toast.success("Item deletado com sucesso")
            login(setUser)
        }).catch(err => toast.error("Falha em deletar"))
    }

    return (
        <>  
            {isTechOrWork==="tech"?
                <TechForm
                    handleForm={handleForm}
                    handleDelete={handleDelete}
                    User={User}
                    setIsTechOrWork={setIsTechOrWork}
                />:
                <WorkForm
                    handleForm={handleForm}
                    handleDelete={handleDelete}
                    User={User}
                    isTechOrWork={isTechOrWork}
                    setIsTechOrWork={setIsTechOrWork}
                />
            }
        </>
    )
}

export default UserPage;