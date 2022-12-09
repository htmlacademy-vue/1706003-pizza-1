import {formatCurrency, normalizeUser} from '@/common/helpers';

describe('test helpers functions', () => {

  it('test format currency', () => {
    expect(formatCurrency(100)).toBe('100,00 ₽');
    expect(formatCurrency(1000, "EUR")).toBe('1 000,00 €');
  });

  it('test normolize user', () => {
    const user = {
      avatar: "string.jpg"
    }
    const normolisedUser = normalizeUser(user);

    expect(normolisedUser.hasOwnProperty('avatar')).toBe(true);
    expect(normolisedUser.avatar.hasOwnProperty('jpg')).toBe(true);
    expect(normolisedUser.avatar.hasOwnProperty('jpg2x')).toBe(true);
    expect(normolisedUser.avatar.hasOwnProperty('webp')).toBe(true);
    expect(normolisedUser.avatar.hasOwnProperty('webp2x')).toBe(true);
    expect(normolisedUser.avatar.jpg).toBe("string.jpg");
    expect(normolisedUser.avatar.jpg2x).toBe("string@2x.jpg");
    expect(normolisedUser.avatar.webp).toBe("string.webp");
    expect(normolisedUser.avatar.webp2x).toBe("string@2x.webp");
  })

});