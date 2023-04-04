<script>
import { validateDate } from '../../utils/validationsForm';

export default {
    props:['data'],
    data() {
    return {
        errors: [],
        juristicPerson: {
            corporateName: this.data.juristicPerson.corporateName,
            cnpj: this.data.juristicPerson.cnpj,
            openingDate: this.data.juristicPerson.openingDate,
            phone: this.data.juristicPerson.phone,
        }
    }
  },
    methods: {
        handlePrevious() {
        this.$emit('previous', {
            juristicPerson: {
                corporateName: '',
                cnpj: '',
                openingDate: '',
                phone: ''
            },
            stepper: 1 
        })
      },
        submitForm() {
            this.errors = [];
            if(!this.juristicPerson.corporateName){
                this.errors.push('Nome é obrigatório')
            }
            if(!this.juristicPerson.cnpj){
                this.errors.push('Nome é obrigatório')
            }
            if(!this.juristicPerson.phone){
                this.errors.push('Telefone é obrigatório')
            }
            if(!validateDate(this.juristicPerson.openingDate)){
                this.errors.push('Data  no formato invalido')
            }
            if( this.errors.length) return


            this.$emit('submit', { juristicPerson: this.juristicPerson, stepper: 2  })

        }
    }

}
</script>

<template>
  <form>
    <h1 v-if="!data.readonly">Pessoa jurídica</h1>
    <div class="form-group">
      <label for="corporateName">Razão social:</label>
      <input type="text" id="corporateName" name="corporateName" v-model="juristicPerson.corporateName" class="form-control" :disabled="data.readonly">
    </div>
    <div class="form-group">
      <label for="cnpj">CNPJ:</label>
      <input type="text" id="cnpj" name="cnpj" v-model="juristicPerson.cnpj" class="form-control" v-mask="'##.###.###/####-##'" :disabled="data.readonly" >
    </div>
    <div class="form-group">
      <label for="openingDate">Data de abertura:</label>
      <input type="text" id="openingDate" name="openingDate" v-model="juristicPerson.openingDate" class="form-control" v-mask="'##/##/####'" :disabled="data.readonly">
    </div>
    <div class="form-group">
      <label for="birthDate">Telefone:</label>
      <input type="text" id="phone" name="phone" v-model="juristicPerson.phone" class="form-control" v-mask="'(##) # ####-####'" :disabled="data.readonly">
    </div>
    
    <div v-if="!data.readonly" class="d-flex">
      <button type="button" @click.prevent="handlePrevious" class="btn-previous" >Voltar</button>
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
