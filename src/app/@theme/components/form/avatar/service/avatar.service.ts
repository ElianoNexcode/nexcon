import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage } from 'src/app/@core/storage/config/config';

@Injectable({
    providedIn: "root"
})
export class AvatarService {

    @Input() size: string;
    @Input() noMargin: boolean = false;
    @Input() noBorder: boolean = false;
    @Input() round: boolean = false;

    imageBehavior: BehaviorSubject<string>;

    config: ConfigStorage = new ConfigStorage();

    getAvatarArray() {
        const image: Array<number> = this.config.converteImagemArray(this.imageSubject().value)
        return image;
    }

    getAvatarBase64() {
        const image: string = this.imageSubject().value;
        return image;
    }

    setImage(image: string) {
        this.imageBehavior.next(image);
    }

    imageSubject() {
        if(!this.imageBehavior) this.imageBehavior = new BehaviorSubject(null);
        return this.imageBehavior;
    }

}