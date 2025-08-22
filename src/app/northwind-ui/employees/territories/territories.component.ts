import { Component, Input, input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-territories',
  standalone: true,
  imports: [],
  templateUrl: './territories.component.html',
  styleUrl: './territories.component.scss'
})
export class TerritoriesComponent implements OnChanges {
isSelected: boolean = false
territoriesList: any[] = [];

@Input() employeeId!: number;

territories: any[] = [
  {employeeId: 1, territoryId: 11234},
  {employeeId: 1, territoryId: 2334},
  {employeeId: 3, territoryId: 34567}
];

ngOnChanges(){
  if (this.employeeId) {
    this.onSelectTerritories(this.employeeId);
  }
}



onSelectTerritories(employeeId: number) {
  this.territoriesList = this.territories;
  
    if(employeeId){
      this.isSelected = true;
      this.territoriesList = this.territories.filter(t => t.employeeId === employeeId);
    }
}
}
