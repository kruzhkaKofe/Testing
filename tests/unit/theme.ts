export class SettingsService {
  private readonly KEY = 'user_settings';

  saveTheme(theme: 'dark' | 'light') {
    localStorage.setItem(this.KEY, JSON.stringify({ theme }));
  }

  getTheme(): 'dark' | 'light' {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data).theme : 'light';
  }
}
