<script>

export default {
  props: ['data'],
    data() {
    return {
      errors: [],
      password: this.data.password,
    }
  },
    methods: {
      handlePrevious() {
        this.$emit('previous', {
          password: '',
          stepper: 2
        })
      },
        submitForm() {
            this.errors = [];
            if(!this.password) {
                this.errors.push('Senha obrigatória');
                return
            }
            this.$emit('submit', { password: this.password, stepper: 3 })
        },
    }

}
</script>

<template>
  <form>
    <h1 v-if="!data.readonly">Senha de acesso</h1>
    <div class="form-group">
      <label for="password">Senha:</label>
      <input type="password" id="password" name="password" v-model="password" class="form-control" :disabled="data.readonly">
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

<style>

h1 {
  margin-top: 0px;
  margin-bottom: 0px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-size: 18px;
  color: #444;
}

.form-control {
  padding: 10px;
  height:  21px;
  padding: 10px;
  border: 2px solid #999999;
  border-radius: 5px;
  font-size: 16px;
  color: #000000;
}

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

.btn-cadastrar {
  background-color: #ED771C;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-cadastrar:hover {
  background-color: #F7931A;
}
</style>