import { HttpClient,  } from '@angular/common/http';
import { Component,ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular,  } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

//   @ViewChild('agGrid') agGrid!:AgGridAngular;



//   columnDefs: ColDef[] = [
//     { field: 'make',  sortable:true,filter:true ,checkboxSelection:true},
//     { field: 'model',sortable:true,filter:true ,checkboxSelection:true },
//     { field: 'price' ,sortable:true,filter:true ,checkboxSelection:true}
// ];

// //geting data from api or remote geting data

// rowData!:Observable<any[]>;

//   constructor(private http:HttpClient){
//   this.rowData=this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json')

// }

//clearing the selected row

clearSelection(): void {
  this.agGrid.api.deselectAll();
}

 
   //groping our rows


   @ViewChild('agGrid') agGrid!:AgGridAngular;

   defaultColDef:ColDef={
    sortable:true,
    filter:true
   }

   columnDefs: ColDef[] = [
    { field: 'make', rowGroup:true} ,
    {field:'price'}
   ]

   autoGroupColumnColDef:ColDef={

    headerName:'Model',
    field:'model',
    cellRenderer:'agGroupCellRenderer',
    cellRendererParams:{
      checkbox:true
    }
   }

   
   rowData!:Observable<any[]>;

  constructor(private http:HttpClient){
  this.rowData=this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json')

}
   getSelectedRows(){
    const selectedNode=this.agGrid.api.getSelectedNodes();
    const selectedData=selectedNode.map(Node=>
      {
        if(Node.groupData){
          return{make:Node.key,model:'Group'}
        }
       return Node.data
      }
      );
    const seletedDataStringPresentation=selectedData.map(Node=>`${Node.make} ${Node.model}`).join(',');
    alert(`Selected Node:${seletedDataStringPresentation}`)
      }

}