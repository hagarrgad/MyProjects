import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from "../search-bar/search-bar.component";
export interface WorkOrder {
  id: number;
  cname: string;
  cid: number;
  cmail: string;
  cnumber: number;
  pruposed_date: Date;
  order_status: string ;
  selectedTechnician:string;
  cadress:string;

  // reschudled?: boolean;
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, SearchBarComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  workOrders: WorkOrder[] = [];
   isModalOpen: boolean = false;
   modalContentType : string ='';
    statuses!: string[];  //list of technicain name
    selectedTechnician: string = ''; //selected one
    selectedSlot : string = '' ;
   rescheduleDate: string = '';
   order_status :string = '' ;
   isSlotDropdownVisible: boolean = false;
   slots : string[] = [] ;
   
   currentWO!: WorkOrder;
  constructor(private dataService: DataService) {

  }
  request:any;
  openModal(type: string, wo :WorkOrder): void {
    this.currentWO = wo;
    if(this.isDisable(wo.order_status)){
      alert('haha');
      return
    }
    this.modalContentType = type;
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
  }

  saveChanges() {

    if (this.modalContentType === 'reassign') {
      this.saveReassign();
    }else if (this.modalContentType === 'reschedule') {
      this.saveReschedule();
    }
    this.closeModal(); 
  }

  saveReassign(){
    const payload = {
      order_id: this.currentWO.id,
      tech_name: this.selectedTechnician
      
    };
    console.log('Reassign Payload:', payload);
    this.dataService.reassign(payload).subscribe(
      response => {
        console.log('Reassign response:', response);
        this.dataService.getData();
      },
      error => {
        console.error('Error reassigning order:', error);
      }
    );
  }

  saveReschedule() {
    const [year,month,day] = this.rescheduleDate.split('-');
    console.log (this.rescheduleDate)
    
     const formattedDate = `${year}-${month}-${day}T00:00:00`;
    const payload = {
      time : formattedDate,
      order_id: this.currentWO.id,
      slot : this.selectedSlot
      
    };
    
    console.log('Reschedule Payload:', payload);
    this.dataService.rescheduleOrder(payload).subscribe(
      response => {
        console.log('Reschedule response:', response);
        this.dataService.getData();
      },
      error => {
        console.error('Error rescheduling order:', error);
      }
    );
  }

 

  ngOnInit(): void { //fetching data from a service
    this.dataService.getData();
    this.trackWorkOrders();


  }

  gettechname(id:number){
    this.dataService.gettechnames(id).subscribe(
      (result:string[])=>{
        this.statuses = result;
        console.log("new data fetched");
        console.log(this.statuses);
        
      }
    )
  }
  getSlots(){
 

  let date = this.rescheduleDate.split("-").reverse().join('-');
  // let dateFormatter = date[2]+ "-" + date[1] + "-" + date[0]
  // 31-07-2024
  let payload = {
    changetime:String(date),
    id:Number(this.currentWO.id)
    
  }


  console.log('payload');
  console.log(payload);
  
  // return
    this.dataService.getSlotsApi(payload).subscribe(
    (result:string[])=>{
      this.slots = result;
      console.log("new data fetched");
      console.log(this.slots);
      
    }
  )}

  Cancelorder(wo:WorkOrder){
    if(this.isDisable(wo.order_status)){
      alert('haha');
      return
    }
    console.log(this.Cancelorder);
        
        this.dataService.cancelOrder(wo.id).subscribe( response => {
          console.log(response);
          this.dataService.getData();
      });
      

  }

  isDisable(status : string){
    return status === 'Canceled' || status === 'Forced' ;
  }

  Forceorder(wo:WorkOrder){
    if(this.isDisable(wo.order_status)){
      alert('haha');
      return
    }
    console.log(this.Forceorder);
        
        this.dataService.Forceclose(wo.id).subscribe( response => {
          console.log(response);
          this.dataService.getData();
      });
      

  }
  onDateChange() {
    // Show the dropdown if a valid date is selected
    this.isSlotDropdownVisible = !!this.rescheduleDate; // Convert date to boolean
  }
  

  
  private trackWorkOrders(){
    this.dataService.work_orders$.asObservable().subscribe(
      (result:WorkOrder[])=>{
        console.log("new data fetched");
        console.log(result);
        
        this.workOrders = result;
      }
    )
  }
}
