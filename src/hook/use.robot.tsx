import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../store/store';
import * as ac from '../reducer/action.creator';
import { ProtoRobot, RobotTypes } from '../types/robot.Types';
import { RobotRepository } from '../services/repository.Robot';

export const useRobot = () => {
    const robots = useSelector((state: rootState) => state.robots);
    const dispatcher = useDispatch();
    const apiRobot = useMemo(() => new RobotRepository(), []);

    const handleLoad = useCallback(
        () =>
            apiRobot
                .getAll()
                .then((robots) => dispatcher(ac.loadActionCreator(robots)))
                .catch((error: Error) =>
                    console.log(error.name, error.message)
                ),
        [apiRobot, dispatcher]
    );

    const handleAdd = (newRobot: ProtoRobot) => {
        apiRobot
            .create(newRobot)
            .then((robot: RobotTypes) => dispatcher(ac.addActionCreator(robot)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleUpdate = (updateTask: Partial<RobotTypes>) => {
        apiRobot
            .update(updateTask)
            .then((robot: RobotTypes) =>
                dispatcher(ac.updateActionCreator(robot))
            )
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleDelete = (id: number) => {
        apiRobot
            .delete(id)
            .then(() => dispatcher(ac.deleteActionCreator(id)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    return {
        robots,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
};
