import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TrackerService } from 'src/app/services/tracker.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PopUpService } from 'src/app/services/popup.service';

interface TreeNodeData {
  amount: number;
  isDeposit: boolean;
  isBalance: boolean;
  date: string;
  note: string;
}

@Component({
    selector: 'tree-root',
    templateUrl: 'tree-root.html',
    styleUrls: ['tree-root.scss'],
})

export class TreeRootComponent implements OnInit, OnDestroy {    
  titleHeader: any = 'Transaction History';
  locationInfo: TreeNodeData | undefined;

  treeData: any[] = [];

  constructor(
    private router: Router,
    private popUpService: PopUpService,
    private trackerService: TrackerService
  ) {}

  ngOnInit() {
    this.treeData.push({
      amount: 0,
      isBalance: true,
      children: []
    })

    const transactions = [
      {  
        amount: 50000,
        isDeposit: true,
        isBalance: false,
        date: '5/1/2024',
        note: 'Salary'
      },
      {  
        amount: 20000,
        isDeposit: false,
        isBalance: false,
        date: '10/1/2024',
        note: 'Home Rent'
      },
      {  
        amount: 16000,
        isDeposit: false,
        isBalance: false,
        date: '8/1/2024',
        note: 'Car Rent'
      }
    ]

    transactions.forEach((transaction: any) => {
      this.addTreeNode(transaction);
    })

    console.log(this.treeData);
  }

  addTreeNode(transaction: TreeNodeData) {
    this.treeData[this.treeData.length - 1].children = [transaction];
    let updatedAmount = this.treeData[this.treeData.length - 1].amount;

    if (transaction?.isDeposit) {
      updatedAmount += transaction.amount 
    } else {
      updatedAmount -= transaction.amount 
    }

    this.treeData.push({
      amount: updatedAmount,
      isBalance: true,
      children: null
    })
  }

  ngOnDestroy() {}
 }