import BaseCard from './BaseCard.vue';
import { mount } from '@vue/test-utils';
import { describe, test, expect, afterEach } from 'vitest';
import { h } from 'vue';

const createWrapper = (slots = {}) => {
  return mount(BaseCard, {
    slots
  });
};

describe('UserGreeting', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  })

  test('Отображает пустой .card, если слоты не переданы', () => {
    wrapper = createWrapper();

    const card = wrapper.get('.card');
    expect(card.text()).toBe('');
  })

  test('Отображает слот header', () => {
    wrapper = createWrapper({
      header: h('h1', {}, 'Header slot')
    });

    const header = wrapper.get('h1');
    expect(header.exists()).toBe(true);
  })

  test('Отображает слот default', () => {
    wrapper = createWrapper({
      default: '<span>Слот по умолчанию</span>'
    });

    const defaultSlot = wrapper.get('span');
    expect(defaultSlot.exists()).toBe(true);
  })

  test('Отображает слот header и default', () => {
    wrapper = createWrapper({
      default: '<span>Слот по умолчанию</span>',
      header: h('h1', {}, 'Header slot'),
    });

    const defaultSlot = wrapper.get('span');
    expect(defaultSlot.exists()).toBe(true);

    const header = wrapper.get('h1');
    expect(header.exists()).toBe(true);
  })

})
