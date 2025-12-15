import UserGreeting from './UserGreeting.vue';
import { mount } from '@vue/test-utils';
import { describe, test, expect, afterEach } from 'vitest';

const createWrapper = (props = {}) => {
  return mount(UserGreeting, {
    props
  });
};

describe('UserGreeting', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  })

  test('Отображает "Привет, гость!"', () => {
    wrapper = createWrapper();

    expect(wrapper.text()).toContain('Привет, гость!');
  })

  test('Отображает "Привет, {{ props.name }}!"', () => {
    wrapper = createWrapper({ name: 'Василий' });

    expect(wrapper.text()).toContain('Привет, Василий!');
  })
})
