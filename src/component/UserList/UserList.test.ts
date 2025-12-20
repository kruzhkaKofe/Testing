import UserList from "./UserList.vue";
import { describe, expect, test, afterEach, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";

const axiosSuccess = ['Иван', 'Никита'];

const getSpy = vi.spyOn(axios, "get");

describe('UserList', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  })

  test('Отрисовываем всех пользователей', async () => {
    getSpy.mockResolvedValue(axiosSuccess);
    wrapper = mount(UserList);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/users');

    await flushPromises();

    const users = wrapper.findAll('li');

    expect(users).toHaveLength(2);
    expect(users[0].text()).toContain('Иван');
    expect(users[1].text()).toContain('Никита');
  })

  test('Не отрисовываем список, если нет пользователей', async () => {
    getSpy.mockResolvedValue([]);
    wrapper = mount(UserList);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/users');

    await flushPromises();

    expect(wrapper.find('ul').exists()).toBe(false);
  })
})
