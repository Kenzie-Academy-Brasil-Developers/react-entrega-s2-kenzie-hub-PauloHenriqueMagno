import api from "../services/api"
import { toast } from 'react-toastify'

const login = (setUser) =>{
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))

    api.get("/profile", {
        "headers": {
          "Authorization": `Bearer ${token}`,
        }
        })
        .then(response => {
            setUser(response.data)
        })
        .catch(err => toast.error("Falha em entrar na conta"))
}

export default login;