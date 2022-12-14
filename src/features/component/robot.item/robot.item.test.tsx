import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rootState, rootStore } from '../../../infrastructure/store/store';
import { RobotModel } from '../../types/robot.Types';
import { robotReducer } from '../../reducer/reducer';
import { useRobot } from '../../hook/use.robot';
import { RobotItem } from './robots.item';

jest.mock('../../hooks/use.robots');

describe('Given RobotItem component', () => {
    const preloadedState: rootState = {
        robots: [
            {
                ...new RobotModel('prueba', '123.jpg', 1, 2, '2000'),
                id_front: 1
            }
        ]
    };
    const mockStore: rootStore = configureStore({
        reducer: {
            robots: robotReducer
        },
        preloadedState
    });

    describe('When we render the component', () => {
        beforeEach(() => {
            const mockRobot = {
                ...new RobotModel('prueba', '123.jpg', 1, 2, '2000'),
                id_front: 1
            };
            (useRobot as jest.Mock).mockReturnValue({
                handleDelete: jest.fn(),
                handleUpdate: jest.fn()
            });
            render(
                <Provider store={mockStore}>
                    <Router>
                        <RobotItem item={mockRobot} />
                    </Router>
                </Provider>
            );
        });
        test('Then it should display the title', () => {
            const title = /prueba/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
        test('Then it should have a button for delete', () => {
            const element = screen.getByRole('button');
            expect(element).toBeInTheDocument();
            userEvent.click(element);
            expect(useRobot().handleDelete).toHaveBeenCalled();
        });
    });
});
