import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../Service/master.service';
import * as alertify from 'alertifyjs'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {

  constructor(private service: MasterService, public dialogref: MatDialogRef<ModalpopupComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  desdata: any;
  respdata: any;
  editdata: any;

  ngOnInit(): void {
    this.loadDes();
    if(this.data.empcode!=null && this.data.empcode!=''){
this.LoadEditData(this.data.empcode);
    }
  }

  loadDes() {
    this.service.GetDes().subscribe(result => {
      this.desdata = result;
    });
  }

  LoadEditData(code: any) {
    this.service.GetEmployeebycode(code).subscribe(item => {
      this.editdata = item;
      this.Reactiveform.setValue({code:this.editdata.code,name:this.editdata.name,email:this.editdata.email,
        phone:this.editdata.phone,designation:this.editdata.designation,gender:'M',isactive:true})
    });
  }

  Reactiveform = new FormGroup({
    code: new FormControl({ value: 0, disabled: true }),
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    designation: new FormControl(""),
    gender: new FormControl("M"),
    isactive: new FormControl(true)
  });
  SaveEmployee() {
    if (this.Reactiveform.valid) {
      this.service.Save(this.Reactiveform.value.name).subscribe(result => {
        this.respdata = result;
        if (this.respdata.result == 'pass') {
          alertify.success("saved successfully.")
          this.dialogref.close();
        }
      });

    } else {
      alertify.error("Please Enter valid data")
    }
  }

}
