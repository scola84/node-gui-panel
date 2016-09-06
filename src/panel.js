import { select } from 'd3-selection';
import Message from './message';
import PanelBar from './bar';

export default class Panel {
  constructor() {
    this._footer = null;
    this._header = null;
    this._message = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola panel', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%',
        'position': 'absolute',
        'width': '100%'
      });

    this._body = this._root
      .append('div')
      .classed('scola body', true)
      .styles({
        'background': '#EEE',
        'flex': 1,
        'order': 2,
        'overflow': 'auto',
        'position': 'relative',
        '-webkit-overflow-scrolling': 'touch'
      });
  }

  destroy() {
    if (this._footer) {
      this._footer.destroy();
      this._footer = null;
    }

    if (this._header) {
      this._header.destroy();
      this._header = null;
    }

    if (this._message) {
      this.append(this._message, false);
      this._message = null;
    }

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  body() {
    return this._body;
  }

  root() {
    return this._root;
  }

  append(element, action) {
    if (action === true) {
      this._body.node().appendChild(element.root().node());
    } else if (action === false) {
      element.root().remove();
    }

    return this;
  }

  footer(action) {
    if (typeof action === 'undefined') {
      return this._footer;
    }

    if (action === false) {
      this._footer.destroy();
      this._footer = null;

      return this;
    }

    this._footer = new PanelBar();

    this._footer.root()
      .classed('footer', true)
      .styles({
        'border-top': '1px solid #CCC',
        'order': 3
      });

    this._root.node().appendChild(this._footer.root().node());

    return this;
  }

  header(action) {
    if (typeof action === 'undefined') {
      return this._header;
    }

    if (action === false) {
      this._header.destroy();
      this._header = null;

      return this;
    }

    this._header = new PanelBar();

    this._header.root()
      .classed('header', true)
      .styles({
        'border-bottom': '1px solid #CCC',
        'order': 1
      });

    this._root.node().appendChild(this._header.root().node());

    return this;
  }

  message(value) {
    if (typeof value === 'undefined') {
      return this._message;
    }

    if (value === false) {
      if (this._message) {
        this.append(this._message, false);
        this._message = null;
        this._body.style('overflow', 'auto');
      }

      return this;
    }

    this._body.style('overflow', 'hidden');
    this._message = new Message().text(value);
    this.append(this._message, true);

    return this;
  }
}
