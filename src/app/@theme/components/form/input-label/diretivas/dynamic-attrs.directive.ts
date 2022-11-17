import { Directive, Input, ElementRef, Renderer2, SimpleChanges, SimpleChange } from '@angular/core'
@Directive({
  selector: '[dynAttr]'
})
export class DynamicAttrsDirective {
  @Input('dynAttr')
  public attrs: string;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {

  }
  public ngOnChanges(changes: SimpleChanges) {
    const formattedAttrs = this._extractAttrs(this.attrs);
    formattedAttrs.forEach(a => { 
      this._renderer.setAttribute(this._elementRef.nativeElement, a.key, a.val); 
    })
  }

  private _extractAttrs(attrs): any[] {
    return attrs.split(" ").map(attr => ({
      key: attr.split('=')[0],
      val: (attr.split('=')[1] || '').replace(/[\'\"]/g, "")
    }))
  }
}
