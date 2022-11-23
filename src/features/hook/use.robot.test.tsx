import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { robotReducer } from '../reducer/reducer';
import { ProtoRobot, RobotTypes } from '../types/robot.Types';
import { RobotRepository } from '../services/repository.Robot';
import { rootState, rootStore } from '../../infrastructure/store/store';
import { useRobot } from './use.robot';

jest.mock('../services/repository.Robot');

describe('Given the custom hook useTasks', () => {
    let mockProtoTask: ProtoRobot;
    let mockRobot: RobotTypes;
    let mockAddedRobot: RobotTypes;
    let mockUpdatedRobot: RobotTypes;

    beforeEach(() => {
        const mockProtoRobot = {
            id: 'bs12df3',
            name: 'Pablo',
            img: 'url.img1',
            speed: 5,
            resistance: 4,
            date: '05/85'
        };
        mockRobot = {
            ...mockProtoRobot,
            id: ''
        };
        mockAddedRobot = {
            id: 'qbs12df3',
            name: 'qPablo',
            img: 'url.img2',
            speed: 5,
            resistance: 4,
            date: '05/85'
        };
        mockUpdatedRobot = {
            id: 'mbs12df3',
            name: 'mqPablo',
            img: 'url.img2',
            speed: 5,
            resistance: 4,
            date: '05/85'
        };
    });
    describe('When we simulate its use in a component', () => {
        interface Current {
            robots: Array<RobotTypes>;
            handleLoad: () => void;
            handleAdd: (newTask: ProtoRobot) => void;
            handleDelete: (id: string) => void;
            handleUpdate: (updateTask: Partial<RobotTypes>) => void;
        }

        let current: Current;
        let mockStore: rootStore;

        // renderHook simula un componente
        // envuelto en un provider de react-redux que accede al store
        // el useTask accede al store y selecciona el state que  necesita
        // el useEffect llama al mock del servicio repository
        // que retorna un mock de datos []
        // con los cuales se actualiza el state en el store
        // Y esto último se comprueba en el expect
        beforeEach(async () => {
            RobotRepository.prototype.getAll = jest
                .fn()
                .mockResolvedValue([mockRobot]);
            RobotRepository.prototype.create = jest
                .fn()
                .mockResolvedValue(mockAddedRobot);
            RobotRepository.prototype.update = jest
                .fn()
                .mockResolvedValue(mockUpdatedRobot);
            RobotRepository.prototype.delete = jest
                .fn()
                .mockResolvedValue(undefined);

            const preloadedState: rootState = { robots: [] };
            mockStore = configureStore({
                reducer: {
                    robots: robotReducer
                },
                preloadedState
            });

            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            ({
                result: { current }
            } = renderHook(() => useRobot(), { wrapper }));
        });

        // test('Then the state is accesible by the hook', async () => {
        test(`Then hook call to the repository for the initial data
                and dispatch an action for load the data in the state`, async () => {
            current.handleLoad();
            expect(RobotRepository.prototype.getAll).toHaveBeenCalled();
        });

        test(`Then the hock call to the repository to add a new task 
            and dispatch an action for add the task to the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.robots).toEqual([]);
            current.handleAdd(mockProtoTask);
            expect(RobotRepository.prototype.create).toHaveBeenCalled();
        });

        test(`Then the hock call to the repository to update a task
            and dispatch an action for update the task in the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.robots).toEqual([]);
            current.handleUpdate(mockUpdatedRobot);
            await waitFor(() => {
                expect(RobotRepository.prototype.update).toHaveBeenCalled();
            });
        });

        test(`Then the hock call to the repository to delete a task
            and dispatch an action for delete the task from the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.robots).toEqual([]);
            current.handleDelete('');
            await waitFor(() => {
                expect(RobotRepository.prototype.delete).toHaveBeenCalled();
            });
        });
    });
});
