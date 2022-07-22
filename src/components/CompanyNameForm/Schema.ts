import * as Yup from "yup"

const Schema = Yup.object().shape({
    name: Yup.string()
})

export default Schema;