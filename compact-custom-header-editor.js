const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

const clockOptions = ["", "menu", "notifications", "voice", "options"];

export class CompactCustomHeaderEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  static get properties() {
    return { _config: {} };
  }

  render() {
    return html`
      ${this.renderStyle()}
      <cch-config-editor
        .config="${this._config}"
        @cch-config-changed="${this._configChanged}"
      >
      </cch-config-editor>
      <h3>Exceptions</h3>
      ${this._config.exceptions
        ? this._config.exceptions.map((exception, index) => {
            return html`
              <cch-exception-editor
                .exception="${exception}"
                .index="${index}"
                @cch-exception-changed="${this._exceptionChanged}"
                @cch-exception-delete="${this._exceptionDelete}"
              >
              </cch-exception-editor>
            `;
          })
        : ""}
      <paper-button elevated @click="${this._addException}"
        >Add Exception
      </paper-button>
    `;
  }

  _addException() {
    if (this._config.exceptions) {
      this._config.exceptions.push({ conditions: {}, config: {} });
    } else {
      this._config.exceptions = [{ conditions: {}, config: {} }];
    }
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  _configChanged(ev) {
    if (!this._config) {
      return;
    }
    this._config = { ...this._config, ...ev.detail.config };
    fireEvent(this, "config-changed", { config: this._config });
  }

  _exceptionChanged(ev) {
    if (!this._config) {
      return;
    }
    const target = ev.target;
    this._config.exceptions[target.index] = ev.detail.exception;
    fireEvent(this, "config-changed", { config: this._config });
  }

  _exceptionDelete(ev) {
    if (!this._config) {
      return;
    }
    const target = ev.target;
    this._config.exceptions.splice(target.index, 1);
    fireEvent(this, "config-changed", { config: this._config });
    this.requestUpdate();
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          margin-bottom: 0;
        }
      </style>
    `;
  }
}

customElements.define(
  "compact-custom-header-editor",
  CompactCustomHeaderEditor
);

export class CchConfigEditor extends LitElement {
  static get properties() {
    return { config: {}, minimal: {} };
  }

  get _clock() {
    return this.config.clock || "";
  }

  get _clock_format() {
    return this.config.clock_format || "12";
  }

  get _clock_am_pm() {
    return this.config.clock_am_pm || true;
  }

  get _parent_card() {
    return this.config.parent_card == true || false;
  }

  get _disable() {
    return this.config.disable == true || false;
  }

  get _background_image() {
    return this.config.background_image == true || false;
  }

  render() {
    return html`
      ${this.renderStyle()}
      <paper-toggle-button
        ?checked="${this._disable !== false}"
        .configValue="${" disable"}"
        @change="${this._valueChanged}"
      >
        Disable Custom Compact Header
      </paper-toggle-button>
      ${this.minimal === undefined
        ? html`
            <paper-toggle-button
              ?checked="${this._parent_card !== false}"
              .configValue="${"parent_card"}"
              @change="${this._valueChanged}"
            >
              Parent Card
            </paper-toggle-button>
            <paper-toggle-button
              ?checked="${this._background_image !== false}"
              .configValue="${"background_image"}"
              @change="${this._valueChanged}"
            >
              Background Image Fix
            </paper-toggle-button>
          `
        : ""}
      <h4>Button Visability:</h4>
      <div class="side-by-side">
        <paper-toggle-button
          ?checked="${this.config.menu !== false}"
          .configValue="${"menu"}"
          @change="${this._valueChanged}"
        >
          <iron-icon icon="hass:menu"></iron-icon> Menu
        </paper-toggle-button>
        <paper-toggle-button
          ?checked="${this.config.notifications !== false}"
          .configValue="${"notifications"}"
          @change="${this._valueChanged}"
        >
          <iron-icon icon="hass:bell"></iron-icon> Notifications
        </paper-toggle-button>
      </div>
      <div class="side-by-side">
        <paper-toggle-button
          ?checked="${this.config.voice !== false}"
          .configValue="${"voice"}"
          @change="${this._valueChanged}"
        >
          <iron-icon icon="hass:microphone"></iron-icon> Voice
        </paper-toggle-button>
        <paper-toggle-button
          ?checked="${this.config.options !== false}"
          .configValue="${"options"}"
          @change="${this._valueChanged}"
        >
          <iron-icon icon="hass:dots-vertical"></iron-icon> Options
        </paper-toggle-button>
      </div>
      <h4>Clock options:</h4>
      <div class="side-by-side">
        <paper-dropdown-menu
          label="Clock"
          @value-changed="${this._valueChanged}"
          .configValue="${"clock"}"
        >
          <paper-listbox
            slot="dropdown-content"
            .selected="${clockOptions.indexOf(this._clock)}"
          >
            ${clockOptions.map(option => {
              return html`
                <paper-item>${option}</paper-item>
              `;
            })}
          </paper-listbox>
        </paper-dropdown-menu>
        <paper-dropdown-menu
          label="Clock format"
          @value-changed="${this._valueChanged}"
          .configValue="${"clock_format"}"
        >
          <paper-listbox
            slot="dropdown-content"
            .selected="${this._clock_format === "24" ? 1 : 0}"
          >
            <paper-item>12</paper-item>
            <paper-item>24</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>
        <paper-toggle-button
          ?checked="${this.config.clock_am_pm !== false}"
          .configValue="${"clock_am_pm"}"
          @change="${this._valueChanged}"
        >
          AM / PM</paper-toggle-button
        >
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this.config) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        delete this.config[target.configValue];
      } else {
        this.config = {
          ...this.config,
          [target.configValue]:
            target.checked !== undefined ? target.checked : target.value
        };
      }
    }
    fireEvent(this, "cch-config-changed", { config: this.config });
  }

  renderStyle() {
    return html`
      <style>
        h3,
        h4 {
          margin-bottom: 0;
        }
        paper-toggle-button {
          padding-top: 16px;
        }
        iron-icon {
          padding-right: 5px;
        }
        .side-by-side {
          display: flex;
        }
        .side-by-side > * {
          flex: 1;
          padding-right: 4px;
          width: 33%;
        }
      </style>
    `;
  }
}

