import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[case]',
  host: {
    '(input)': '$event'
  }
})
export class UpperCaseInputDirective {
  @Input() case: string;
  @Input() regex: string | "noFilter" | "email" | "numeric" | undefined;

  lastValue: string = "";

  constructor(public ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput($event) 
  {
    var start = $event.target.selectionStart;
    var end = $event.target.selectionEnd;

    const value = $event.target.value;
    const valueRegex = value.replace(/[^A-Za-zÀ-ú0-9 ._\-]/g, '');
    var check: boolean = (value == valueRegex);

    switch(this.regex) {
      case undefined: 
        $event.target.value = $event.target.value?.replace(/[^A-Za-zÀ-ú0-9 ._\˜\ˆ\'\`\-]/g, '');
        if(check) {
          $event.target.value = $event.target.value?.replace(/[^A-Za-zÀ-ú0-9 ._\-]/g, '');
        }
        break;
      
      case "noFilter": 
        if(check) {
          $event.target.value = $event.target.value?.replace(/['`]/g, '');
        }
        break;
      
      case "email": 
        $event.target.value = $event.target.value?.replace(/[^A-Za-z0-9@._\-]/g, '');
        break;        
      
      case "numeric": 
        $event.target.value = $event.target.value?.replace(/[^0-9]/g, '');
        break;

      case "date":
        $event.target.value = $event.target.value?.replace(/[^0-9\/]/g, '');
        break;

      case "time":
        $event.target.value = $event.target.value?.replace(/[^0-9:]/g, '');
        break;

      case "path":
        $event.target.value = $event.target.value?.replace(/[^A-Za-z0-9._:\/\\\-]/g, '');
        break;
        
      default: 
        if(this.regex?.indexOf("\\") != 0) {
          const regex = new RegExp("/[^A-Za-z0-9 ." + this.regex.substring(1), "g");
          $event.target.value = $event.target.value?.replace(regex, '');      
        }
        break;      
    }

    if(this.case == "upper") {
      $event.target.value = $event.target.value.toUpperCase();
    }

    if(this.case == "lower") {
      $event.target.value = $event.target.value?.toLowerCase();
    }
    
    $event.target.setSelectionRange(start, end);
    $event.preventDefault();
    
    if (!this.lastValue || (this.lastValue && $event.target.value.length > 0 && this.lastValue !== $event.target.value)) {
      this.lastValue = this.ref.nativeElement.value = $event.target.value;
      // Propagation
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      $event.target.dispatchEvent(evt);
    }
  }
}
