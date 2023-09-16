export default class RecruiterModel {

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    static add(name, email, password) {
        const newUser = new RecruiterModel(
          recruiter.length + 1,
          name,
          email,
          password
        );
        recruiter.push(newUser);
        console.log("just add krne ke baad" +recruiter);
    }


    static isValidUser(email, password) {
        console.log(email,password);
        console.log("recruiter wali array: ",recruiter);
        const result = recruiter.find(
          (u) =>
            u.email == email && u.password == password
        );
        // console.log(result);
        return result;
    }

    static getName(mail){
        let name;
        for(let i=0;i<recruiter.length;i++){
            if(recruiter[i].email==mail)
            name=recruiter[i].name
        }
        return name;
    }
}

var recruiter=[
//     {
//     id: 1,
//     name: 'pks',
//     email: 'pks@gmail.com',
//     password: 'pks'
//   },
//   {
//     id: 2,
//     name: 'pks',
//     email: 'pkssss@gmail.com',
//     password: 'pks'
//   }
];