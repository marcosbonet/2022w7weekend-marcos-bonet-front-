import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RobotRepository } from '../services/robot.respository.js';
import { rootState } from '../store/store.js';
import * as ac from '../reducer/action.creator.js';
import { ProtoRobot, RobotTypes, Id } from '../types/robot.Types.js';
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

    const handleAdd = (newTask: ProtoRobot) => {
        apiRobot
            .create(newTask)
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

    const handleDelete = (id: string) => {
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
