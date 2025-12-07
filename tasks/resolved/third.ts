type LogoutCallback = () => void;

export class SessionManager {
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private onLogout: LogoutCallback,
    private timeoutMs: number = 5000
  ) { }

  start() {
    this.reset();
  }

  reset() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.onLogout();
    }, this.timeoutMs);
  }

  stop() {
    if (this.timer) clearTimeout(this.timer);
  }
}
