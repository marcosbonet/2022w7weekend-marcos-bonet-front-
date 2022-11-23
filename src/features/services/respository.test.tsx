import { RobotModel } from '../types/robot.Types';
import { RobotRepository } from './repository.Robot';

describe('Given an instance of RobotApi Service', () => {
    let service: RobotRepository;
    beforeEach(() => {
        service = new RobotRepository('http://forCoverOptionLine');
        service = new RobotRepository();
    });

    // Para cada método se crea una suite con las opciones válidas y no válidas
    // describe('When we use the method...', () => {
    //     test.todo(`Then if all are OK, it should return a Promise of ...`);
    //     test.todo(`Then if there are problems, it should throw an error...`);
    // });

    describe('When we use service.getTask()', () => {
        test(`Then if all are OK, it should return a Promise of an Array of robot`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue([])
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.getAll();
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual([]);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error'
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(async () => await service.getAll()).rejects.toThrow();
        });
    });

    describe('When we use service.createTask()', () => {
        const mockTask = new RobotModel('');
        test(`Then if all are OK,
                it should return a Promise of the crated robot`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockTask)
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.create(mockTask);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockTask);
        });

        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error'
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.create(mockTask)
            ).rejects.toThrow();
        });
    });

    describe('When we use service.delete', () => {
        test(`Then if id are OK (1), it should return a Promise void`, async () => {
            const itemId = 1;
            const response = {
                ok: true
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.delete(itemId);
            expect(fetch).toHaveBeenCalled();
            expect(result).toBeUndefined();
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const itemId = 0;
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error'
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.delete(itemId)
            ).rejects.toThrowError();
        });
    });

    describe('When we use service.update()', () => {
        const mockUpdateRobot = {
            id: '',
            robotName: '',
            velocity: 1,
            resistent: 1,
            creationDate: 'string',
            img: 'string'
        };
        const mockFinalRobot = {
            ...new RobotModel(''),
            id: 1,
            robotName: ''
        };

        test(`Then if all are OK, it should return a Promise of ...`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockFinalRobot)
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.update(mockUpdateRobot);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockFinalRobot);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const mockUpdateRobot = { id: '' };
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error'
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.update(mockUpdateRobot)
            ).rejects.toThrow();
        });
    });
});
