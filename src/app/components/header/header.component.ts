import { Component, OnInit } from '@angular/core';
import { routes } from '@/app.routes';
import { twMerge } from 'tailwind-merge';

const SCROLL_DEBOUNCE_TIME = 50

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  routes = routes
  isTop = true
  isScrolling = false

  twMerge = twMerge

  ngOnInit(): void {
    let prevScrollTimeout: NodeJS.Timeout
    document.addEventListener('scroll', () => {
      this.isTop = window.scrollY === 0

      this.isScrolling = true
      clearTimeout(prevScrollTimeout)
      prevScrollTimeout = setTimeout(() => {
        this.isScrolling = false
      }, SCROLL_DEBOUNCE_TIME)
    })
  }
}
