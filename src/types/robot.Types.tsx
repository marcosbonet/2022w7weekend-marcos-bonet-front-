export type RobotTypes = {
    id: string;
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
    id: string;
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
