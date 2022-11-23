import { SyntheticEvent, useState } from 'react';
import { useRobot } from '../../hook/use.robot';
import { ProtoRobot } from '../../types/robot.Types';

type formData = {
    name: string;
    img: string;
    speed: number;
    resistance: number;
    date: string;
};
export function Add() {
    const title = 'Add yourrobot';
    const initialState: formData = {
        name: '',
        img: '',
        speed: 0,
        resistance: 0,
        date: ''
    };
    const [formState, setFormState] = useState(initialState);
    const { handleAdd } = useRobot();

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newRobot: ProtoRobot = { ...formState };
        handleAdd(newRobot);
    };

    return (
        <>
            <div className="form">
                <h2 className="titleform">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form--name">
                        <input
                            type="text"
                            name="name"
                            aria-label="Name"
                            placeholder="Name"
                            value={formState.name}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div className="form--img">
                        <input
                            type="text"
                            name="img"
                            aria-label="Image"
                            placeholder="Imagen"
                            value={formState.img}
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form--speed">
                        <p>Speed</p>
                        <input
                            type="text"
                            name="speed"
                            aria-label="Speed"
                            placeholder="Speed"
                            value={formState.speed}
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form--resistance">
                        <p>Resistance</p>
                        <input
                            type="text"
                            name="resistance"
                            aria-label="Resistance"
                            placeholder="Resistance"
                            value={formState.resistance}
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form--date">
                        <input
                            type="text"
                            name="date"
                            aria-label="Date"
                            placeholder="Date of creation"
                            value={formState.date}
                            onInput={handleInput}
                        />
                    </div>
                    <button type="submit" className="form--button">
                        Guardar
                    </button>
                </form>
            </div>
        </>
    );
}
