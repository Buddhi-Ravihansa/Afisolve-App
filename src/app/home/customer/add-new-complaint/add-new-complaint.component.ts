import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {AddNewComplaintService} from './add-new-complaint.service';

@Component({
  selector: 'app-add-new-complaint',
  templateUrl: './add-new-complaint.component.html',
  styleUrls: ['./add-new-complaint.component.css']
})
export class AddNewComplaintComponent implements OnInit, OnChanges {
  @Input() reqProductID: number;
  addComplaintForm: FormGroup;
  productIDList;
  productNameList;
  complaintCategoryList = ['category 1', 'category 1', 'category 1'];

  constructor(
    private fb1: FormBuilder,
    private router: Router,
    private http1: HttpClient,
    public dialog: MatDialog,
    public addNewComplaintService: AddNewComplaintService
  ) { }

  ngOnInit(): void {
    this.formBuildFunction();
    this.http1.post<any>(`http://localhost:3000/customer/get-all-products`, {}).subscribe(
      response => {
        this.productIDList = response.data.map(value => value.productID);
        this.productNameList = response.data.map(value => value.productName);
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnChanges(): void {
    if (this.addComplaintForm && this.reqProductID) {
      this.formBuildFunction();
      this.productID.setValue(this.reqProductID);
    }
  }

  formBuildFunction(): void {
    this.addComplaintForm = this.fb1.group({
      productID: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      complaintCategory: [[''], [Validators.required]],
    });
  }

  get productID(): AbstractControl {
    return this.addComplaintForm.get('productID');
  }

  get description(): AbstractControl {
    return this.addComplaintForm.get('description');
  }

  get complaintCategory(): AbstractControl {
    return this.addComplaintForm.get('complaintCategory');
  }

  onCancelEdit(): void {
    this.addComplaintForm.reset();
    this.addNewComplaintService.changeIsLodgeComplaintModeSubjectBooleanValue(false);
  }

  public saveChangesDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Lodge complaint with ' + this.productID + '? ',
        name: '',
        button1: 'Cancel',
        button2: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        console.log(this.addComplaintForm.value);
        this.http1.post<any>(`http://localhost:3000/customer/lodge-complaint`, this.addComplaintForm.value).subscribe(
          response => {
            console.log(response);
          }, error => {
            console.log(error);
          }
        );
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

}
