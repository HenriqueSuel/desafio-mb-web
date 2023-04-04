<script>
import InitialForm from '../components/forms/InitialForm.vue';
import LegalPerson from '../components/forms/LegalPerson.vue';
import juristicPerson from '../components/forms/JuristicPerson.vue';
import PasswordForm from '../components/forms/PasswordForm.vue';
import { api } from '../services/api';
import { useToast } from "vue-toastification";

export default {

  components: {
    InitialForm,
    LegalPerson,
    juristicPerson,
    PasswordForm,
  },
  data() {
    return {
      stepper: 1,
      email: '',
      typePerson: 'fisica',
      password: '',
      juristicPerson: {
        corporateName: '',
        cnpj: '',
        openingDate: '',
        phone: ''
      },
      legalPerson: {
        name: '',
        cpf: '',
        birthDate: '',
        phone: ''
      }
    }
  },
  methods: {
    handlePrevious(data) {
      Object.assign(this.$data, {
        ...data,
        stepper: data.stepper
      });
    },
    handleSubmit(data) {
      Object.assign(this.$data, {
        ...data,
        stepper: data.stepper + 1
      });
    },
    async handleRegiter() {
      const toast = useToast();
      const data = this.$data;

      try {
        await api.post('/registration', data);
        toast.success("Cadastrado com sucesso", {
          timeout: 2000
        });
        const dataDefault = {
        stepper: 0,
        email: '',
        typePerson: '',
        password: '',
        juristicPerson: {
          corporateName: '',
          cnpj: '',
          openingDate: '',
          phone: ''
        },
        legalPerson: {
          name: '',
          cpf: '',
          birthDate: '',
          phone: ''
        }
      }
      this.handleSubmit(dataDefault)
      } catch (error) {
        error.response.data.errors.forEach(error => {
          toast.error(error, {
          timeout: 2000
        });
        })
      }
    },
  },
}
</script>

<template>
  <div class="container">
    <span> Etapa <strong>{{ stepper }}</strong> de 4</span>
    <h1 v-if="stepper === 4">Revise suas informações</h1>
    <InitialForm v-if="stepper === 1 || stepper === 4" @submit="handleSubmit"
      :data="{ email, typePerson, readonly: stepper > 3 }" />
    <LegalPerson v-if="(stepper === 2 || stepper === 4) && typePerson === 'fisica'" @submit="handleSubmit"
      @previous="handlePrevious" :data="{ legalPerson, readonly: stepper === 4 }" />
    <juristicPerson v-if="(stepper === 2 || stepper === 4) && typePerson === 'juridica'" @submit="handleSubmit"
      @previous="handlePrevious" :data="{ juristicPerson, readonly: stepper === 4 }" />
    <PasswordForm v-if="stepper === 3 || stepper === 4" @submit="handleSubmit" @previous="handlePrevious"
      :data="{ password, readonly: stepper === 4 }" />

    <div v-if="stepper === 4" class="d-flex">
      <button type="button" @click.prevent="handlePrevious({stepper: 3})" class="btn-previous">Voltar</button>
      <button type="button" @click.prevent="handleRegiter" class="btn-register">Cadastrar</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 0px;
  margin-bottom: 0px;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 56px auto;
  max-width: 500px;
  background-color: #f5f5f5;
  padding: 20px 20px 32px;
  border-radius: 5px;
}
</style>