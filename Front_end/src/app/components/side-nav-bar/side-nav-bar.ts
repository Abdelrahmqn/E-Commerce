import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsComponent } from "../products/products";

@Component({
  selector: 'app-content-side-nav-bar',
  templateUrl: './side-nav-bar.html',
  styleUrls: ['./side-nav-bar.css'],
  imports: [ProductsComponent]
})
export class ContentSideNavBarComponent implements OnInit{
  ngOnInit(): void {

  }
}
