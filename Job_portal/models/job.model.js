export default class JobModel {
    constructor(id,name,position,deadline,opening,applicants,posted,location,pack,skills,postedby,appliedby){
        this.id=id;
        this.name=name;
        this.position=position;
        this.deadline=deadline;
        this.opening=opening;
        this.applicants=applicants;
        this.posted=posted;
        this.location=location;
        this.pack=pack;
        this.skills=skills;
        this.postedby=postedby;
        this.appliedby=appliedby;
    }
    static getById(id) {
        return jobs.find((j) => j.id == id);
    }

    static getByRecruiterEmail(postedby){
        return jobs.filter(j=> j.postedby==postedby);
    }

    static getByName(search){
        console.log(jobs);
        return jobs.filter(j=> j.name.toUpperCase()==search.toUpperCase());
    }
    
    static edit(id,cname , roles, location, pack, deadline, opening, skills){
        let index;
        for(let i=0;i<jobs.length;i++){
            console.log("jobs ki id value:=  "+jobs[i].id);
                console.log("job ki id value:=  "+id);
            if(jobs[i].id==id){              
                index=i;
                break;
            }
        }
          console.log(index);
          jobs[index].name=cname;
          jobs[index].roles=roles;
          jobs[index].location=location;
          jobs[index].pack=pack;
          jobs[index].deadline=deadline;
          jobs[index].opening=opening
          jobs[index].skills=skills
    }

    static getByCandidateEmail(Cmail){
        let jobfound=[];
        for (let i=0;i<jobs.length;i++){
            for(let y=0;y<jobs[i].appliedby.length;y++){
                if(jobs[i].appliedby[y]==Cmail)
                jobfound.push(jobs[i]);
            }
        }
        return jobfound;
    }

    static getAll() {
        return jobs;
    }
    static add(name,position,deadline,opening,applicants,posted,location,pack,skills,postedby){
        let appliedby=[];
        let newjob=new JobModel(
            jobs.length + 1,
            name,
            position,
            deadline,
            opening,
            applicants,
            posted,
            location,
            pack,
            skills,
            postedby,
            appliedby,
        );
        jobs.push(newjob);
    }

    static delete(id){
        const index= jobs.findIndex(
            (j) => j.id == id
        );
        jobs.splice(index,1);
    }
    
    static checkApplied(jobfound,mail){
        let applied;
        for(let i=0;i<jobfound.appliedby.length;i++){
            if(jobfound.appliedby[i]==mail){
                applied=true;
                break;
            }
        }
        return applied;
    }

    static getDate(){
        // Date object
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0'); 
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();

        // we will display the date as DD-MM-YYYY 
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        // console.log("The current date is " + currentDate); 
        return currentDate;
    }
}

var jobs=[
    {
        id:"1",
        name:"coding ninjas",
        position:"tech SDE",
        deadline:"15-12-2023",
        opening:"10",
        applicants:0,
        posted:" 08-06-2023",
        location:"delhi",
        pack:"15-20 LPA",
        skills:["java","angular","html","dbms","javascript"],
        postedby:"",
        appliedby:[]
    },

    {
        id:"2",
        name:"coding ninjas",
        position:"tech SDE",
        deadline:"10-12-2023",
        opening:"5",
        applicants:0,
        posted:" 24-07-2023",
        location:"delhi",
        pack:"15-20 LPA",
        skills:["java","angular","html","dbms","javascript"],
        postedby:"",
        appliedby:[]
    },

    {
        id:"3",
        name:"coding ninjas",
        position:"tech SDE",
        deadline:"25-10-2023",
        opening:"3",
        applicants:0,
        posted:" 21-08-2023",
        location:"delhi",
        pack:"15-20 LPA",
        skills:["java","angular","html","dbms","javascript"],
        postedby:"",
        appliedby:[]
    },
    {
        id: 4,
        name: 'abc',
        position: 'software-developer',
        deadline: '05-11-2023',
        opening: '5',
        applicants: 0,
        posted: '30-08-2023',
        location: 'delhi',
        pack: '20 lpa',
        skills: [ 'Java', 'HTML' ],
        postedby: 'pks@gmail.com',
        appliedby:[]
      }
]
