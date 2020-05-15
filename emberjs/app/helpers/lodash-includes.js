import { helper } from '@ember/component/helper';
import * as _ from 'lodash'
export default helper(function lodashIncludes([collection, value]) {
  return _.includes(collection, value)
});
