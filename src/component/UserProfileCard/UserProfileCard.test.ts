import UserProfileCard from "./UserProfileCard.vue";
import { describe, test, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";

describe('UserProfileCard', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  })

  test('Передаем avatarUrl', () => {
    wrapper = mount(UserProfileCard, {
      props: {
        name: 'Василий',
        role: 'Продавец',
        avatarUrl: '/img.png'
      }
    })

    expect(wrapper.html()).toMatchSnapshot();
  })

  test('Не передаем avatarUrl', () => {
    wrapper = mount(UserProfileCard, {
      props: {
        name: 'Антон',
        role: 'Учитель',
      }
    })

    expect(wrapper.html()).toMatchSnapshot();
  })
})
