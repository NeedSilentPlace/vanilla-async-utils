/*

  이 파일은 절대 수정하지 마세요!

 */


/**
 * A collection of `async` utility functions.
 * @module Utils
 */

import each from './01_each'
import every from './02_every'
import filter from './03_filter'
import some from './04_some'
import forever from './14_forever'
import groupBy from './08_groupBy'
import map from './05_map'
import memoize from './07_memoize'
import parallel from './10_parallel'
import reduce from './06_reduce'
import series from './09_series'
import times from './15_times'
import waterfall from './11_waterfall'
import whilst from './13_whilst'
import compose from './16_compose'
import detect from './12_detect'

export default {
    compose: compose,
    detect: detect,
    each: each,
    every: every,
    filter: filter,
    forever: forever,
    groupBy: groupBy,
    map: map,
    memoize: memoize,
    parallel: parallel,
    reduce: reduce,
    series: series,
    some: some,
    times: times,
    waterfall: waterfall,
    whilst: whilst,

    // aliases
    all: every,
    any: some,
    forEach: each,
    inject: reduce,
    foldl: reduce,
    select: filter,
};

export {
    compose as compose,
    detect as detect,
    each as each,
    every as every,
    filter as filter,
    forever as forever,
    groupBy as groupBy,
    map as map,
    memoize as memoize,
    parallel as parallel,
    reduce as reduce,
    series as series,
    some as some,
    times as times,
    waterfall as waterfall,
    whilst as whilst,

    // Aliases
    every as all,
    some as any,
    each as forEach,
    reduce as inject,
    reduce as foldl,
    filter as select,
};