customElements.define("cch-config-editor", CchConfigEditor);

export class CchExceptionEditor extends LitElement {
  static get properties() {
    return { exception: {}, _closed: {} };
  }

  constructor() {
    super();
    this._closed = true;
  }

  render() {
    if (!this.exception) {
      return html``;
    }
    return html`
      ${this.renderStyle()}
      <custom-style>
        <style is="custom-style">
          .card-header {
            margin-top: -5px;
            @apply --paper-font-headline;
          }
          .card-header paper-icon-button {
            margin-top: -5px;
            float: right;
          }
        </style>
      </custom-style>
      <paper-card ?closed=${this._closed}>
        <div class="card-content">
          <div class="card-header">
            ${Object.values(this.exception.conditions).join(", ") ||
              "New Exception"}
            <paper-icon-button
              icon="${this._closed ? "mdi:chevron-down" : "mdi:chevron-up"}"
              @click="${this._toggleCard}"
            >
            </paper-icon-button>
            <paper-icon-button
              ?hidden=${this._closed}
              icon="mdi:delete"
              @click="${this._deleteException}"
            >
            </paper-icon-button>
          </div>
          <h4>Conditions</h4>
          <cch-conditions-editor
            .conditions="${this.exception.conditions}"
            @cch-conditions-changed="${this._conditionsChanged}"
          >
          </cch-conditions-editor>
          <h4>Config</h4>
          <cch-config-editor
            minimal
            .config="${this.exception.config}"
            @cch-config-changed="${this._configChanged}"
          >
          </cch-config-editor>
        </div>
      </paper-card>
    `;
  }

  renderStyle() {
    return html`
      <style>
        [closed] {
          overflow: hidden;
          max-height: 52px;
        }
        paper-card {
          margin-top: 10px;
          transition: all 0.5s ease;
        }
      </style>
    `;
  }

  _toggleCard() {
    this._closed = !this._closed;
  }

  _deleteException() {
    fireEvent(this, "cch-exception-delete");
  }

  _conditionsChanged(ev) {
    if (!this.exception) {
      return;
    }
    this.exception.conditions = ev.detail.conditions;
    fireEvent(this, "cch-exception-changed", {
      exception: this.exception
    });
  }

  _configChanged(ev) {
    ev.stopPropagation();
    if (!this.exception) {
      return;
    }
    this.exception.config = ev.detail.config;
    fireEvent(this, "cch-exception-changed", {
      exception: this.exception
    });
  }
}

customElements.define("cch-exception-editor", CchExceptionEditor);

export class CchConditionsEditor extends LitElement {
  static get properties() {
    return { conditions: {} };
  }

  get _user() {
    return this.conditions.user || "";
  }

  get _user_agent() {
    return this.conditions.user_agent || "";
  }

  render() {
    if (!this.conditions) {
      return html``;
    }
    return html`
      <paper-input
        label="User"
        .value="${this._user}"
        .configValue="${"user"}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
      <paper-input
        label="User agent"
        .value="${this._user_agent}"
        .configValue="${"user_agent"}"
        @value-changed="${this._valueChanged}"
      >
      </paper-input>
    `;
  }

  _valueChanged(ev) {
    if (!this.conditions) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        delete this.conditions[target.configValue];
      } else {
        this.conditions = {
          ...this.conditions,
          [target.configValue]: target.value
        };
      }
    }
    fireEvent(this, "cch-conditions-changed", { conditions: this.conditions });
  }
}

customElements.define("cch-conditions-editor", CchConditionsEditor);
