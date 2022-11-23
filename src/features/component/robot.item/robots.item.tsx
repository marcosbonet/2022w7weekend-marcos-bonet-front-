import { useRobot } from '../../hook/use.robot';
import { RobotTypes } from '../../types/robot.Types';

export function RobotItem({ item }: { item: RobotTypes }) {
    const { handleDelete } = useRobot();

    const handleClick = () => {
        handleDelete(item.id);
    };

    return (
        <li>
            <p>{item.name}</p>
            <img src={item.img} alt={'Image of' + item.name} height="200" />
            <p>Velocidad: {item.speed}</p>
            <p>Fuerza: {item.resistance}</p>
            <p>Fecha de creación: {item.date}</p>
            <div
                className="listrobots--delete"
                onClick={handleClick}
                role="button"
            >
                🗑️
            </div>
        </li>
    );
}
