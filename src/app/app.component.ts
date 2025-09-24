import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet,RouterLink } from '@angular/router';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'hackathon_registration_app';
  loggedData:any;
  masterService = inject(MasterService)

  constructor(private router:Router){}

  ngOnInit(): void {
   this.readLocalData()
    this.masterService.$loginDone.subscribe({
      next:(res:any)=> {
        this.readLocalData()
      }
    })
  }

  readLocalData(){
    const localData= localStorage.getItem('user')
    if(localData != undefined || localData != null) {
      this.loggedData = JSON.parse(localData)
    }
  }

  onLogout(){
    localStorage.removeItem('user')
    this.loggedData= undefined;
  }

  onLogin(){
    this.router.navigateByUrl("/register")
  }
}
