import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContentSideNavBarComponent } from "../side-nav-bar/side-nav-bar";
import { FooterComponent } from '../footer/footer';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-home',
  imports: [ ContentSideNavBarComponent, FooterComponent, NavBar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit{
  constructor () {}

  ngOnInit(): void {

  }
}
