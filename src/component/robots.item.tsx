import { useRobot } from '../hook/use.robot';
import { RobotTypes } from '../types/robot.Types';

export function RobotItem({ item }: { item: RobotTypes }) {
    const { handleDelete } = useRobot();

    const handleClick = () => {
        handleDelete(item.id);
    };

    return (
        <li>
            <span>{item.id}</span>
            <span>{item.robotName}</span>
            <span onClick={handleClick}>🗑️</span>
        </li>
    );
}
