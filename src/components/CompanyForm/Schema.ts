import * as Yup from "yup"

const Schema = Yup.object().shape({
    fullName: Yup.string(),
    contractNumber: Yup.string(),
    contractDate: Yup.string(),
    businessEntity: Yup.string(),
    type: Yup.string()
})

export default Schema;