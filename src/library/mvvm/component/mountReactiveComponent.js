// @flow
import { observe } from 'observer-x/dist/observer-x.es';

import ReactiveComponent from './ReactiveComponent';
import { diff } from '../../../isomorphic/vdom/diff/diff';
import patch from '../../../platform/dom/patch/patch';

/**
 * Description 挂载某个 ReactiveComponent
 * @param componentInstance
 * @param opts
 * @param mountAll
 * @param isChild
 */
export default function mountReactiveComponent(
  componentInstance: ReactiveComponent,
  opts: Object,
  mountAll: Boolean,
  isChild: Boolean
) {
  componentInstance.state = observe(componentInstance.state, {
    // 子属性的变化会传递到父属性
    recursive: true
  });

  componentInstance.state.listen(changes => {
    let oldTree = componentInstance.vNode;

    let newTree = componentInstance.render();

    let patches = diff(oldTree, newTree);

    newTree.componentInstance = componentInstance;

    newTree._ref = patch(componentInstance.vNode._ref, patches);

    componentInstance.vNode = newTree;
  });

  // 触发组件的挂载事件
  componentInstance.componentWillMount &&
    componentInstance.componentWillMount();
}
