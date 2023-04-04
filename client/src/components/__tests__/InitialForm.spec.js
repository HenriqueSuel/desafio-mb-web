import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InitialForm from '../forms/InitialForm.vue'

describe('InitialForm', () => {
  it('should send form data as output', async () => {
    const wrapper = mount(InitialForm, {
      props: { data: { email: 'teste@teste.com', typePerson: 'fisical', readonly: false } }
    })

    wrapper.setData({
      email: 'new@example.com',
      typePerson: 'juridica'
    })
    
    const submitButton = wrapper.find('button[type="submit"]')
    
    submitButton.trigger('click.prevent')
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0]).toEqual([
      {
        email: 'new@example.com',
        typePerson: 'juridica',
        stepper: 1
      }
    ])
  })
  it('should show an email error required', async () => {
    const wrapper = mount(InitialForm, {
      props: { data: { email: '', typePerson: 'fisical', readonly: false } }
    })

    const input = wrapper.find('input[type="email"]')
    input.setValue('h.suel17@hotmai')

    const button = wrapper.find('button')
    await button.trigger('click')

    const errorMessage = wrapper.find('p')
    expect(errorMessage.text()).toBe('Por favor corrigir os erros abaixo:Email invalido')
  })
})
