// @flow
import { createDOMElement } from '../../../src/dom/jsx/createDOMElement';

// 页面内状态
const state = {
  count: 0
};

/**
 * Description 点击事件处理
 * @param e
 */
const handleClick = e => {
  state.count++;
  document.querySelector('#count').innerText = state.count;
};

export default (
  <div className="header">
    <section>
      <section>
        <button className="link" onClick={handleClick}>
          Custom DOM JSX
        </button>
        <input type="text"
          onChange={(e)=>{
            console.log(e);
          }}
        />
      </section>
    </section>
    <svg>
      <circle cx="64" cy="64" r="64" style="fill: #00ccff;" />
    </svg>
    <br />
    <span id="count" style={{ color: 'red' }}>
      {state.count}
    </span>
  </div>
);
