
import { grey300 } from 'material-ui/styles/colors';

/**
 * @function 样式定义
 * @type {{root: {display: string, justifyContent: string, alignItems: string}, icon: {width: number, height: number, color: string}, leftArrow: {width: number, height: number, padding: number}, rightArrow: {width: number, height: number, padding: number}, media: {width: string, height: string, margin: string}, image: {width: string, height: string, backgroundRepeat: string, backgroundSize: string, backgroundPosition: string}, video: {width: string, height: string, border: number}, show: {display: string}, hide: {display: string}}}
 */
export default {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 64,
    height: 64,
    color: grey300
  },
  leftArrow: {
    minWidth: 64,
    height: 64,
    padding: 0
  },
  rightArrow: {
    minWidth: 64,
    height: 64,
    padding: 0
  },
  media: {
    width: '80%',
    height: '100%',
    margin: '0 0.375em'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  },
  video: {
    width: '100%',
    height: '100%',
    border: 0
  },
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
};
