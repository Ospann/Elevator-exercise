import handleSoundPlay from './handleSoundPlay';
import sound from '../assets/sounds.mp3';

// Создаем mock для объекта Audio
jest.mock('global/window', () => ({
  ...jest.requireActual('global/window'),
  Audio: jest.fn(() => ({
    play: jest.fn()
  }))
}));

describe('handleSoundPlay', () => {
  it('should play sound', () => {
    handleSoundPlay();
    expect(Audio).toHaveBeenCalledTimes(1); // Проверяем, что объект Audio был создан
    expect(Audio).toHaveBeenCalledWith(sound); // Проверяем, что Audio был создан с правильным аргументом
    expect(new Audio().play).toHaveBeenCalledTimes(1); // Проверяем, что функция play была вызвана у объекта Audio
  });
});
