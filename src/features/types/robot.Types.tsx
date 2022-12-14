export type RobotTypes = {
    id: string;
    name: string;
    img: string;
    speed: number;
    resistance: number;
    date: string;
};

export type ProtoRobot = {
    name?: string;
    img?: string;
    speed?: number;
    resistance?: number;
    date?: string;
};
export type Id = {
    id: string;
};
export class RobotModel implements ProtoRobot {
    constructor(
        public name?: string,
        public img?: string,
        public speed?: number,
        public resistance?: number,
        public date?: string
    ) {}
}
