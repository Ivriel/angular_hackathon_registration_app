import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {FormsModule} from "@angular/forms"
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isLoginFormVisible = signal<boolean>(false)
  http = inject(HttpClient)
  router = inject(Router)
  masterService = inject(MasterService)

  loginObj:any = {
    email:"",
    password:""
  }

  registerObj:any = {
    fullName:"",
    email:"",
    password:"",
    collegeName:"",
    role:""
  }

  toggleForm(){
    this.isLoginFormVisible.set(!this.isLoginFormVisible())
  }

  onRegister(){
    this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/register",this.registerObj).subscribe({
      next:(res:any)=> {
        alert("berhasil registrasi")
      },
      error:(error:any)=> {
        alert(error.error)
      }
    })
  }

  onLogin(){
    this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/login",this.loginObj).subscribe({
      next:(res:any)=> {
        alert("berhasil login")
        localStorage.setItem('user',JSON.stringify(res))
        this.masterService.$loginDone.next()
        this.router.navigateByUrl("/home")
      },
      error:(error:any)=> {
        alert(error.error)
      }
    })
  }
}
