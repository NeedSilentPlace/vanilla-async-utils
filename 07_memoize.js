/**
 * Caches the results of an async function. When creating a hash to store function results against, the callback is omitted from the hash
 * and an optional hash function can be used.
 *  If no hash function is specified, the first argument is used as a hash key, which may work reasonably if it is a string or a data type
 * that converts to a distinct string. Note that objects and arrays will not behave reasonably. Neither will cases where the other
 * arguments are significant. In such cases, specify your own hash function.
 *
 * The cache of results is exposed as the memo property of the function returned by memoize.
 *
 * @param {Function} fn - The async function to proxy and cache results from.
 *
 * @param {Function} hasher - An optional function for generating a custom hash for storing results. It has all the arguments applied to it
 * apart from the callback, and must be synchronous.
 *
 * @returns a memoized version of fn
 *
 * var slow_fn = function(name, callback) {
 *     // do something
 *     callback(null, result);
 * };
 * var fn = async.memoize(slow_fn);
 *
 * // fn can now be used as if it were slow_fn
 * fn('some name', function() {
 *     // callback
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function memoize (fn) {
  const cache = {};
  return function(...args) {
    const item = args.slice(0, -1);

    if(cache[item]) {
      return args[args.length - 1](null, cache[item]);
    }

    fn(...item, function(err, result) {
      if(err) {
        args[args.length - 1](err);
      }
      
      cache[item] = result;
      return args[args.length - 1](null, cache[item]);
    })
  };
}
