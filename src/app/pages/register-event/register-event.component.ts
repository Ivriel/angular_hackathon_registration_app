import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { RouterLink,ActivatedRoute } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-register-event',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.css'
})
export class RegisterEventComponent {
  isSubmitting:boolean = false
  submissionForm:FormGroup = new FormGroup({
     submissionId:new FormControl(0),
     competitionId:new FormControl(0),
     userId:new FormControl(0),
     projectTitle: new FormControl(""),
     description: new FormControl(""),
     githubLink: new FormControl(""),
     submissionDate: new FormControl(new Date()),
     status: new FormControl(""),
     rank:new FormControl(0)
  })

  constructor(private route:ActivatedRoute, private masterService:MasterService){
    this.route.params.subscribe((res:any)=> {
      this.submissionForm.controls['competitionId'].setValue(Number(res.id))
    })
    const localData = localStorage.getItem('user');
    debugger;
    if(localData != undefined) {
      const parsedData = JSON.parse(localData);
      this.submissionForm.controls['userId'].setValue(parsedData.userId)
    }
  }

  onSubmit(){
    this.isSubmitting = true
    this.masterService.onSubmitProject(this.submissionForm.value).subscribe({
      next:()=> {
        alert("Successfully submiting project")
        this.submissionForm.reset()
      },
      error:(error:any)=> {
        alert("Error submitting project")
        console.error("Error submitting project: ",error)
      },
      complete:()=> {
        this.isSubmitting = false
      }
    })
  }


}
