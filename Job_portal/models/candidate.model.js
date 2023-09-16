export default class CandidateModel {

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    static add(name, email, password) {
        const newUser = new CandidateModel(
          candidate.length + 1,
          name,
          email,
          password
        );
        candidate.push(newUser);
        console.log(candidate);
    }

    static isValidUser(email, password) {
        console.log(email,password);
        console.log("candidate array:="+candidate);
        const result = candidate.find(
          (u) =>
            u.email == email && u.password == password
        );
        // console.log(result);
        // console.log("result ka naam"+result.name);
        return result;
    }

    static getName(mail){
        let name;
        for(let i=0;i<candidate.length;i++){
            if(candidate[i].email==mail)
            name=candidate[i].name
        }
        return name;
    }
}

var candidate=[];