export type RobotTypes = {
    id: number;
    robotName: string;
    velocity: number;
    resistent: number;
    creationDate: string;
    img: string;
};

export type ProtoRobot = {
    robotName?: string;
    velocity?: number;
    resistent?: number;
    creationDate?: string;
    img?: string;
};
export type Id = {
    id: number;
};
export class RobotModel implements ProtoRobot {
    constructor(
        public robotName?: string,
        public velocity?: number,
        public resistent?: number,
        public creationDate?: string,
        public img?: string
    ) {}
}
