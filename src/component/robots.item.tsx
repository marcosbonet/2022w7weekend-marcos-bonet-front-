import { useRobot } from '../hook/use.robot';
import { RobotTypes } from '../types/robot.Types';

export function RobotItem({ item }: { item: RobotTypes }) {
    const { handleDelete, handleUpdate } = useRobot();

    const handleClick = () => {
        handleDelete(item.id);
    };

    const handleChange = () => {
        handleUpdate({ ...item, robotName: 'Robotics' });
    };

    return (
        <li className="">
            <input onChange={handleChange} />
            <span>{item.id}</span>
            <span>{item.robotName}</span>
            <span className="button" onClick={handleClick} role="button">
                🗑️
            </span>
        </li>
    );
}
