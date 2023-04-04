import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JuristicPerson from '../forms/JuristicPerson.vue'

describe('JuristicPerson', () => {
  it('should send form data as output', async () => {
    const wrapper = mount(JuristicPerson, {
      props: {
        data: {
          juristicPerson: {
            corporateName: '',
            cnpj: '',
            openingDate: '',
            phone: ''
          },
          readonly: false
        }
      }
    })

    wrapper.find('.btn-previous').trigger('click')
    expect(wrapper.emitted().previous).toBeTruthy()
  })

  it('should emit submit event when submitForm is called with valid data', () => {
    const wrapper = mount(JuristicPerson, {
      propsData: {
        data: {
          readonly: false,
          juristicPerson: {
            corporateName: 'Acme Corp',
            cnpj: '12.345.678/0001-90',
            openingDate: '01/01/2022',
            phone: '(99) 91234-5678'
          }
        }
      }
    })

    wrapper.find('.btn-register').trigger('click')
    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted('submit')[0]).toEqual([
      {
        stepper: 2,
        juristicPerson: {
          corporateName: 'Acme Corp',
          cnpj: '12.345.678/0001-90',
          openingDate: '01/01/2022',
          phone: '(99) 91234-5678'
        }
      }
    ])
  })
})
