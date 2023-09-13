import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ShapeStyleModel, FlowShapeModel, PointPortModel, DiagramComponent, PrintAndExport, Diagram, IExportOptions } from '@syncfusion/ej2-angular-diagrams';
import { AsyncSettingsModel } from '@syncfusion/ej2-angular-inputs';
Diagram.Inject(PrintAndExport);
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'myangularproject';
  @ViewChild('diagram') diagramObj !: DiagramComponent;
  public diagramData: any;
  public terminator: FlowShapeModel = { type: 'Flow', shape: 'Terminator' };
  public data: FlowShapeModel = { type: 'Flow', shape: 'Data' };
  public process: FlowShapeModel = { type: 'Flow', shape: 'Process' };
  public decision: FlowShapeModel = { type: 'Flow', shape: 'Decision' };
  public basicStyle: ShapeStyleModel = {
    fill: '#37909A',
    strokeColor: '#37909A',
    strokeWidth: 3,
  };

  public displacement: object = { x:10, y: 10}
  public ports: PointPortModel[] = [
    { id:'port1', offset: {x:0.5, y:1} },
    { id:'port2', offset: {x:1, y:0.5} }
  ]

  public asyncSettings: AsyncSettingsModel = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save'
  };

  public onSave(){
    // this.diagramData = this.diagramObj.saveDiagram();
    this.downlaod(this.diagramObj.saveDiagram());
  }

  public onPrint(){
    let printOptions: IExportOptions = {};
    printOptions.mode = 'Data';
    this.diagramObj.print(printOptions);
  }

  public onExport(){
    let exportOptions: IExportOptions = {};
    exportOptions.format = 'PNG';
    exportOptions.mode = 'Download';
    this.diagramObj.exportDiagram(exportOptions);
  }

  public onUploadSuccess(args: { [key: string]: Object }){
    let fileData: { [key: string]: Object } = args['file'] as { [key: string]: Object };
    let file: Blob = fileData['rawFile'] as Blob;
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = this.loadDiagram.bind(this);
  }

  public loadDiagram(event: ProgressEvent){
    let result = (event.target as FileReader).result;
    if(result){
      this.diagramObj.loadDiagram(result.toString());
    }
  }
  
  public onLoad(){
    // this.diagramObj.loadDiagram(this.diagramData);
    const fileSelectWrap = document.getElementsByClassName('e-file-select-wrap')[0];
    if(fileSelectWrap){
      const button = fileSelectWrap.querySelector('button');
      if(button){
        button.click();
      }
    }
  }

  public downlaod(data: string){
    if((window.navigator as any).msSaveBlob){
      let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    } else {
      let dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      let a: HTMLAnchorElement = document.createElement('a');
      a.href = dataStr;
      a.download = 'Diagram.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }
}
