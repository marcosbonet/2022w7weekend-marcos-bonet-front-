import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import { rootStore } from '../store/store';
import { robotReducer } from '../reducer/reducer';
import { RobotItem } from './robots.item';
import { useRobot } from '../hook/use.robot';
import { RobotTypes } from '../types/robot.Types';

jest.mock('../hook/use.robot');

describe('Given TaskItem component', () => {
    const mockStore: rootStore = configureStore({
        reducer: {
            robots: robotReducer,
        },
    });

    describe('When we render the component', () => {
        beforeEach(() => {
            const mockRobot: RobotTypes = {
                id: '',
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
            const element = screen.getByText(/string/i);
            expect(element).toBeInTheDocument();
        });
    });
});
