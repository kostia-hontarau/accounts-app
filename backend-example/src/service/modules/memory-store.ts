export class MemoryStore {
  sessions: Record<string, unknown>;

  constructor() {
    this.sessions = {};
  }

  get(sid: string) {
    return this.sessions[sid];
  }

  set(sid: string, val: any) {
    this.sessions[sid] = val;
  }

  destroy(sid: string) {
    delete this.sessions[sid];
  }
}
