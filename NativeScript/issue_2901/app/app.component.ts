import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { TimePicker } from "ui/time-picker";

@Component({
    selector: 'time-picker-component',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

    @ViewChild("timePicker") tp: ElementRef;

    ngOnInit() {
        let timePicker: TimePicker = <TimePicker>this.tp.nativeElement;
        timePicker.hour = 9;
        timePicker.minute = 25;  
    }

    onTap() {
        let timePicker: TimePicker = <TimePicker>this.tp.nativeElement;
        console.log(timePicker.hour + " : " + timePicker.minute);
    }

}