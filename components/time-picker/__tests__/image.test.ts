import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('TimePicker image', () => {
  imageDemoTest('time-picker', {
    openTriggerClassName: 'g-picker-dropdown',
  });
});
