import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() button1: string;
  @Input() button2: string;

  Editor = ClassicEditor;

  form: FormGroup = new FormGroup({
    input: new FormControl('', Validators.required),
  });

  constructor(private activeModal: NgbActiveModal) {}

  get input() {
    return this.form.get('input');
  }

  save(): void {
    if (this.form.valid) {
      this.activeModal.close(this.input.value);
    }
  }
}
