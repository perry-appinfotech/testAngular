import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginSubmitForm!: FormGroup;
  forbiddenUsernames=['chris','Peter']
  form=new FormGroup({
    tt: new FormControl<string | null>(null,Validators.required),
    cc: new FormControl<string | null>(null),
  });
  signupForm!:FormGroup;
  genders=['male', 'female']
  constructor(private formBuilder: FormBuilder,) {

    this.loginSubmitForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
    });
   }

  ngOnInit(): void {
    this.signupForm= new FormGroup({
      'userData': new FormGroup({
        'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        'email':new FormControl(null,[Validators.required,Validators.email]),
      }),
     
      'gender':new FormControl('male'),
      'hobbies':new FormArray([])
    })
  }
  submit(){
    this.form.value.cc;
    console.log(this.loginSubmitForm.value.username)

  }

  signForm(){
console.log(this.signupForm)
  }
  get f(){
    return this.signupForm.controls;
  }
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
  onAddHobby(){
const control  = new FormControl(null,Validators.required);
(<FormArray>this.signupForm.controls['hobbies']).push(control);
    // (<FormArray>this.signupForm.get('hobbies').push(control))

  }

  forbiddenNames(control:FormControl):{[s:string]:boolean }| null{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      
    return {'nameIsForbidden':true}
  }
  else{
    return null;
  }
}

forbiddenEmails(control:FormControl):Promise<any> | Observable<any>{
  const promise = new Promise<any>((resolve, reject) =>{
setTimeout(()=>{
if(control.value === 'test@test.com'){
  resolve({'emailIsForbidden':true})
}
else{
  resolve(null)
}
},1500)
  })
  return promise;
}
}