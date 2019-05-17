/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * @param {Array} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 *
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 *
 * async.series([
 *     function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     },
 *     function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // results is now equal to ['one', 'two']
 * });
 *
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function series (tasks, callback) {
  let count = 0;
  const keys = Object.keys(tasks);
  const arrayResult = [];
  const objectResult = {};

  if(Array.isArray(tasks)) {
    if(!tasks.length) {
      return callback(null, []);
    }

    return repeatArray(tasks);
  } else {
    return repeatObject(tasks);
  }

  function repeatArray(arr) {
    arr[count](function(err, ...output) {
      if(err) {
        return callback(err);
      }

      if(output.length === 1) {
        arrayResult.push(output[0]);
      } else {
        arrayResult.push(output);
      }

      if(count === arr.length - 1) {
        return callback(null, arrayResult);
      } else {
        count++;
        repeatArray(arr);
      }
    });
  }

  function repeatObject(obj) {
    obj[keys[count]](function(err, output) {
      if(err) {
        return callback(err);
      }

      objectResult[keys[count]] = output;
      if(count === keys.length - 1) {
        return callback(null, objectResult);
      } else {
        count++;
        repeatObject(obj);
      }
    });
  }
}
