<script>
import { validateDate } from '../../utils/validationsForm';

export default {
  props:['data'],
    data() {
    return {
        errors: [],
        legalPerson: {
          name: this.data.legalPerson.name,
          cpf: this.data.legalPerson.cpf,
          birthDate: this.data.legalPerson.birthDate,
          phone: this.data.legalPerson.phone
        }
       
    }
  },
    methods: {
      handlePrevious() {
        this.$emit('previous', {
          legalPerson: {
            name: '',
            cpf: '',
            birthDate: '',
            phone: ''
        },
          stepper: 1 
        })
      },
        submitForm() {
            this.errors = [];
            if(!this.legalPerson.name){
                this.errors.push('Nome é obrigatório')
            }
            if(!this.legalPerson.cpf){
                this.errors.push('Nome é obrigatório')
            }
            if(!this.legalPerson.phone){
                this.errors.push('Telefone é obrigatório')
            }
            if(!validateDate(this.legalPerson.birthDate)){
                this.errors.push('Data  no formato invalido')
            }
            if( this.errors.length) return

            this.$emit('submit', {legalPerson: this.legalPerson, stepper: 2 })

        }
    }

}
</script>

<template>
  <form>
    <h1 v-if="!data.readonly">Pessoa Física</h1>
    <div class="form-group">
      <label for="name">Nome:</label>
      <input type="text" id="name" name="name" v-model="legalPerson.name" class="form-control" :disabled="data.readonly">
    </div>
    <div class="form-group">
      <label for="cpf">CPF:</label>
      <input type="text" id="cpf" name="cpf" v-model="legalPerson.cpf" class="form-control" v-mask="'###.###.###-##'" :disabled="data.readonly">
    </div>
    <div class="form-group">
      <label for="birthDate">Data de nascimento:</label>
      <input type="text" id="birthDate" name="birthDate" v-model="legalPerson.birthDate" class="form-control" v-mask="'##/##/####'" :disabled="data.readonly">
    </div>
    <div class="form-group">
      <label for="birthDate">Telefone:</label>
      <input type="text" id="phone" name="phone" v-model="legalPerson.phone" class="form-control" v-mask="'(##) # ####-####'" :disabled="data.readonly">
    </div>
    
    <div v-if="!data.readonly" class="d-flex">
      <button type="submit" @click.prevent="handlePrevious" class="btn-previous">Voltar</button>
      <button type="submit" @click.prevent="submitForm" class="btn-register">Cadastrar</button>

    </div>
  
    <p v-if="errors.length">
    <b>Por favor corrigir os erros abaixo:</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p> 
  </form>
</template>
