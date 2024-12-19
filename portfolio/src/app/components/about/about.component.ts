import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  title: string = "About Me";
  description: string = "I am a Full-Stack developer based in Montevideo, Uruguay. Currently, I am an advanced student pursuing a Bachelor's degree in Systems at ORT University. I have developed a strong passion for the field of systems and am motivated by the positive impact that technology can have on society.";
}
