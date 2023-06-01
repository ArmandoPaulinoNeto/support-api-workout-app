import { Double } from "typeorm";

export class AssessmentDto{
    pupilFK: String;
    weight: Number;
    hight: Number;
    bmi: Number;
    subscapularis: Number;
    bicipital: Number;
    thickness: Number;
    midaxillary: Number;
    suprailiac: Number;
    breastplate: Number;
    abdominal: Number;
    thigh: Number;
    calf: Number;
    fatIdeal: Number;
    currentFat: Number;
    leanMass: Number;
    fatMass: Number;
}