import { useEffect } from 'react';
import { useRobot } from '../hook/use.robot';
import { RobotTypes } from '../types/robot.Types';
import { RobotItem } from './robots.item';

export function RobotList() {
    const title = 'Robots';
    const { robots, handleLoad } = useRobot();

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <section>
            <h2>{title}</h2>

            <ul className="task_list">
                {robots.map((item: RobotTypes) => (
                    <RobotItem key={item.id} item={item}></RobotItem>
                ))}
            </ul>
        </section>
    );
}
