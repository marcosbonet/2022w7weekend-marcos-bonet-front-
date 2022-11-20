import { RobotTypes } from '../types/robot.Types';
import { actionTypes } from './action.types';
import { robotReducer } from './reducer';

describe('Given the function taskReducer', () => {
    const RobotMock: RobotTypes = {
        id: '',
        robotName: '',
        velocity: 1,
        resistent: 1,
        creationDate: 'string',
        img: 'string',
    };

    let action: { type: string; payload: unknown };
    let state: Array<RobotTypes>;

    describe('When the action is load', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.load,
                payload: [RobotMock],
            };
            state = [];
        });
        test('Then the returned state should be the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(action.payload);
        });
    });

    describe('When the action is add', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.add,
                payload: RobotMock,
            };
            state = [];
        });
        test('Then the returned state should include the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toContainEqual(action.payload);
        });
    });

    describe('When the action is update', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update,
                payload: { ...RobotMock, title: 'Update task' },
            };
            state = [RobotMock];
        });
        test('Then the returned state should include the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toContainEqual(action.payload);
        });
    });

    describe('When the action is update and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update,
                payload: { ...RobotMock, id: '2', robotName: 'Update Robot' },
            };
            state = [RobotMock];
        });
        test('Then the returned state should be the original state', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(state);
        });
    });

    describe('When the action is delete', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete,
                payload: RobotMock.id,
            };
            state = [RobotMock];
        });
        test('Then the returned state should not include the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual([]);
        });
    });

    describe('When the action is delete and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete,
                payload: { ...RobotMock, id: '2' },
            };
            state = [RobotMock];
        });
        test('Then the returned state should should be the original state', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(state);
        });
    });

    describe('When the action is any other', () => {
        beforeEach(() => {
            action = {
                type: '',
                payload: null,
            };
            state = [RobotMock];
        });
        test('Then the returned state should be ...', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
