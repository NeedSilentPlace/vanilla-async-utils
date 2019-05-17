/**
 * Repeatedly call iteratee, while test returns true. Calls callback when stopped, or an error occurs.
 *
 * @param {Function} test - synchronous truth test to perform before each execution of iteratee.
 * Invoked with ().
 *
 * @param {Function} iteratee - An async function which is called each time test passes.
 * Invoked with (callback).
 *
 * @param {Function} callback(optional) - A callback which is called after the test function has failed and repeated execution of iteratee has stopped. callback will be passed an error and any arguments passed to the final iteratee's callback. Invoked with (err, [results]);
 * @returns undefined
 *
 * var count = 0;
 * async.whilst(
 *     function() { return count < 5; },
 *     function(callback) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err, n) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function whilst (test, iteratee, callback) {
  let result;

  function repeat() {
    if(test()) {
      iteratee(function(err, output) {
        if(err) {
          return callback(err);
        }
        
        result = output;
        repeat();
      });
    } else {
      return callback(null, result);
    }
  }

  return repeat();
}
