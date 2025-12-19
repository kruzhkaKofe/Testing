// Задача 4: Форма обратной связи (Emitting Events)
// Компонент: FeedbackForm.vue
// Компонент содержит input (для email) и кнопку "Отправить".

// При нажатии на кнопку компонент эмитит событие submit-form с payload-объектом: { email: 'значение из инпута' }.

// Задание:
// Протестируйте отправку события:

// Смонтируйте компонент.

// Установите значение в инпут (используйте setValue).

// Сэмулируйте сабмит формы.

// Проверьте, что событие submit-form было вызвано ровно один раз.

// Проверьте, что событие ушло с правильным email.
// Подсказка: используйте свойство wrapper.emitted() для проверки.
//

import FeedbackForm from "./FeedbackForm.vue";
import { describe, expect, test, afterEach, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";

describe("SpoilerAlert", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FeedbackForm);
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  test("Cобытие submit-form было вызвано ровно один раз", async () => {
    const button = wrapper.get("button");
    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("submitForm");
  });

  test("Cобытие ушло с правильным email", async () => {
    const input = wrapper.get("input");
    await input.setValue("someValue");

    const button = wrapper.get("button");
    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("submitForm");
    expect(wrapper.emitted().submitForm[0]).toEqual([{ email: "someValue" }]);
  });
});
