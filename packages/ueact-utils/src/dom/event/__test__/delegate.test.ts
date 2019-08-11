import { delegate } from '../delegate';

it('test-delegate', () => {
  document.body.innerHTML = `<ul>
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
    <li><a>Item 4</a></li>
    <li><a>Item 5</a></li>
    </ul>`;

  const container = window.document.querySelector('ul')!;
  const anchor = window.document.querySelector('a')!;

  const cb = jest.fn();

  delegate<HTMLUListElement>([container], 'a', 'click', cb);
  anchor.click();

  expect(cb).toBeCalled();
});
