import { Component, OnInit, Inject } from "@angular/core";
import { Phone } from "../models/phone";
import { PhoneService } from "../services/phone.service";
import "rxjs/add/operator/map";
import { NouisliderComponent } from "ng2-nouislider";
declare var $: any;

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { ViewChild } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-search-phone",
  templateUrl: "./search-phone.component.html",
  styleUrls: ["./search-phone.component.scss"]
})
export class SearchPhoneComponent implements OnInit {
  filters = {
    model: "",
    screen_diagonal: "",
    RAM: "",
    memory: "",
    battery: "",
    resolution: []
  };
loading=true;
  phones: Phone[] = [];
  itemsPerPage = 50;
  searchPhoneForm: FormGroup;
  data = {
    model: [],
    diagonal: [],
    diagonalRange: [1, 100000],
    RAM: [],
    RAMRange: [1, 100000],
    memory: [],
    memoryRange: [1, 100000],
    battery: [],
    batteryRange: [1, 100000],
    resolution: []
  };

  @ViewChild("diagonalSlider") public diagonalSlider: NouisliderComponent;
  @ViewChild("RAMSlider") public RAMSlider: NouisliderComponent;
  @ViewChild("memorySlider") public memorySlider: NouisliderComponent;
  @ViewChild("batterySlider") public batterySlider: NouisliderComponent;
  resolution = [];
  loadedData = false;

  constructor(
    private phoneService: PhoneService,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.searchPhoneForm = fb.group({
      model: "",
      screen_diagonal: "",
      RAM: "",
      memory: "",
      battery: "",
      resolution: fb.array([])
    });
  }

  ngOnInit() {
    this.loadPhones("first");
  }
  loadPhones(filter): void {
    this.loading=true;
    this.filters[filter] = this.searchPhoneForm.value[filter];
    this.data.model = [];
    this.data.diagonal = [];
    this.data.RAM = [];
    this.data.memory = [];
    this.data.battery = [];

    this.phoneService
      .getPhones(JSON.stringify(this.filters))
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
          if (array.model != "") this.data.model.push(array.model);
          if (!isNaN(array.screen_diagonal))
            this.data.diagonal.push(array.screen_diagonal);
          if (!isNaN(array.RAM)) this.data.RAM.push(array.RAM);
          if (!isNaN(array.memory)) this.data.memory.push(array.memory);
          if (!isNaN(array.battery)) this.data.battery.push(array.battery);
          if (filter === "first") {
            var resolution = this.data.resolution.find(
              x => x["name"] == array.screen_resolution
            );

            if (resolution == undefined && array.screen_resolution != "") {
              this.data.resolution.push({
                name: array.screen_resolution,
                checked:
                  this.searchPhoneForm.value.resolution.indexOf(
                    array.screen_resolution
                  ) == -1
                    ? false
                    : true,
                count: 1
              });
            } else if (array.screen_resolution != "") {
              resolution = {
                name: array.screen_resolution,
                checked:
                  this.searchPhoneForm.value.resolution.indexOf(
                    array.screen_resolution
                  ) == -1
                    ? false
                    : true,
                count: resolution.count++
              };
            }
          }
          this.loadedData = true;
          return array;
        });
        this.data.diagonal.sort((a, b) => a - b);
        this.data.diagonalRange = [
          this.data.diagonal[0],
          this.data.diagonal[this.data.diagonal.length - 1]
        ];
        this.data.RAM.sort((a, b) => a - b);
        this.data.RAMRange = [
          this.data.RAM[0],
          this.data.RAM[this.data.RAM.length - 1]
        ];
        this.data.memory.sort((a, b) => a - b);
        this.data.memoryRange = [
          this.data.memory[0],
          this.data.memory[this.data.memory.length - 1]
        ];
        this.data.battery.sort((a, b) => a - b);
        this.data.batteryRange = [
          this.data.battery[0],
          this.data.battery[this.data.battery.length - 1]
        ];
        this.data.resolution.sort((a, b) => b.count - a.count);

        if (filter === "first") {
          this.diagonalSlider.slider.updateOptions({
            range: {
              min: this.data.diagonal[0],
              max: this.data.diagonal[this.data.diagonal.length - 1]
            }
          });
          this.RAMSlider.slider.updateOptions({
            range: {
              min: this.data.RAM[0],
              max: this.data.RAM[this.data.RAM.length - 1]
            }
          });
          this.memorySlider.slider.updateOptions({
            range: {
              min: this.data.memory[0],
              max: this.data.memory[this.data.memory.length - 1]
            }
          });
          this.batterySlider.slider.updateOptions({
            range: {
              min: this.data.battery[0],
              max: this.data.battery[this.data.battery.length - 1]
            }
          });
        }
        this.loading=false;
      })
      .catch(error => {alert(error); this.loading=false});
  }
  onChange(res: string, isChecked: boolean) {
    const resolutionArray = <FormArray>this.searchPhoneForm.controls.resolution;

    if (isChecked) {
      resolutionArray.push(new FormControl(res));
    } else {
      let index = resolutionArray.controls.findIndex(x => x["name"] == res);
      resolutionArray.removeAt(index);
    }
    this.loadPhones("resolution");
  }
  showTips() {
    if (this.data.model.length > 0)
      document.getElementById("tips").style.display = "block";
  }
  setInputValue(value) {
    this.searchPhoneForm.controls["model"].setValue(value);
    document.getElementById("tips").style.display = "none";
    this.loadPhones("model");
  }
  closeTips(e) {
    var box = document.getElementById("tips");

    if (e.target.id != "searchPhoneInput" && e.target.id != "tips") {
      document.getElementById("tips").style.display = "none";
    }
  }
}
