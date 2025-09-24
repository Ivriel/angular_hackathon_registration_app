export class CompetitionModel {
    competitionId:number;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    status:string;

    constructor(){
        this.competitionId = 0;
        this.description = "";
        this.title = "";
        this.startDate = "";
        this.endDate = "";
        this.status = "";
    }
}