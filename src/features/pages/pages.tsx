import { RobotList } from '../component/robot.list/robots.list';

function RobotsPage() {
    return (
        <main>
            <h2 className="title">Robots page</h2>
            <RobotList item={[]}></RobotList>
        </main>
    );
}

export default RobotsPage;
