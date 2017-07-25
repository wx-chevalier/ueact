// @flow

import Component from './Component';

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param component
 *	@param {Object} props
 *	@param {Object} [opts] {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param context
 *	@param mountAll {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
export function setComponentProps(
  component: Component,
  props,
  opts,
  context,
  mountAll
) {
  if (component._disable) return;
  component._disable = true;

  if ((component.__ref = props.ref)) delete props.ref;
  if ((component.__key = props.key)) delete props.key;

  if (!component.base || mountAll) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props, context);
  }

  if (context && context !== component.context) {
    if (!component.prevContext) component.prevContext = component.context;
    component.context = context;
  }

  if (!component.prevProps) component.prevProps = component.props;
  component.props = props;

  component._disable = false;

  if (opts !== NO_RENDER) {
    if (
      opts === SYNC_RENDER ||
      options.syncComponentUpdates !== false ||
      !component.base
    ) {
      renderComponent(component, SYNC_RENDER, mountAll);
    } else {
      enqueueRender(component);
    }
  }

  if (component.__ref) component.__ref(component);
}
