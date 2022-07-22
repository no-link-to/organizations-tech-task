import * as Yup from "yup"

const Schema = Yup.object().shape({
    fullName: Yup.string(),
    contract: Yup.string(),
    businessEntity: Yup.string(),
    type: Yup.string()
})

export default Schema;