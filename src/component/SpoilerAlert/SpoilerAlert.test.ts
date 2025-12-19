import SpoilerAlert from "./SpoilerAlert.vue";
import { describe, expect, test, afterEach, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";

describe('SpoilerAlert', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SpoilerAlert);
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  })

  test('Элемента .secret нет в DOM при инициализации', () => {
    const secret = wrapper.find('.secret');
    expect(secret.exists()).toBe(false);
  })

  test('Если элемент .secret нет в DOM, клик по кнопке показывает его', async () => {
    expect(wrapper.find('.secret').exists()).toBe(false);

    const button = wrapper.get('button');
    await button.trigger('click');

    expect(wrapper.get('.secret').exists()).toBe(true);
  })

  test('Если элемент .secret есть в DOM, клик по кнопке скрывает его', async () => {
    wrapper.vm.isShow = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.secret').exists()).toBe(true);

    const button = wrapper.get('button');
    await button.trigger('click');

    expect(wrapper.find('.secret').exists()).toBe(false);
  })
})
