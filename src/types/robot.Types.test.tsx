import { RobotModel } from './robot.Types';

describe('Given the class TaskModel', () => {
    describe('When we instantiate it', () => {
        const task = new RobotModel('');
        test('Then we should have an object ot the class', () => {
            expect(task).toBeInstanceOf(RobotModel);
        });
    });
});
