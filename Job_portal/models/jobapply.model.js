import JobModel from "./job.model.js";
import CandidateController from "../controllers/candidate.controller.js";
export default class JobApplyModel {
    constructor(id,name,email,phone,resume){
        this.id=id;
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.resume=resume;
    }

    static add(id,name,email,phone,resume){
        const newapply=new JobApplyModel(
            id,
            name,
            email,
            phone,
            resume,
        );
        apply.push(newapply);
        console.log(apply);
    }

    static getApply(){
        return apply;
    }

    static getById(id){
        return apply.filter(j=> j.id==id);
    }
}

var apply=[];