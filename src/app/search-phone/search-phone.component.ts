import { Component, OnInit, Inject } from "@angular/core";
import { Phone } from "../models/phone";
import { PhoneService } from "../services/phone.service";
import "rxjs/add/operator/map";

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
declare var $: any;
@Component({
  selector: "app-search-phone",
  templateUrl: "./search-phone.component.html",
  styleUrls: ["./search-phone.component.scss"]
})
export class SearchPhoneComponent implements OnInit {
  diagonalRange = [2, 10];
  RAMRange = [512, 6142];
  memoryRange = [1, 64];
  batteryRange = [1000, 10000];

  phones: Phone[] = [];
  searchPhone: Phone;
  itemsPerPage = 50;
  page = 1;
  model = "";
  searchPhoneForm: FormGroup;

  constructor(
    private phoneService: PhoneService,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.searchPhone = new Phone();
    this.searchPhoneForm = fb.group({
      model: "",
      screen_diagonal: "",
      RAM: "",
      memory: "",
      battery: "",
      "720x1440": false,
      "720x1920": false
    });
  }

  ngOnInit() {
    this.loadPhones();
  }
  loadPhones(): void {
    // this.loading = true;
    console.log(this.searchPhoneForm.value.model);
    this.phoneService
      .getPhones(this.searchPhoneForm.value.model)
      .then(result => {
        this.phones = Object.values(result).map(result => {
          let array: Phone = {
            model: result[0],
            system: result[1],
            screen_diagonal: parseFloat(result[2]),
            screen_resolution: result[3],
            CPU: result[4],
            RAM: parseInt(result[5]),
            memory: parseInt(result[6]),
            battery: parseInt(result[7]),
            resolution: result[8]
          };
          return array;
        });
      })
      .catch(error => console.error(error));
  }
  onSearchChange(searchValue: string) {
    console.log(searchValue);
    this.loadPhones();
  }
  change() {
    console.log(this);
  }
}
