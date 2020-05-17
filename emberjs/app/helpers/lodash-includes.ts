import { helper } from '@ember/component/helper';
import { includes } from 'lodash'

export default helper(function lodashIncludes([collection, value]) {
  return includes(collection, value)
});
