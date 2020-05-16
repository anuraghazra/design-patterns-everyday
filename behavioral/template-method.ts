// template method
import fs from 'fs';

abstract class DataParser {
  data: string;
  out: any;
  constructor() {
    this.data = '';
    this.out = null
  }

  parse(pathUrl: string) {
    this.readFile(pathUrl);
    this.doParsing();
    this.postCalculations();
    this.printData();
  }

  readFile(pathUrl: string) {
    this.data = fs.readFileSync(pathUrl, 'utf8')
  }

  doParsing() { }
  postCalculations() { }
  printData() {
    console.log(this.out)
  }
}

class DateParser extends DataParser {
  doParsing() {
    let dateRegx = /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/img
    this.out = this.data.match(dateRegx)
  }
}

class CSVParser extends DataParser {
  doParsing() {
    this.out = this.data.split(',')
  }
}

class MarkupParser extends DataParser {
  doParsing() {
    this.out = this.data.match(/<\w+>.*<\/\w+>/img);
  }

  postCalculations() {
    this.out = this.out.reverse()
  }
}

const dataUrl = '../../behavioral/data.csv'

new DateParser().parse(dataUrl);
new CSVParser().parse(dataUrl);
new MarkupParser().parse(dataUrl);