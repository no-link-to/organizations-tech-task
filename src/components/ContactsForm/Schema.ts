import * as Yup from "yup"

const Schema = Yup.object().shape({
    fullName: Yup.string(),
    phone: Yup.string(),
    email: Yup.string().email("Введите правильный адрес электронной почты")
})

export default Schema;