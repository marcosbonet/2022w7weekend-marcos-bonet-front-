import { useEffect } from 'react';
import { useRobot } from '../../hook/use.robot';
import { RobotTypes } from '../../types/robot.Types';
import { RobotItem } from '../robot.item/robots.item';

export function RobotList({ item }: { item: RobotTypes[] }) {
    const title = 'Robots';
    const { robots, handleLoad } = useRobot();
    console.log(robots);
    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <section>
            <h2>{title}</h2>

            <ul>
                {robots.map((item: RobotTypes) => (
                    <RobotItem key={item.id} item={item}></RobotItem>
                ))}
            </ul>
        </section>
    );
}
