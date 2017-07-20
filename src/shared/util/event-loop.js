// @flow

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
export const defer =
  typeof Promise === 'function'
    ? Promise.resolve().then.bind(Promise.resolve())
    : setTimeout;
