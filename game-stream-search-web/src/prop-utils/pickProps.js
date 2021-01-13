import _pick from 'lodash/pick';
import _keys from 'lodash/keys';

const pickProps = (props, propTypes) => _pick(props, _keys(propTypes));

export default pickProps;