import CounterButton from "./CounterButton.vue";
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';

describe('CounterButton', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(CounterButton);
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  })

  test('Начальное значение равно 0', () => {
    expect(wrapper.vm.counter).toBe(0);
  });

  test('Находит кнопку и симулирует клик по ней', async () => {
    const button = wrapper.get('button');
    await button.trigger('click');

    expect(wrapper.vm.counter).toBe(1);
  })
})
