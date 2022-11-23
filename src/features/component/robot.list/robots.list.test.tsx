import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../../infrastructure/store/store';
import { RobotList } from './robots.list';

describe('Given the FavoriteRobotItem component', () => {
    describe('When we render the component', () => {
        test("then it should display the Robot's list", () => {
            const mockRobot = [
                {
                    id: 'as12df3',
                    name: 'Pepe',
                    img: 'url.img',
                    speed: 5,
                    resistance: 4,
                    date: '05/85'
                }
            ];
            render(
                <>
                    <Router>
                        <Provider store={appStore}>
                            <RobotList item={mockRobot} />
                        </Provider>{' '}
                    </Router>
                </>
            );
            const element = screen.getByText(/Pepe/i);
            expect(element).toBeInTheDocument();
        });
    });
});
