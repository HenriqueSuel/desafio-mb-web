<script>
import { validateEmail } from '../../utils/validationsForm';

export default {
    props:['data'],
    data() {
      return {
        errors: [],
        email: this.data.email,
        typePerson: this.data.typePerson
      }
  },
    methods: {
        submitForm() {
            this.errors = [];
            if(!validateEmail(this.email)) {
                this.errors.push('Email invalido');
                return
            }
            this.$emit('submit', { email: this.email, typePerson: this.typePerson, stepper: 1 })
        },
    }

}
</script>

<template>
  <form>
    <h1 v-if="!data.readonly">Seja bem Vindo(a)</h1>
    <div class="form-group">
      <label for="email">E-mail:</label>
      <input type="email" id="email" name="email" v-model="email" class="form-control" :disabled="data.readonly">
    </div>
    <div class="form-group" v-if="!data.readonly">
      <label for="tipo">Tipo de cadastro:</label>
      <div class="radio-group">
        <input type="radio" id="pessoa-fisica" name="tipo" value="fisica" v-model="typePerson">
        <label for="pessoa-fisica">Pessoa física</label>
        <input type="radio" id="pessoa-juridica" name="tipo" value="juridica" v-model="typePerson">
        <label for="pessoa-juridica">Pessoa jurídica</label>
      </div>
    </div>
    <button v-if="!data.readonly" type="submit" @click.prevent="submitForm" class="btn-register">Cadastrar</button>
  
    <p v-if="errors.length">
    <b>Por favor corrigir os erros abaixo:</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
  
  </form>
</template>

<style>
.radio-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.radio-group input[type="radio"] {
  height: 18px;
  width: 18px;
}

.radio-group input[type="radio"]:last-of-type {
  margin-left: 10px;
}

</style>