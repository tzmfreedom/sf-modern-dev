import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import List from '@/components/List.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import routes from '@/routes.js'
const router = new VueRouter({ routes })

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(BootstrapVue)

describe('Component', () => {
  test('is a Vue instance', async () => {
    const wrapper = mount(List, { localVue, router })
    expect(wrapper.isVueInstance()).toBeTruthy()
    await flushPromises()
    expect(wrapper.findAll('#account-list tbody tr').length).toBe(2)
    expect(wrapper.vm.records.length).toBe(2)
    expect(wrapper.vm.records[0]).toStrictEqual({
      Id: '123',
      Name: 'hogehoge',
      CreatedDate: 1536666350000,
    })
  })
})