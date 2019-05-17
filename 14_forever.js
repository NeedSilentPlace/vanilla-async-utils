/**
 * Calls the asynchronous function fn with a callback parameter that allows it to call itself again, in series, indefinitely.
 * If an error is passed to the callback then errback is called with the error, and execution stops, otherwise it will never be
 * called.
 *
 * @param {Function} fn - an async function to call repeatedly. Invoked with (next).
 *
 * @param {Function} errback(optional) - when fn passes an error to it's callback, this function will be called, and execution
 * stops. Invoked with (err).
 *
 * async.forever(
 *     function(next) {
 *         // next is suitable for passing to things that need a callback(err [, whatever]);
 *         // it will result in this function being called again.
 *     },
 *     function(err) {
 *         // if next is called with a value in its first parameter, it will appear
 *         // in here as 'err', and execution will stop.
 *     }
 * );
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function forever (fn, errback) {
  return fn(function(err) {
    if(err) {
      return errback(err);
    }
    forever(fn, errback);
  });
}
