/**
 *
 * TChart.js
 * simple, elegant bar chart library
 * 14-JULY-2020 - version 1.0
 * https://github.com/talhakhalid-tech/TChart.js
 *
 * Copyright 2020 M.Talha Khalid
 * Release under the MIT License
 * https://github.com/talhakhalid-tech/TChart.js/blob/master/LICENSE.md
 *
 */

"use strict";

class TChart {
  constructor(targetId, width, height, data) {

    //Canvas Specification came from outside
    this.id = targetId;
    this.width = width;
    this.height = height;
    this.data = data;

    //Axis Configurations
    this.axisRatio = 10; //In term of percentage
    this.verticalMargin = (this.height * this.axisRatio) / 100;
    this.horizontalMargin = (this.width * this.axisRatio) / 100;
    this.axisColor = "grey";
    this.axisWidth = 0.75;

    //Label Configurations
    this.fontRatio = 2.5; //In term of percentage
    this.fontFamily = "times";
    this.fontStyle = "normal";
    this.fontWeight = "300";
    this.fontColor = "darkgrey";
    this.verticalFontSize = (this.height * this.fontRatio) / 100;
    this.horizontalFontSize = (this.width * this.fontRatio) / 100;

    //Guideline Configurations
    this.guidelineColor = "lightgrey";
    this.guidelineWidth = 0.5;

    //Create Canvas
    let canvas = document.createElement("canvas");
    canvas.id = this.id + "-" + Math.random();
    canvas.width = this.width;
    canvas.height = this.height;

    //Append canvas to target container
    document.getElementById(this.id).innerHTML = "";
    document.getElementById(this.id).appendChild(canvas);

    //Add canvas to chart object
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    //Handle data
    this.labels = [];
    this.values = [];

    this.data.forEach((element) => {
      this.labels.push(element.label);
      this.values.push(element.value);
    });

    //Global variables
    this.itemsNumber = this.data.length;
    this.maxValue = Math.max.apply(null, this.values);
    this.minValue = Math.min.apply(null, this.values);

    //Axis specifications
    this.verticalAxisWidth = this.height - 2 * this.verticalMargin;
    this.horizontalAxisWidth = this.width - 2 * this.horizontalMargin;

    //label specifications
    this.verticalUpperBound = Math.ceil(this.maxValue / 10) * 10;
    this.verticalLabelFreq = this.verticalUpperBound / this.itemsNumber;
    this.horizontalLabelFreq = this.horizontalAxisWidth / (this.itemsNumber);
  }

  drawBarChart() {

    //vertical axis
    this.drawVerticalAxis();

    //vertical labels
    this.drawVerticalLabels();

    //horizontal axis
    this.drawHorizontalAxis();

    //horizontal labels
    this.drawHorizontalLabels();

    //horizontal guidelines
    this.drawHorizontalGuidelines();

    //bars
    this.drawBars();
  }

  drawLineChart() {

    //vertical axis
    this.drawVerticalAxis();

    //vertical labels
    this.drawVerticalLabels();

    //horizontal axis
    this.drawHorizontalAxis();

    //horizontal labels
    this.drawHorizontalLabels();

    //horizontal guidelines
    this.drawHorizontalGuidelines();

    //bars
    this.drawLines();
  }

