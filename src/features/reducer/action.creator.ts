import { createAction } from '@reduxjs/toolkit';

import { RobotTypes } from '../types/robot.Types';
import { actionTypes } from './action.types';

export const loadActionCreator = createAction<Array<RobotTypes>>(
    actionTypes.load
);

export const addActionCreator = createAction<RobotTypes>(actionTypes.add);

export const updateActionCreator = createAction<RobotTypes>(actionTypes.update);

export const deleteActionCreator = createAction<RobotTypes['id']>(
    actionTypes.delete
);
