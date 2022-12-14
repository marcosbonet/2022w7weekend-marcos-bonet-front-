import { RobotTypes } from '../types/robot.Types.js';
import { Repository } from './repository.js';

export class RobotRepository implements Repository<RobotTypes> {
    url: string;
    constructor(url = '') {
        this.url = url
            ? url
            : 'https://two022w7weekend-marcos-bonet.onrender.com/robot';
    }

    #createError(response: Response) {
        const message = `Error ${response.status}: ${response.statusText}`;
        const error = new Error(message);
        error.name = 'HTTPError';
        return error;
    }

    // read / get
    getAll(): Promise<Array<RobotTypes>> {
        return fetch(this.url)
            .then((response) => {
                if (response.ok) return response.json();
                throw this.#createError(response);
            })
            .then((data1) => {
                return data1.data;
            });
    }

    // create / post
    create(Robot: Partial<RobotTypes>): Promise<RobotTypes> {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(Robot),
            headers: {
                'content-type': 'application/json',
                Authorization:``
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }

    // delete
    delete(id: number): Promise<void> {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
             headers: {
                'content-type': 'application/json',
                Authorization:``
            },
        }).then((response) => {
            if (!response.ok) throw this.#createError(response);
        });
    }

    // uptate / patch
    update(partialRobot: Partial<RobotTypes>): Promise<RobotTypes> {
        return fetch(`${this.url}/${partialRobot.id}`, {
            method: 'PATCH',
            body: JSON.stringify(partialRobot),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }
}
