const express = require("express");
const yup = require("yup");

const router = express.Router();

const userSchema = yup.object(
  {
    email: yup.string().required("Email com formato inválido"),
    password: yup.string().required("Campo senha é obrigatório"),
    typePerson: yup.string().required("Tipo de cadastro é obrigatório"),
    juristicPerson: yup.object().when('typePerson', {
        is: (typePerson) => {
            return typePerson === 'juridica'
        },
        then: () =>  {
            return yup.object({
            corporateName: yup.string().required("Nome da empresa é obrigatório "),
            cnpj: yup.string().required("CNPJ da empresa é obrigatório "),
            openingDate: yup.string().required("Data da abertura empresa é obrigatório "),
            phone: yup.string().required("Telefone da empresa é obrigatório "),
        }).required()},
    }),
    legalPerson: yup.object().when('typePerson', {
        is: (typePerson) => {
            return typePerson === 'fisica'
        },
        then: () =>  {
            return yup.object({
                name: yup.string().required("Nome é obrigatório "),
                cpf: yup.string().required("CPF é obrigatório "),
                birthDate: yup.string().required("Data da nascimento é obrigatório "),
                phone: yup.string().required("Telefone é obrigatório "),
        })},
    }),
  },
);

router.post("/", async (req, res) => {
  const user = req.body;
  try {
     await userSchema.validate(user,   {
        abortEarly: false,
      });
    res.status(200).json();
  } catch (err) {
    res.status(380).json(err);
  }
});

module.exports = router;
