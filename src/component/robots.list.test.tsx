import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { rootStore } from '../store/store';
import { robotReducer } from '../reducer/reducer';
import { RobotList } from './robots.list';

describe('When we render the component', () => {
    const mockStore: rootStore = configureStore({
        reducer: {
            robots: robotReducer,
        },
    });
    beforeEach(() => {
        render(
            <Provider store={mockStore}>
                <RobotList />
            </Provider>
        );
    });
    test('Then it should display the title', () => {
        const title = new RegExp('Robots');
        const element = screen.getByText(title);
        expect(element).toBeInTheDocument();
    });
});
