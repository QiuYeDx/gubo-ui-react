import type { CSSInterpolation } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import type { AliasToken, TokenWithCommonCls } from '../../theme/internal';
import { initMotion } from './motion';

export const moveDownIn = new Keyframes('gMoveDownIn', {
  '0%': {
    transform: 'translate3d(0, 100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
});

export const moveDownOut = new Keyframes('gMoveDownOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(0, 100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
});

export const moveLeftIn = new Keyframes('gMoveLeftIn', {
  '0%': {
    transform: 'translate3d(-100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
});

export const moveLeftOut = new Keyframes('gMoveLeftOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(-100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
});

export const moveRightIn = new Keyframes('gMoveRightIn', {
  '0%': {
    transform: 'translate3d(100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
});

export const moveRightOut = new Keyframes('gMoveRightOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(100%, 0, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
});

export const moveUpIn = new Keyframes('gMoveUpIn', {
  '0%': {
    transform: 'translate3d(0, -100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },

  '100%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },
});

export const moveUpOut = new Keyframes('gMoveUpOut', {
  '0%': {
    transform: 'translate3d(0, 0, 0)',
    transformOrigin: '0 0',
    opacity: 1,
  },

  '100%': {
    transform: 'translate3d(0, -100%, 0)',
    transformOrigin: '0 0',
    opacity: 0,
  },
});

type MoveMotionTypes = 'move-up' | 'move-down' | 'move-left' | 'move-right';
const moveMotion: Record<MoveMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  'move-up': {
    inKeyframes: moveUpIn,
    outKeyframes: moveUpOut,
  },
  'move-down': {
    inKeyframes: moveDownIn,
    outKeyframes: moveDownOut,
  },
  'move-left': {
    inKeyframes: moveLeftIn,
    outKeyframes: moveLeftOut,
  },
  'move-right': {
    inKeyframes: moveRightIn,
    outKeyframes: moveRightOut,
  },
};

export const initMoveMotion = (
  token: TokenWithCommonCls<AliasToken>,
  motionName: MoveMotionTypes,
): CSSInterpolation => {
  const { antCls } = token;
  const motionCls = `${antCls}-${motionName}`;
  const { inKeyframes, outKeyframes } = moveMotion[motionName];

  return [
    initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid),
    {
      [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: token.motionEaseOutCirc,
      },

      [`${motionCls}-leave`]: {
        animationTimingFunction: token.motionEaseInOutCirc,
      },
    },
  ];
};
