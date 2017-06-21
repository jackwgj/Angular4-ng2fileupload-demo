/**
 * Created by jack on 2017/6/22.
 */
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
// import {Global} from '../../shared/data.global';

@Component({
  selector: 'app-root',
  templateUrl: './fileUpload.component.html'
})
export class FileUploadComponent implements OnInit, OnChanges {


  // @Input()
  // change: any;
  @Input()
  formModel: FormGroup;
  @Input()
  name: string;
  defImg: string;
  @Input()
  defType: Number = 1;

  uploader: FileUploader = new FileUploader({
    url: '/upload/file/' + this.name,
    method: 'POST',
    itemAlias: 'uploadedfile'
  });

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.defType === 1) {
      const val =  this.formModel.controls[this.name].value;
      if ( val !== null && val !== '') {
        this.defImg = val;
      } else {
        this.defImg = '/assets/imgs/noimage.gif';
      }
    }

    this.uploader = new FileUploader({
      url: '/upload/file/' + this.name,
      method: 'POST',
      itemAlias: 'uploadedfile'
    });
  }
  ngOnInit() {

  }
// C: 定义事件，选择文件
  selectedFileOnChanged(event: any) {
    // 打印文件选择名称
    this.uploadFile();
  }
  // D: 定义事件，上传文件
  uploadFile() {
    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status === 200) {
        // 上传文件后获取服务器返回的数据
        const ret = JSON.parse(response);
        if ( ret.retCode === 1 ) {
          // 此处无法 this.formModel.controls[this.name].setValue(this.defImg);  因此在html中增加hidden域，然后触犯隐藏域的单击事件
          // $('#upload-file-id-' + ret.fieldName).val(ret.fileName);
          // $('#upload-file-id-' + ret.fieldName).trigger('click');
        } else {
          alert('文件上传失败:' + ret.retDesc);
        }
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert('文件上传失败');
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

  changeModel() {
    this.defImg =''; //$('#upload-file-id-' + this.name).val();
    this.formModel.controls[this.name].setValue(this.defImg);
    this.uploader.queue[0].remove(); // 上传过移除原有图片信息
  }

}
