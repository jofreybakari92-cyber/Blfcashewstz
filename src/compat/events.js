// src/compat/events.js
// A minimal EventEmitter ponyfill for Cloudflare Workers
class EventEmitter {
  constructor() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || 10;
  }

  // Add a listener for the given event
  on(eventName, listener) {
    return this._addListener(eventName, listener, false);
  }

  // Alias for on
  addListener(eventName, listener) {
    return this._addListener(eventName, listener, false);
  }

  // Add a one-time listener for the given event
  once(eventName, listener) {
    return this._addListener(eventName, listener, true);
  }

  // Remove the listener for the given event
  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }

  // Alias for off
  removeListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function');
    }

    if (!this._events || !this._events[eventName]) {
      return this;
    }

    const list = this._events[eventName];
    let position;
    let i;

    // Single listener case
    if (typeof list === 'function') {
      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._events[eventName] === 0) {
          delete this._events[eventName];
        }
      } else {
        return this;
      }
    } else {
      // Multiple listeners case
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }

      if (position < 0) {
        return this;
      }

      if (position === 0) {
        list.shift();
      } else {
        // eslint-disable-next-line no-restricted-properties
        list.splice(position, 1);
      }

      if (list.length === 1) {
        this._events[eventName] = list[0];
      }

      if (list.length === 0) {
        delete this._events[eventName];
      }
    }

    // Emit removeListener if needed
    if (this._events.removeListener) {
      this.emit('removeListener', eventName, listener || list);
    }

    return this;
  }

  // Remove all listeners, or those of the specified event
  removeAllListeners(eventName) {
    const listeners = this._events && this._events[eventName];
    if (!listeners) {
      return this;
    }

    if (typeof listeners === 'function') {
      delete this._events[eventName];
    } else {
      // eslint-disable-next-line no-restricted-properties
      this._events[eventName] = [];
    }
    return this;
  }

  // Emit an event
  emit(eventName, ...args) {
    let listeners = this._events && this._events[eventName];
    if (!listeners) {
      return false;
    }

    if (typeof listeners === 'function') {
      Reflect.apply(listeners, this, args);
    } else {
      // eslint-disable-next-line no-restricted-properties
      const len = listeners.length;
      const clone = Array.from(listeners); // Clone to avoid mutation issues
      for (let i = 0; i < len; ++i) {
        if (!clone[i]) {
          continue;
        }
        Reflect.apply(clone[i], this, args);
      }
    }
    return true;
  }

  // Return an array listing the events for which the emitter has registered listeners
  eventNames() {
    return this._events ? Object.keys(this._events) : [];
  }

  // Return a copy of the array of listeners for the given event
  listeners(eventName) {
    return this._listeners(eventName, false);
  }

  // Return a copy of the array of listeners for the given event, including wrappers
  rawListeners(eventName) {
    return this._listeners(eventName, true);
  }

  // Return the number of listeners for the given event
  listenerCount(eventName) {
    const listeners = this._events && this._events[eventName];
    if (!listeners) {
      return 0;
    }
    if (typeof listeners === 'function') {
      return 1;
    }
    // eslint-disable-next-line no-restricted-properties
    return listeners.length;
  }

  // Add a listener to the beginning of the listeners array for the given event
  prependListener(eventName, listener) {
    return this._addListener(eventName, listener, true);
  }

  // Add a one-time listener to the beginning of the listeners array for the given event
  prependOnceListener(eventName, listener) {
    return this._addListener(eventName, listener, true);
  }

  // Set the max listeners
  setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number');
    }
    this._maxListeners = n;
    return this;
  }

  // Get the max listeners
  getMaxListeners() {
    return this._maxListeners;
  }

  // Internal method to add a listener
  _addListener(eventName, listener, once) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function');
    }

    // Initialize events object if needed
    if (!this._events) {
      this._events = {};
    }

    // Avoid recursion in case of setMaxListeners
    if (this._events.newListener) {
      this.emit('newListener', eventName, listener ? listener.listener : listener);
    }

    // Add listener to events
    if (!this._events[eventName]) {
      // Optimization for single listener case
      this._events[eventName] = listener;
    } else if (typeof this._events[eventName] === 'function') {
      // Convert to array if needed
      this._events[eventName] = [
        this._events[eventName],
        listener
      ];
    } else {
      // Push to existing array
      if (once) {
        // Add to beginning for once listeners
        this._events[eventName].unshift(listener);
      } else {
        // Add to end for regular listeners
        this._events[eventName].push(listener);
      }
    }

    // Check for listener limit
    if (this._events[eventName] && !this._events[eventName].warned) {
      let m;
      if (this._maxListeners !== undefined) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.prototype._maxListeners;
      }
      if (m && m > 0 && this._events[eventName].length > m) {
        this._events[eventName].warned = true;
        const w = new Error('Possible EventEmitter memory leak detected. ' +
            this._events[eventName].length + ' ' + String(eventName) + ' listeners. ' +
            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = this;
        w.type = eventName;
        w.count = this._events[eventName].length;
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }

    return this;
  }

  // Internal method to get listeners
  _listeners(eventName, asRaw) {
    const listeners = this._events && this._events[eventName];
    if (!listeners) {
      return [];
    }

    if (typeof listeners === 'function') {
      return asRaw ? [listeners] : [listeners.listener || listeners];
    }

    // Clone array to avoid mutation issues
    // eslint-disable-next-line no-restricted-properties
    const len = listeners.length;
    const result = new Array(len);
    // eslint-disable-next-line no-restricted-properties
    for (let i = 0; i < len; ++i) {
      result[i] = asRaw ? listeners[i] : listeners[i].listener || listeners[i];
    }
    return result;
  }
}

// Export as ES module
export { EventEmitter };
// Also export default for compatibility (though Node's events module exports the class directly)
export default EventEmitter;