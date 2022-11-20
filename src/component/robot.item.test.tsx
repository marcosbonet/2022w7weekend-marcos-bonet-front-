import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rootStore } from '../store/store';
import { robotReducer } from '../reducer/reducer';
import { RobotItem } from './robots.item';
import { useRobot } from '../hook/use.robot';
import { RobotTypes } from '../types/robot.Types';

jest.mock('.../hook/use.robot');

describe('Given TaskItem component', () => {
    const mockStore: rootStore = configureStore({
        reducer: {
            robots: robotReducer,
        },
    });

    describe('When we render the component', () => {
        beforeEach(() => {
            const mockRobot: RobotTypes = {
                id: 0,
                robotName: 'string',
                velocity: 2,
                resistent: 3,
                creationDate: 'string',
                img: 'string',
            };
            (useRobot as jest.Mock).mockReturnValue({
                handleDelete: jest.fn(),
                handleUpdate: jest.fn(),
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
            const title = /Test Robot/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
        test('Then it should have a button for delete', () => {
            // const title = new RegExp('Test task', 'i');
            const element = screen.getByRole('button');
            expect(element).toBeInTheDocument();
            userEvent.click(element);
            expect(useRobot().handleDelete).toHaveBeenCalled();
        });
    });
});
