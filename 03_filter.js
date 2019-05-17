/**
 * Returns a new array of all the values in `coll` which pass an async truth
 * test. This operation is performed in parallel, but the results array will be
 * in the same order as the original.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 *
 * async.filter(['file1','file2','file3'], function(filePath, callback) {
 *.    // fs.access는 비동기 함수라고 가정
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of the existing files
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function filter (coll, iteratee, callback) {
  if(Array.isArray(coll)) {
    let count = 0;
    let done = false;
    const truthy = [];

    for(let i = 0; i < coll.length; i++) {
      iteratee(coll[i], function(err, result) {
        if(err && !done) {
          done = true;
          return callback(err);
        }

        if(result) {
          truthy[i] = coll[i];
        }

        if(count === coll.length - 1 && !done) {
          const filteredColl = [];

          for(let j = 0; j < truthy.length; j++) {
            if(truthy[j] !== undefined) {
              filteredColl.push(truthy[j]);
            }
          }

          return callback(null, filteredColl);
        }
        count++;
      });
    }
  } else {
    let count = 0;
    let done = false;
    const length = Object.keys(coll).length;
    const filteredColl = [];

    for(let key in coll) {
      if(coll.hasOwnProperty(key)) {
        iteratee(coll[key], function(err, result) {
          if(err && !done) {
            done = true;
            return callback(err);
          }

          if(result) {
            filteredColl.push(coll[key]);
          }

          if(count === length - 1 && !done) {
            return callback(null, filteredColl);
          }
          count++;
        });
      }
    }
  }
}