  drawVerticalAxis() {
    //vertical axis
    this.context.beginPath();
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.context.moveTo(this.horizontalMargin, this.verticalMargin);
    this.context.lineTo(
      this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.stroke();

  }

  drawVerticalLabels() {

    //text specifications
    let labelFont = this.fontStyle + " " + this.fontWeight + " " + this.verticalFontSize + "px " + this.fontFamily
    this.context.font = labelFont
    this.context.fillStyle = this.fontColor
    this.context.textAlign = "right"

    //scale values
    let scaledVerticalLabelFreq = (this.verticalAxisWidth / this.verticalUpperBound) * this.verticalLabelFreq

    //draw labels
    for (let i = 0; i <= this.itemsNumber; i++) {
      let labelText = Math.ceil(this.verticalUpperBound - i * this.verticalLabelFreq);
      let verticalLabelX = this.horizontalMargin - this.horizontalMargin / this.axisRatio;
      let verticalLabelY = this.verticalMargin + i * scaledVerticalLabelFreq;

      this.context.fillText(labelText, verticalLabelX, verticalLabelY)
    }
  }

  drawHorizontalAxis() {

    //horizontal axis
    this.context.beginPath();
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.context.moveTo(
      this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.lineTo(
      this.width - this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.stroke();

  }

  drawHorizontalLabels() {
    //text specifications
    let labelFont = this.fontStyle + " " + this.fontWeight + " " + this.verticalFontSize + "px " + this.fontFamily
    this.context.font = labelFont
    this.context.fillStyle = this.fontColor
    this.context.textAlign = "center"
    this.context.textBaseline = "top"

    //draw labels
    for (let i = 0; i < this.itemsNumber; i++) {
      let horizontalLabelX = this.horizontalMargin + i * this.horizontalLabelFreq + this.horizontalLabelFreq / 2;
      let horizontalLabelY = this.height - this.verticalMargin + this.verticalMargin / this.axisRatio;

      this.context.fillText(this.labels[i], horizontalLabelX, horizontalLabelY)
    }
  }

  drawHorizontalGuidelines() {

    //specifications
    this.context.strokeStyle = this.guidelineColor;
    this.context.lineWidth = this.guidelineWidth;

    //scale values
    let scaledVerticalLabelFreq = (this.verticalAxisWidth / this.verticalUpperBound) * this.verticalLabelFreq;

    //draw labels
    for (let i = 0; i <= this.itemsNumber; i++) {

      //start point coordinates
      let horizontalGuidelineStartX = this.horizontalMargin;
      let horizontalGuidelineStartY = this.verticalMargin + i * scaledVerticalLabelFreq;

      //end point coordinates
      let horizontalGuidelineEndX = this.horizontalMargin + this.horizontalAxisWidth;
      let horizontalGuidelineEndY = this.verticalMargin + i * scaledVerticalLabelFreq;

      this.context.beginPath();
      this.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
      this.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
      this.context.stroke();
    }
  }

  drawBars() {

    let color = this.createRandomRGBColor();

    for (let i = 0; i < this.itemsNumber; i++) {

      let color = this.createRandomRGBColor();
      let fillOpacity = "0.5";
      let fillColor = "rgba(" + color.red + "," + color.green + "," + color.blue + "," + fillOpacity + ")";
      let borderColor = "rgb(" + color.red + "," + color.green + "," + color.blue + ")";

      this.context.beginPath()

      let barX = this.horizontalMargin + i * this.horizontalLabelFreq + this.horizontalLabelFreq / this.axisRatio * 2;
      let barY = this.height - this.verticalMargin;
      let barWidth = this.horizontalLabelFreq - 2 * this.horizontalLabelFreq / this.axisRatio * 2;
      let barHeight = -1 * (this.verticalAxisWidth * this.values[i] / this.verticalUpperBound);

      this.context.fillStyle = fillColor;
      this.context.strokeStyle = borderColor;
      this.context.rect(barX, barY, barWidth, barHeight);
      this.context.fill();
      this.context.stroke();
    }
  }

  createRandomRGBColor() {
    const red = getRandomInt(0, 257);
    const green = getRandomInt(0, 257);
    const blue = getRandomInt(0, 257);
    return { red, green, blue };
  }

  drawLines() {

    for (let i = 0; i < this.itemsNumber; i++) {


      this.context.beginPath()

      let barX = this.horizontalMargin + i * this.horizontalLabelFreq + this.horizontalLabelFreq / 2;
      let barY = (this.height - this.verticalMargin) + (-1 * (this.verticalAxisWidth * this.values[i] / this.verticalUpperBound));

      this.context.fillStyle = this.fontColor;
      this.context.arc(barX, barY, this.horizontalLabelFreq / 9, 0, Math.PI * 2);
      this.context.fill();
    }

    this.context.beginPath()
    this.context.moveTo(this.horizontalMargin, this.height - this.verticalMargin)
    this.context.strokeStyle = this.fontColor

    for (let i = 0; i < this.itemsNumber; i++) {

      let barX = this.horizontalMargin + i * this.horizontalLabelFreq + this.horizontalLabelFreq / 2;
      let barY = (this.height - this.verticalMargin) + (-1 * (this.verticalAxisWidth * this.values[i] / this.verticalUpperBound));

      this.context.lineWidth = (this.axisWidth / ((this.itemsNumber - i) * 2)) * 2
      this.context.lineTo(barX, barY)
      this.context.stroke();
    }

  }

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}