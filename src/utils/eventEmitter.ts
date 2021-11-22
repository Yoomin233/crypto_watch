type Events = string;

class EventEmitter {
  cbs: {
    [key: string]: any[];
  };
  constructor() {
    this.cbs = {};
  }
  subscribe(event: Events, cb: any) {
    if (!this.cbs[event]) {
      this.cbs[event] = [];
    }
    this.cbs[event].push(cb);
    return cb;
    // this.cbs.push(cb);
  }
  unsubscribe(event: Events, cb: any) {
    if (this.cbs[event]) {
      this.cbs[event] = this.cbs[event].filter((func) => func !== cb);
      if (this.cbs[event].length === 0) {
        delete this.cbs[event];
      }
    }
  }
  emit(event: Events, data: any) {
    if (this.cbs[event]) {
      this.cbs[event].forEach((cb) => cb(data));
    }
  }
}

export default new EventEmitter();
